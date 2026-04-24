import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  startPlayBattle,
  chooseMove,
  chooseSwitch,
  getTypeColor,
} from '../api/pokemon.js';

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
      return null;
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

export default function BattleArena({ blueTeam, redTeam, onReset, token = 0 }) {
  const [battleId, setBattleId] = useState(null);
  const [request, setRequest] = useState(null);
  const [log, setLog] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [winner, setWinner] = useState(null);
  const [shakeSide, setShakeSide] = useState(null);
  const [blueActive, setBlueActive] = useState(null);
  const [redActive, setRedActive] = useState(null);
  const [turnNumber, setTurnNumber] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function start() {
      setError('');
      setLog([]);
      setWinner(null);
      setBlueActive(null);
      setRedActive(null);
      setRequest(null);
      setBattleId(null);
      setTurnNumber(0);
      try {
        const snapshot = await startPlayBattle({
          blueTeam: blueTeam.map((p) => ({ species: p.name })),
          redTeam: redTeam.map((p) => ({ species: p.name })),
        });
        if (cancelled) return;
        setBattleId(snapshot.id);
        await playEvents(snapshot, () => cancelled);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to start battle');
      }
    }
    start();
    return () => {
      cancelled = true;
    };
  }, [token]);

  function applyEventsToActive(events) {
    for (const e of events) {
      if (e.type === 'turn') {
        setTurnNumber(e.number);
      } else if (e.type === 'switch') {
        const next = { name: e.name, hp: e.hp, maxHp: e.maxHp };
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

  async function playEvents(snapshot, isCancelled = () => false) {
    setIsAnimating(true);
    const events = snapshot.newEvents || [];
    for (const evt of events) {
      if (isCancelled()) return;
      setLog((l) => [...l, evt]);
      applyEventsToActive([evt]);
      await sleep(EVENT_DELAY);
    }
    if (isCancelled()) return;
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

  const moves = request?.active?.[0]?.moves || [];
  const needsSwitch = request?.forceSwitch?.[0];
  const switchOptions = request?.side?.pokemon || [];

  return (
    <div>
      {turnNumber > 0 && !winner && (
        <div className="flex justify-center mb-3">
          <div className="px-4 py-1 bg-indigo-600 text-white text-sm font-bold rounded-full shadow">
            Turn {turnNumber}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <ActiveCard
          active={blueActive}
          teamSource={blueTeam}
          side="p1"
          isShaking={shakeSide === 'p1'}
        />
        <ActiveCard
          active={redActive}
          teamSource={redTeam}
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
          {onReset && (
            <button
              onClick={onReset}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            >
              Close
            </button>
          )}
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
              const match = blueTeam.find((bp) => bp.name === name);
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
                  <p className="text-xs capitalize text-center">{name}</p>
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
        <p className="text-center text-gray-600 italic">Battle in progress…</p>
      )}

      {error && <p className="text-red-600 text-center mt-3">{error}</p>}
    </div>
  );
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
