'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  startPlayBattle,
  chooseMove,
  chooseSwitch,
  getTypeColor,
  getTypeTextColor,
} from '@/api/pokemon';
import type {
  BattleEvent,
  BattleRequest,
  BattleSnapshot,
  PokemonDetails,
} from '@/api/pokemon-types';

const EVENT_DELAY = 900;

function getSprite(pokemon?: PokemonDetails): string | null {
  return (
    pokemon?.sprites?.other?.['official-artwork']?.front_default ||
    pokemon?.sprites?.front_default ||
    null
  );
}

function capitalize(s = ''): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className="rounded-md px-2 py-0.5 text-xs font-semibold uppercase"
      style={{
        backgroundColor: getTypeColor(type),
        color: getTypeTextColor(type),
      }}
    >
      {type}
    </span>
  );
}

function HpBar({ hp, maxHp }: { hp: number; maxHp: number }) {
  const pct = Math.max(0, Math.min(100, (hp / Math.max(1, maxHp)) * 100));
  const color =
    pct > 50 ? 'bg-green-500' : pct > 20 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="w-full">
      <div className="h-3 overflow-hidden rounded-full border border-white/[.08] bg-white/[.08]">
        <motion.div
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full ${color}`}
        />
      </div>
      <div className="mt-1 text-right text-xs text-muted">
        {hp} / {maxHp}
      </div>
    </div>
  );
}

type ActivePokemon = {
  name: string;
  hp: number;
  maxHp: number;
};

function ActiveCard({
  active,
  teamSource,
  side,
  isShaking,
}: {
  active: ActivePokemon | null;
  teamSource: PokemonDetails[];
  side: 'p1' | 'p2';
  isShaking: boolean;
}) {
  if (!active) return null;
  const teamMatch = teamSource?.find(
    (p) => p.name.toLowerCase() === active.name.toLowerCase()
  );
  const sprite = getSprite(teamMatch);
  const types = teamMatch?.types?.map((t) => t.type.name) || [];
  const label = side === 'p1' ? 'You' : 'Opponent';
  const labelColor = side === 'p1' ? 'text-blue-400' : 'text-red-400';

  return (
    <div className="flex flex-1 flex-col items-center rounded-xl border border-white/[.08] bg-raised p-4">
      <p className={`text-xs font-bold uppercase tracking-wide ${labelColor}`}>
        {label}
      </p>
      <h3 className="mb-1 text-lg font-semibold capitalize text-fg">{active.name}</h3>
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

function MoveButton({
  move,
  onClick,
  disabled,
}: {
  move: {
    id?: string;
    move?: string;
    pp?: number;
    maxpp?: number;
    disabled?: boolean;
  };
  onClick: () => void;
  disabled?: boolean;
}) {
  const label = move.move || capitalize(move.id || '');
  const ppLow = move.pp !== undefined && move.pp <= 2;
  const isDisabled = disabled || move.disabled || move.pp === 0;
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`px-3 py-3 rounded-lg border-2 font-semibold text-left transition-all ${
        isDisabled
          ? 'cursor-not-allowed border-white/[.06] bg-white/[.03] text-faint'
          : 'border-accent/40 bg-raised text-fg hover:border-accent hover:bg-accent/10'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="truncate">{label}</span>
        <span
          className={`text-xs ml-2 ${ppLow ? 'text-red-400' : 'text-muted'}`}
        >
          {move.pp !== undefined ? `${move.pp}/${move.maxpp}` : ''}
        </span>
      </div>
    </button>
  );
}

function describeEvent(e: BattleEvent): string | null {
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

function EventLine({ event }: { event: BattleEvent }) {
  const text = describeEvent(event);
  if (!text) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-white/[.06] py-1 text-sm text-muted last:border-0"
    >
      {text}
    </motion.div>
  );
}

type Props = {
  blueTeam: PokemonDetails[];
  redTeam: PokemonDetails[];
  onReset?: () => void;
  token?: number;
};

