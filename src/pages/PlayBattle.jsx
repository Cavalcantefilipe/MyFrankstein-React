import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchPokemonList,
  fetchPokemonDetails,
  startPlayBattle,
  chooseMove,
  chooseSwitch,
  getTypeColor,
} from '../api/pokemon.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const EVENT_DELAY = 900;

function spriteUrl(pokemonName) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonName}.png`;
}

function capitalize(s = '') {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function HpBar({ hp, maxHp, side }) {
  const pct = Math.max(0, Math.min(100, (hp / Math.max(1, maxHp)) * 100));
  const color =
    pct > 50 ? 'bg-green-500' : pct > 20 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="w-full">
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden border border-black/10">
        <motion.div
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full ${color}`}
        />
      </div>
      <div className="text-xs text-gray-600 mt-1 text-right">
        {hp} / {maxHp}
      </div>
    </div>
  );
}

function ActiveCard({ pokemon, side, isShaking }) {
  if (!pokemon) return null;
  const label = side === 'p1' ? 'You' : 'Opponent';
  const labelColor = side === 'p1' ? 'text-blue-600' : 'text-red-600';

  return (
    <div className="flex-1 flex flex-col items-center p-4 bg-white rounded-xl border border-black/10 shadow-sm">
      <p className={`text-xs font-bold uppercase tracking-wide ${labelColor}`}>
        {label}
      </p>
      <h3 className="text-lg font-semibold capitalize mb-2">
        {pokemon.name}
      </h3>
      <motion.img
        src={spriteUrl(pokemon.name.toLowerCase())}
        alt={pokemon.name}
        className="w-32 h-32 object-contain"
        animate={
          isShaking
            ? { x: [-8, 8, -6, 6, -3, 3, 0], opacity: [1, 0.4, 1, 0.4, 1] }
            : { x: 0, opacity: 1 }
        }
        transition={{ duration: 0.4 }}
        onError={(e) => {
          e.currentTarget.style.visibility = 'hidden';
        }}
      />
      <div className="w-full mt-3">
        <HpBar hp={pokemon.hp} maxHp={pokemon.maxHp} side={side} />
      </div>
    </div>
  );
}

