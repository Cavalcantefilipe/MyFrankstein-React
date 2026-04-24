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

function getSprite(pokemon) {
  return (
    pokemon?.sprites?.other?.['official-artwork']?.front_default ||
    pokemon?.sprites?.front_default ||
    null
  );
}

function capitalize(s = '') {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function TypeBadge({ type }) {
  return (
    <span
      className="px-2 py-0.5 rounded-md text-xs font-semibold text-white uppercase"
      style={{ backgroundColor: getTypeColor(type) }}
    >
      {type}
    </span>
  );
}

function HpBar({ hp, maxHp }) {
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

function ActiveCard({ active, teamSource, side, isShaking }) {
  if (!active) return null;
  const teamMatch = teamSource?.find(
    (p) => p.name.toLowerCase() === active.name.toLowerCase()
  );
  const sprite = getSprite(teamMatch);
  const types = teamMatch?.types?.map((t) => t.type.name) || [];
  const label = side === 'p1' ? 'You' : 'Opponent';
  const labelColor = side === 'p1' ? 'text-blue-600' : 'text-red-600';

  return (
    <div className="flex-1 flex flex-col items-center p-4 bg-white rounded-xl border border-black/10 shadow-sm">
      <p className={`text-xs font-bold uppercase tracking-wide ${labelColor}`}>
        {label}
      </p>
      <h3 className="text-lg font-semibold capitalize mb-1">{active.name}</h3>
      <div className="flex gap-1 mb-2 flex-wrap justify-center">
        {types.map((t) => (
          <TypeBadge key={t} type={t} />
        ))}
      </div>
      {sprite && (
        <motion.img
          src={sprite}
          alt={active.name}
          className="w-32 h-32 object-contain"
          animate={
            isShaking
              ? { x: [-8, 8, -6, 6, -3, 3, 0], opacity: [1, 0.4, 1, 0.4, 1] }
              : { x: 0, opacity: 1 }
          }
          transition={{ duration: 0.4 }}
        />
      )}
      <div className="w-full mt-3">
        <HpBar hp={active.hp} maxHp={active.maxHp} />
      </div>
    </div>
  );
}

function MoveButton({ move, onClick, disabled }) {
  const label = move.move || capitalize(move.id || '');
  const ppLow = move.pp !== undefined && move.pp <= 2;
  const isDisabled = disabled || move.disabled || move.pp === 0;
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`px-3 py-3 rounded-lg border-2 font-semibold text-left transition-all ${
        isDisabled
          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-white border-indigo-300 hover:bg-indigo-50 hover:border-indigo-500'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="truncate">{label}</span>
        <span
          className={`text-xs ml-2 ${ppLow ? 'text-red-500' : 'text-gray-500'}`}
        >
          {move.pp !== undefined ? `${move.pp}/${move.maxpp}` : ''}
        </span>
      </div>
    </button>
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

export default function PlayBattle() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isSelectLoading, setIsSelectLoading] = useState(false);
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeamDetails, setRedTeamDetails] = useState([]);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);

  const [battleId, setBattleId] = useState(null);
  const [request, setRequest] = useState(null);
  const [log, setLog] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [winner, setWinner] = useState(null);
  const [shakeSide, setShakeSide] = useState(null);
  const [blueActive, setBlueActive] = useState(null);
  const [redActive, setRedActive] = useState(null);

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

  async function handleSelectPokemon(pokemon) {
    setIsSelectLoading(true);
    setIsDropdownOpen(false);
    setSearchQuery('');
    try {
      const details = await fetchPokemonDetails(pokemon.url);
      setSelectedPokemon(details);
    } catch (e) {
      console.error('Failed to fetch details:', e);
    } finally {
      setIsSelectLoading(false);
    }
  }

  function addSelectedToTeam() {
    if (!selectedPokemon) return;
    if (blueTeam.length >= 6) return;
    if (blueTeam.find((p) => p.id === selectedPokemon.id)) return;
    setBlueTeam((t) => [...t, selectedPokemon]);
    setSelectedPokemon(null);
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
      const redDetails = await generateRandomRedTeam(blueTeam.length);
      setRedTeamDetails(redDetails);
      const snapshot = await startPlayBattle({
        blueTeam: blueTeam.map((p) => ({ species: p.name })),
        redTeam: redDetails.map((p) => ({ species: p.name })),
      });
      setBattleId(snapshot.id);
      await playEvents(snapshot);
    } catch (e) {
      setError(e?.message || 'Failed to start battle');
    } finally {
      setIsStarting(false);
    }
  }

  async function generateRandomRedTeam(size) {
    if (pokemonList.length === 0) return [];
    const chosen = new Set();
    const result = [];
    while (chosen.size < size && chosen.size < pokemonList.length) {
      const pick = pokemonList[Math.floor(Math.random() * pokemonList.length)];
      if (chosen.has(pick.name)) continue;
      chosen.add(pick.name);
      try {
        const details = await fetchPokemonDetails(pick.url);
        result.push(details);
      } catch (e) {
        // skip on error
      }
    }
    return result;
  }

  function applyEventsToActive(events) {
    for (const e of events) {
      if (e.type === 'switch') {
        const next = { name: capitalize(e.name), hp: e.hp, maxHp: e.maxHp };
        if (e.side === 'p1') setBlueActive(next);
        else if (e.side === 'p2') setRedActive(next);
      } else if (e.type === 'damage' || e.type === 'heal') {
        if (e.side === 'p1') {
          setBlueActive((p) => (p ? { ...p, hp: e.hp, maxHp: e.maxHp } : p));
          if (e.type === 'damage') triggerShake('p1');
        } else if (e.side === 'p2') {
          setRedActive((p) => (p ? { ...p, hp: e.hp, maxHp: e.maxHp } : p));
          if (e.type === 'damage') triggerShake('p2');
        }
      }
    }
  }

  function triggerShake(side) {
    setShakeSide(side);
    setTimeout(() => setShakeSide(null), 400);
  }

  async function playEvents(snapshot) {
    setIsAnimating(true);
    const events = snapshot.newEvents || [];
    for (const evt of events) {
      setLog((l) => [...l, evt]);
      applyEventsToActive([evt]);
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
    setBattleId(null);
    setRequest(null);
    setLog([]);
    setWinner(null);
    setRedTeamDetails([]);
    setBlueActive(null);
    setRedActive(null);
  }

  const moves = request?.active?.[0]?.moves || [];
  const needsSwitch = request?.forceSwitch?.[0];
  const switchOptions = request?.side?.pokemon || [];

  return (
    <>
      <Header />
      <div className="with-header-offset bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-black">
        <div className="page-container py-10 min-h-[calc(90dvh-var(--header-height))]">
          <div className="max-w-5xl mx-auto">
            <h1 className="mb-6 text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Play vs CPU
            </h1>

            <div>
              <p className="text-center text-gray-600 mb-6">
                Pick 1–6 Pokémon. Red team is generated randomly.
              </p>

                <div className="max-w-md mx-auto mb-8">
                  <label className="block text-sm font-medium mb-2">
                    Search Pokémon
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
                        {filteredPokemon.slice(0, 100).map((p) => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => handleSelectPokemon(p)}
                            className="block w-full text-left px-4 py-3 hover:bg-indigo-50 capitalize border-b border-black/5 last:border-b-0"
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {isSelectLoading && (
                  <p className="text-center mb-4 text-gray-600">
                    Loading Pokémon…
                  </p>
                )}

                {selectedPokemon && !isSelectLoading && (
                  <div className="max-w-sm mx-auto mb-8">
                    <h2 className="text-xl font-semibold mb-3 text-center">
                      Selected Pokémon
                    </h2>
                    <div className="border border-black/10 rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex flex-col items-center">
                        <img
                          src={getSprite(selectedPokemon)}
                          alt={selectedPokemon.name}
                          className="w-32 h-32 object-contain"
                        />
                        <h3 className="text-lg font-semibold capitalize mt-2">
                          {selectedPokemon.name}
                        </h3>
                        <div className="flex gap-2 mt-2 flex-wrap justify-center">
                          {selectedPokemon.types.map((t) => (
                            <TypeBadge key={t.type.name} type={t.type.name} />
                          ))}
                        </div>
                        <button
                          onClick={addSelectedToTeam}
                          disabled={
                            blueTeam.length >= 6 ||
                            !!blueTeam.find((p) => p.id === selectedPokemon.id)
                          }
                          className="mt-4 w-full px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                          {blueTeam.find((p) => p.id === selectedPokemon.id)
                            ? 'Already in team'
                            : blueTeam.length >= 6
                            ? 'Team is full'
                            : 'Add to team'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl shadow-md p-6 border-2 border-indigo-500 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-indigo-600">
                        Your Team
                      </h2>
                      <span className="text-sm font-medium text-gray-600">
                        {blueTeam.length}/6
                      </span>
                    </div>
                  </div>
                  {blueTeam.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                      No Pokémon yet
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {blueTeam.map((p, i) => (
                        <div
                          key={p.id}
                          className="border border-indigo-200 rounded-lg p-3 bg-indigo-50 flex flex-col items-center relative"
                        >
                          <div className="absolute top-1 left-1 bg-black/70 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            #{i + 1}
                          </div>
                          <button
                            onClick={() => removeFromTeam(i)}
                            className="absolute top-1 right-1 bg-black/30 hover:bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            ✕
                          </button>
                          <img
                            src={getSprite(p)}
                            alt={p.name}
                            className="w-20 h-20 object-contain"
                          />
                          <h4 className="font-semibold capitalize text-sm text-center truncate w-full mt-1">
                            {p.name}
                          </h4>
                          <div className="flex gap-1 mt-2 flex-wrap justify-center">
                            {p.types.map((t) => (
                              <TypeBadge key={t.type.name} type={t.type.name} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {error && (
                  <p className="text-red-600 text-center mb-3">{error}</p>
                )}

                <div className="text-center">
                  <button
                    onClick={handleStart}
                    disabled={isStarting || blueTeam.length === 0 || (!!battleId && !winner)}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-xl font-bold rounded-full shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    {isStarting
                      ? 'Starting…'
                      : battleId && !winner
                      ? 'Battle in progress…'
                      : battleId && winner
                      ? '⚔️ New Battle'
                      : '⚔️ Fight!'}
                  </button>
                </div>
            </div>

            {battleId && (
              <div className="mt-10 pt-8 border-t-2 border-indigo-200">
                <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
                  Battle Arena
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <ActiveCard
                    active={blueActive}
                    teamSource={blueTeam}
                    side="p1"
                    isShaking={shakeSide === 'p1'}
                  />
                  <ActiveCard
                    active={redActive}
                    teamSource={redTeamDetails}
                    side="p2"
                    isShaking={shakeSide === 'p2'}
                  />
                </div>

                <div className="bg-white rounded-xl border border-black/10 p-4 mb-4 h-48 overflow-auto font-mono">
                  <AnimatePresence initial={false}>
                    {log.slice(-12).map((e, i) => (
                      <EventLine
                        key={`${i}-${e.type}-${e.name || e.actorName || ''}`}
                        event={e}
                      />
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
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {switchOptions.map((p, i) => {
                        const idx = i + 1;
                        const fainted = p.condition.endsWith(' fnt');
                        if (p.active || fainted) return null;
                        const name = p.details.split(',')[0].toLowerCase();
                        const match = blueTeam.find(
                          (bp) => bp.name === name
                        );
                        return (
                          <button
                            key={p.ident}
                            onClick={() => handleForceSwitch(idx)}
                            className="p-2 bg-white border border-indigo-300 rounded-lg hover:bg-indigo-50"
                          >
                            {match && (
                              <img
                                src={getSprite(match)}
                                alt={name}
                                className="w-12 h-12 mx-auto object-contain"
                              />
                            )}
                            <p className="text-xs capitalize text-center">
                              {name}
                            </p>
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