export function BattleArena({ blueTeam, redTeam, onReset, token = 0 }: Props) {
  const [battleId, setBattleId] = useState<string | null>(null);
  const [request, setRequest] = useState<BattleRequest | null>(null);
  const [log, setLog] = useState<BattleEvent[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [winner, setWinner] = useState<'blue' | 'red' | 'tie' | null>(null);
  const [shakeSide, setShakeSide] = useState<'p1' | 'p2' | null>(null);
  const [blueActive, setBlueActive] = useState<ActivePokemon | null>(null);
  const [redActive, setRedActive] = useState<ActivePokemon | null>(null);
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
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to start battle');
        }
      }
    }
    start();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function applyEventsToActive(events: BattleEvent[]) {
    for (const e of events) {
      if (e.type === 'turn') {
        setTurnNumber(e.number ?? 0);
      } else if (e.type === 'switch' && e.name) {
        const next = { name: e.name, hp: e.hp ?? 0, maxHp: e.maxHp ?? 0 };
        if (e.side === 'p1') setBlueActive(next);
        else if (e.side === 'p2') setRedActive(next);
      } else if (e.type === 'damage' || e.type === 'heal') {
        if (e.side === 'p1') {
          setBlueActive((p) =>
            p ? { ...p, hp: e.hp ?? p.hp, maxHp: e.maxHp ?? p.maxHp } : p
          );
          if (e.type === 'damage') triggerShake('p1');
        } else if (e.side === 'p2') {
          setRedActive((p) =>
            p ? { ...p, hp: e.hp ?? p.hp, maxHp: e.maxHp ?? p.maxHp } : p
          );
          if (e.type === 'damage') triggerShake('p2');
        }
      }
    }
  }

  function triggerShake(side: 'p1' | 'p2') {
    setShakeSide(side);
    setTimeout(() => setShakeSide(null), 400);
  }

  async function playEvents(
    snapshot: BattleSnapshot,
    isCancelled: () => boolean = () => false
  ) {
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
      setWinner(snapshot.winner ?? null);
      setRequest(null);
    } else {
      setRequest(snapshot.request ?? null);
    }
  }

  async function handleChooseMove(moveIndex: number) {
    if (!battleId || isAnimating) return;
    setIsAnimating(true);
    setRequest(null);
    try {
      const snapshot = await chooseMove({ battleId, moveIndex });
      await playEvents(snapshot);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to choose move');
      setIsAnimating(false);
    }
  }

  async function handleForceSwitch(switchIndex: number) {
    if (!battleId || isAnimating) return;
    setIsAnimating(true);
    setRequest(null);
    try {
      const snapshot = await chooseSwitch({ battleId, switchIndex });
      await playEvents(snapshot);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to switch');
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
          <div className="rounded-full bg-accent px-4 py-1 text-sm font-bold text-ink">
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

      <div className="mb-4 h-48 overflow-auto rounded-xl border border-white/[.08] bg-ink p-4 font-mono text-fg">
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
                ? 'text-blue-400'
                : winner === 'red'
                  ? 'text-red-400'
                  : 'text-muted'
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
              className="mt-4 rounded-full bg-accent px-6 py-2 font-semibold text-ink transition-colors hover:bg-accent-hover"
            >
              Close
            </button>
          )}
        </div>
      )}

      {!winner && needsSwitch && !isAnimating && (
        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
          <p className="mb-2 font-semibold text-fg">
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
                  className="rounded-lg border border-accent/40 bg-raised p-2 transition-colors hover:border-accent hover:bg-accent/10"
                >
                  {match && (
                    <img
                      src={getSprite(match) || undefined}
                      alt={name}
                      className="w-12 h-12 mx-auto object-contain"
                    />
                  )}
                  <p className="text-center text-xs capitalize text-fg">{name}</p>
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
        <p className="text-center italic text-muted">Battle in progress…</p>
      )}

      {error && <p className="mt-3 text-center text-red-400">{error}</p>}
    </div>
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