function MoveButton({ move, onClick, disabled }) {
  const label = move.move || capitalize(move.id || '');
  const ppLow = move.pp !== undefined && move.pp <= 2;
  return (
    <button
      onClick={onClick}
      disabled={disabled || move.disabled || move.pp === 0}
      className={`px-3 py-3 rounded-lg border-2 font-semibold text-left transition-all ${
        disabled || move.disabled || move.pp === 0
          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white border-indigo-300 hover:bg-indigo-50 hover:border-indigo-500'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="truncate">{label}</span>
        <span
          className={`text-xs ml-2 ${
            ppLow ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          {move.pp !== undefined ? `${move.pp}/${move.maxpp}` : ''}
        </span>
      </div>
    </button>
  );
}

function EventLine({ event }) {
  const text = describeEvent(event);
  if (!text) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-sm py-1 border-b border-black/5 last:border-0"
    >
      {text}
    </motion.div>
  );
}

function describeEvent(e) {
  switch (e.type) {
    case 'turn':
      return `--- Turn ${e.number} ---`;
    case 'switch':
      return `${e.side === 'p1' ? 'You sent out' : 'Opponent sent out'} ${e.name}!`;
    case 'move':
      return `${e.actorName} used ${e.move}!`;
    case 'damage':
      return `${e.name} took damage (${e.hp}/${e.maxHp})`;
    case 'heal':
      return `${e.name} healed (${e.hp}/${e.maxHp})`;
    case 'crit':
      return `A critical hit on ${e.name}!`;
    case 'supereffective':
      return `It's super effective on ${e.name}!`;
    case 'resisted':
      return `It's not very effective on ${e.name}...`;
    case 'immune':
      return `${e.name} is immune!`;
    case 'miss':
      return `${e.name}'s move missed!`;
    case 'status':
      return `${e.name} is now ${e.status}!`;
    case 'faint':
      return `${e.name} fainted!`;
    case 'win':
      return e.winner === 'tie'
        ? `It's a tie!`
        : `${e.winner === 'blue' ? 'You' : 'Opponent'} won the battle!`;
    default:
      return null;
  }
}

function useActivePokemonState(initialSnapshot) {
  const [blue, setBlue] = useState(null);
  const [red, setRed] = useState(null);

  function applyEvents(events, { onShake } = {}) {
    events.forEach((e) => {
      if (e.type === 'switch') {
        const next = {
          name: capitalize(e.name),
          hp: e.hp,
          maxHp: e.maxHp,
        };
        if (e.side === 'p1') setBlue(next);
        else if (e.side === 'p2') setRed(next);
      } else if (e.type === 'damage' || e.type === 'heal') {
        if (e.side === 'p1') {
          setBlue((p) => (p ? { ...p, hp: e.hp, maxHp: e.maxHp } : p));
          if (onShake && e.type === 'damage') onShake('p1');
        } else if (e.side === 'p2') {
          setRed((p) => (p ? { ...p, hp: e.hp, maxHp: e.maxHp } : p));
          if (onShake && e.type === 'damage') onShake('p2');
        }
      }
    });
  }

  return { blue, red, applyEvents };
}

export default function PlayBattle() {
  const [phase, setPhase] = useState('setup');
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [blueTeam, setBlueTeam] = useState([]);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);

  const [battleId, setBattleId] = useState(null);
  const [request, setRequest] = useState(null);
  const [log, setLog] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [winner, setWinner] = useState(null);
  const [shakeSide, setShakeSide] = useState(null);
  const { blue, red, applyEvents } = useActivePokemonState();

  useEffect(() => {
    fetchPokemonList()
      .then(setPokemonList)
      .catch((e) => console.error('Failed to load list', e));
  }, []);

  useEffect(() => {
    function onMouseDown(e) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) setIsDropdownOpen(false);
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  const filteredPokemon = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return pokemonList;
    return pokemonList.filter((p) => p.name.toLowerCase().includes(q));
  }, [pokemonList, searchQuery]);

  async function addToTeam(pokemon) {
    if (blueTeam.length >= 6) return;
    if (blueTeam.find((p) => p.name === pokemon.name)) return;
    try {
      const details = await fetchPokemonDetails(pokemon.url);
      setBlueTeam((t) => [...t, details]);
      setSearchQuery('');
      setIsDropdownOpen(false);
    } catch (e) {
      console.error(e);
    }
  }

  function removeFromTeam(idx) {
    setBlueTeam((t) => t.filter((_, i) => i !== idx));
  }

  async function handleStart() {
    if (blueTeam.length === 0) {
      setError('Pick at least 1 Pokemon');
      return;
    }
    setIsStarting(true);
    setError('');
    try {
      const redTeam = await generateRandomRedTeam(blueTeam.length);
      const snapshot = await startPlayBattle({
        blueTeam: blueTeam.map((p) => ({ species: p.name })),
        redTeam: redTeam.map((n) => ({ species: n })),
      });
      setBattleId(snapshot.id);
      setPhase('battle');
      await playEvents(snapshot);
    } catch (e) {
      setError(e?.message || 'Failed to start battle');
    } finally {
      setIsStarting(false);
    }
  }

  async function generateRandomRedTeam(size) {
    if (pokemonList.length === 0) return ['pikachu'];
    const chosen = new Set();
    while (chosen.size < size) {
      chosen.add(pokemonList[Math.floor(Math.random() * pokemonList.length)].name);
    }
    return [...chosen];
  }

  async function playEvents(snapshot) {
    setIsAnimating(true);
    const events = snapshot.newEvents || [];
    for (const evt of events) {
      setLog((l) => [...l, evt]);
      applyEvents([evt], {
        onShake: (side) => {
          setShakeSide(side);
          setTimeout(() => setShakeSide(null), 400);
        },
      });
      await sleep(EVENT_DELAY);
    }
    setIsAnimating(false);

    if (snapshot.finished) {
      setWinner(snapshot.winner);
      setRequest(null);
    } else {
      setRequest(snapshot.request);
    }
  }

  async function handleChooseMove(moveIndex) {
    if (!battleId || isAnimating) return;
    setIsAnimating(true);
    setRequest(null);
    try {
      const snapshot = await chooseMove({ battleId, moveIndex });
      await playEvents(snapshot);
    } catch (e) {
      setError(e?.message || 'Failed to choose move');
      setIsAnimating(false);
    }
  }

  async function handleForceSwitch(switchIndex) {
    if (!battleId || isAnimating) return;
    setIsAnimating(true);
    setRequest(null);
    try {
      const snapshot = await chooseSwitch({ battleId, switchIndex });
      await playEvents(snapshot);
    } catch (e) {
      setError(e?.message || 'Failed to switch');
      setIsAnimating(false);
    }
  }

  function resetBattle() {
    setPhase('setup');
    setBattleId(null);
    setRequest(null);
    setLog([]);
    setWinner(null);
    setBlueTeam([]);
  }

  const moves = request?.active?.[0]?.moves || [];
  const needsSwitch = request?.forceSwitch?.[0];
  const switchOptions = request?.side?.pokemon || [];

  return (
    <>
      <Header />
      <div className="with-header-offset bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-black">
        <div className="page-container py-10 min-h-[calc(90dvh-var(--header-height))]">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-6 text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Play vs CPU
            </h1>

            {phase === 'setup' && (
              <div>
                <p className="text-center text-gray-600 mb-6">
                  Pick 1–6 Pokémon. Red team will be randomly generated.
                </p>

                <div className="max-w-md mx-auto mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Add Pokémon to your team ({blueTeam.length}/6)
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsDropdownOpen(true)}
                      className="w-full border border-black/20 rounded-lg px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {isDropdownOpen && filteredPokemon.length > 0 && (
                      <div className="absolute z-20 mt-2 w-full rounded-lg border border-black/20 bg-white shadow-lg max-h-64 overflow-auto">
                        {filteredPokemon.slice(0, 50).map((p) => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => addToTeam(p)}
                            className="block w-full text-left px-4 py-3 hover:bg-indigo-50 capitalize border-b border-black/5 last:border-b-0"
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                  {blueTeam.map((p, i) => (
                    <div
                      key={p.id}
                      className="relative p-3 bg-white rounded-lg border border-blue-300"
                    >
                      <button
                        onClick={() => removeFromTeam(i)}
                        className="absolute top-1 right-1 bg-black/30 hover:bg-black/60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                      >
                        ✕
                      </button>
                      <img
                        src={spriteUrl(p.name)}
                        alt={p.name}
                        className="w-16 h-16 mx-auto object-contain"
                        onError={(e) => {
                          e.currentTarget.style.visibility = 'hidden';
                        }}
                      />
                      <p className="text-xs text-center capitalize mt-1 truncate">
                        {p.name}
                      </p>
                    </div>
                  ))}
                </div>

                {error && (
                  <p className="text-red-600 text-center mb-3">{error}</p>
                )}

                <div className="text-center">
                  <button
                    onClick={handleStart}
                    disabled={isStarting || blueTeam.length === 0}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-xl font-bold rounded-full shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    {isStarting ? 'Starting…' : '⚔️ Fight!'}
                  </button>
                </div>
              </div>
            )}

            {phase === 'battle' && (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <ActiveCard
                    pokemon={blue}
                    side="p1"
                    isShaking={shakeSide === 'p1'}
                  />
                  <ActiveCard
                    pokemon={red}
                    side="p2"
                    isShaking={shakeSide === 'p2'}
                  />
                </div>

                <div className="bg-white rounded-xl border border-black/10 p-4 mb-4 h-48 overflow-auto font-mono">
                  <AnimatePresence initial={false}>
                    {log.slice(-12).map((e, i) => (
                      <EventLine key={`${i}-${e.type}-${e.name||e.actorName||''}`} event={e} />
                    ))}
                  </AnimatePresence>
                </div>

                {winner !== null && (
                  <div className="text-center mb-4">
                    <h2
                      className={`text-3xl font-bold ${
                        winner === 'blue'
                          ? 'text-blue-600'
                          : winner === 'red'
                          ? 'text-red-600'
                          : 'text-gray-700'
                      }`}
                    >
                      {winner === 'tie'
                        ? "It's a tie!"
                        : winner === 'blue'
                        ? '🎉 You won!'
                        : '💀 You lost'}
                    </h2>
                    <button
                      onClick={resetBattle}
                      className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                    >
                      Play again
                    </button>
                  </div>
                )}

                {!winner && needsSwitch && !isAnimating && (
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                    <p className="font-semibold mb-2">
                      Your Pokémon fainted. Choose the next one:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {switchOptions.map((p, i) => {
                        const idx = i + 1;
                        const fainted = p.condition.endsWith(' fnt');
                        if (p.active || fainted) return null;
                        const name = p.details.split(',')[0].toLowerCase();
                        return (
                          <button
                            key={p.ident}
                            onClick={() => handleForceSwitch(idx)}
                            className="p-2 bg-white border border-indigo-300 rounded-lg hover:bg-indigo-50"
                          >
                            <img
                              src={spriteUrl(name)}
                              alt={name}
                              className="w-12 h-12 mx-auto"
                              onError={(e) => {
                                e.currentTarget.style.visibility = 'hidden';
                              }}
                            />
                            <p className="text-xs capitalize">{name}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {!winner && !needsSwitch && !isAnimating && moves.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {moves.map((m, i) => (
                      <MoveButton
                        key={m.id || i}
                        move={m}
                        onClick={() => handleChooseMove(i + 1)}
                      />
                    ))}
                  </div>
                )}

                {!winner && isAnimating && (
                  <p className="text-center text-gray-600 italic">
                    Battle in progress…
                  </p>
                )}

                {error && (
                  <p className="text-red-600 text-center mt-3">{error}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
