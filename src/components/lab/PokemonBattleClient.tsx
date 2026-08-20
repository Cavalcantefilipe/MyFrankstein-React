'use client';

import { useEffect, useRef, useState } from 'react';
import {
  fetchPokemonList,
  fetchPokemonDetails,
  simulateBattle,
  getTypeColor,
  getTypeTextColor,
} from '@/api/pokemon';
import type {
  BattleResult,
  PokemonDetails,
  PokemonListEntry,
} from '@/api/pokemon-types';
import { BattleArena } from './BattleArena';

const MAX_TEAM_SIZE = 6;
const AUTO_TEAM_SIZE = 6;
const MAX_SEARCH_RESULTS = 100;

function TypeBadge({ type }: { type: string }) {
  const color = getTypeColor(type);
  return (
    <span
      className="rounded-md px-2 py-1 text-xs font-semibold uppercase"
      style={{ backgroundColor: color, color: getTypeTextColor(type) }}
    >
      {type}
    </span>
  );
}

function getSprite(pokemon: PokemonDetails): string {
  return (
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default ||
    ''
  );
}

function PokemonCard({
  pokemon,
  onAddToTeam,
}: {
  pokemon: PokemonDetails;
  onAddToTeam: (team: 'blue' | 'red') => void;
}) {
  return (
    <div className="rounded-lg border border-white/[.08] bg-raised p-4">
      <div className="flex flex-col items-center">
        <img
          src={getSprite(pokemon)}
          alt={pokemon.name}
          className="w-32 h-32 object-contain"
        />
        <h3 className="mt-2 text-lg font-semibold capitalize text-fg">
          {pokemon.name}
        </h3>
        <div className="flex gap-2 mt-2 flex-wrap justify-center">
          {pokemon.types.map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </div>
        <div className="flex gap-2 mt-4 w-full">
          <button
            onClick={() => onAddToTeam('blue')}
            className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            Blue Team
          </button>
          <button
            onClick={() => onAddToTeam('red')}
            className="flex-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Red Team
          </button>
        </div>
      </div>
    </div>
  );
}

function TeamPokemonCard({
  pokemon,
  teamColor,
  position,
  onRemove,
  onMoveLeft,
  onMoveRight,
  isFirst,
  isLast,
}: {
  pokemon: PokemonDetails;
  teamColor: 'blue' | 'red';
  position: number;
  onRemove: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const bgColor = teamColor === 'blue' ? 'bg-blue-500/10' : 'bg-red-500/10';
  const borderColor =
    teamColor === 'blue' ? 'border-blue-500/30' : 'border-red-500/30';

  return (
    <div
      className={`border ${borderColor} rounded-lg p-3 ${bgColor} flex flex-col items-center relative`}
    >
      <div className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink/80 text-xs font-bold text-fg ring-1 ring-white/15">
        #{position}
      </div>

      <button
        onClick={onRemove}
        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-fg transition-colors hover:bg-white/20"
        title="Remove Pokemon"
      >
        ✕
      </button>

      <div className="w-20 h-20 mb-2">
        <img
          src={getSprite(pokemon)}
          alt={pokemon.name}
          className="w-full h-full object-contain"
        />
      </div>
      <h4 className="w-full truncate text-center text-sm font-semibold capitalize text-fg">
        {pokemon.name}
      </h4>
      <div className="flex gap-1 mt-2 flex-wrap justify-center">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="rounded px-2 py-0.5 text-xs font-semibold uppercase"
            style={{
                    backgroundColor: getTypeColor(t.type.name),
                    color: getTypeTextColor(t.type.name),
                  }}
          >
            {t.type.name}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={onMoveLeft}
          disabled={isFirst}
          className="rounded bg-white/10 px-3 py-1 text-xs font-medium text-fg transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
          title="Move left"
        >
          ←
        </button>
        <button
          onClick={onMoveRight}
          disabled={isLast}
          className="rounded bg-white/10 px-3 py-1 text-xs font-medium text-fg transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
          title="Move right"
        >
          →
        </button>
      </div>
    </div>
  );
}

export function PokemonBattleClient() {
  const [pokemonList, setPokemonList] = useState<PokemonListEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [blueTeam, setBlueTeam] = useState<PokemonDetails[]>([]);
  const [redTeam, setRedTeam] = useState<PokemonDetails[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [battleError, setBattleError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playToken, setPlayToken] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadPokemonList() {
      try {
        const list = await fetchPokemonList();
        setPokemonList(list);
      } catch (error) {
        console.error('Failed to load Pokemon list:', error);
      }
    }
    loadPokemonList();
  }, []);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    function onDocKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    }
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onDocKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onDocKeyDown);
    };
  }, []);

  const filteredPokemon = pokemonList.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return p.name.toLowerCase().includes(q);
  });

  async function handleSelectPokemon(pokemon: PokemonListEntry) {
    setIsLoading(true);
    setIsDropdownOpen(false);
    try {
      const details = await fetchPokemonDetails(pokemon.url);
      setSelectedPokemon(details);
    } catch (error) {
      console.error('Failed to fetch Pokemon details:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function addToTeam(team: 'blue' | 'red') {
    if (!selectedPokemon) return;

    if (team === 'blue') {
      if (blueTeam.length >= MAX_TEAM_SIZE) {
        alert('Blue team is full (max 6 Pokemon)');
        return;
      }
      if (blueTeam.find((p) => p.id === selectedPokemon.id)) {
        alert('This Pokemon is already in the blue team');
        return;
      }
      setBlueTeam([...blueTeam, selectedPokemon]);
    } else {
      if (redTeam.length >= MAX_TEAM_SIZE) {
        alert('Red team is full (max 6 Pokemon)');
        return;
      }
      if (redTeam.find((p) => p.id === selectedPokemon.id)) {
        alert('This Pokemon is already in the red team');
        return;
      }
      setRedTeam([...redTeam, selectedPokemon]);
    }
    setSelectedPokemon(null);
    setSearchQuery('');
  }

  function removeFromTeam(team: 'blue' | 'red', index: number) {
    if (team === 'blue') {
      setBlueTeam(blueTeam.filter((_, i) => i !== index));
    } else {
      setRedTeam(redTeam.filter((_, i) => i !== index));
    }
  }

  function moveInTeam(
    team: 'blue' | 'red',
    index: number,
    direction: 'left' | 'right'
  ) {
    const currentTeam = team === 'blue' ? blueTeam : redTeam;
    const setTeam = team === 'blue' ? setBlueTeam : setRedTeam;
    const newIndex = direction === 'left' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= currentTeam.length) return;

    const newTeam = [...currentTeam];
    [newTeam[index], newTeam[newIndex]] = [newTeam[newIndex], newTeam[index]];
    setTeam(newTeam);
  }

  function clearTeam(team: 'blue' | 'red') {
    if (team === 'blue') {
      setBlueTeam([]);
    } else {
      setRedTeam([]);
    }
  }

  async function handleStartBattle() {
    if (blueTeam.length === 0 || redTeam.length === 0) {
      setBattleError('Both teams need at least 1 Pokemon');
      return;
    }
    setBattleError('');
    setIsPlaying(false);
    setIsSimulating(true);
    setBattleResult(null);
    try {
      const result = await simulateBattle({
        blueTeam: blueTeam.map((p) => ({ species: p.name })),
        redTeam: redTeam.map((p) => ({ species: p.name })),
      });
      setBattleResult(result);
    } catch (err) {
      setBattleError(
        err instanceof Error ? err.message : 'Battle simulation failed'
      );
    } finally {
      setIsSimulating(false);
    }
  }

  function handlePlayBattle() {
    if (blueTeam.length === 0 || redTeam.length === 0) {
      setBattleError('Both teams need at least 1 Pokemon');
      return;
    }
    setBattleError('');
    setBattleResult(null);
    setIsPlaying(true);
    setPlayToken((t) => t + 1);
  }

  function handleClosePlay() {
    setIsPlaying(false);
  }

  async function generateRandomTeam(team: 'blue' | 'red') {
    if (pokemonList.length === 0) {
      alert('Pokemon list is still loading...');
      return;
    }

    setIsLoading(true);
    try {
      const selectedIndices = new Set<number>();
      const newTeam: PokemonDetails[] = [];

      while (selectedIndices.size < AUTO_TEAM_SIZE) {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        selectedIndices.add(randomIndex);
      }

      for (const index of selectedIndices) {
        const details = await fetchPokemonDetails(pokemonList[index].url);
        newTeam.push(details);
      }

      if (team === 'blue') {
        setBlueTeam(newTeam);
      } else {
        setRedTeam(newTeam);
      }
    } catch (error) {
      console.error('Failed to generate team:', error);
      alert('Failed to generate team. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="max-w-md mx-auto mb-8">
        <label className="mb-2 block text-sm font-medium text-fg">Search Pokemon</label>
        <div className="relative" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search for a Pokemon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
            className="w-full rounded-lg border border-white/[.12] bg-raised px-4 py-3 text-fg placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          {isDropdownOpen && filteredPokemon.length > 0 && (
            <div className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-lg border border-white/[.08] bg-raised shadow-lg">
              {filteredPokemon.slice(0, MAX_SEARCH_RESULTS).map((pokemon) => (
                <button
                  key={pokemon.name}
                  type="button"
                  onClick={() => handleSelectPokemon(pokemon)}
                  className="block w-full border-b border-white/[.06] px-4 py-3 text-left capitalize text-fg transition-colors last:border-b-0 hover:bg-accent/10"
                >
                  {pokemon.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="text-center mb-8">
          <p className="text-lg">Loading Pokemon...</p>
        </div>
      )}

      {selectedPokemon && !isLoading && (
        <div className="max-w-sm mx-auto mb-8">
          <h2 className="mb-3 text-center text-xl font-semibold text-fg">
            Selected Pokemon
          </h2>
          <PokemonCard pokemon={selectedPokemon} onAddToTeam={addToTeam} />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="rounded-xl border-2 border-blue-500/60 bg-raised p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-blue-400">Blue Team</h2>
              <span className="text-sm font-medium text-muted">
                {blueTeam.length}/6
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => clearTeam('blue')}
                disabled={blueTeam.length === 0}
                className="rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-fg transition-colors hover:bg-white/20 disabled:opacity-50"
                title="Clear team"
              >
                Clear
              </button>
              <button
                onClick={() => generateRandomTeam('blue')}
                disabled={isLoading}
                className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 text-sm font-medium transition-colors"
              >
                {isLoading ? 'Generating...' : '🎲 Auto Generate'}
              </button>
            </div>
          </div>
          {blueTeam.length === 0 ? (
            <p className="py-8 text-center text-faint">No Pokemon yet</p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {blueTeam.map((pokemon, index) => (
                <TeamPokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  teamColor="blue"
                  position={index + 1}
                  onRemove={() => removeFromTeam('blue', index)}
                  onMoveLeft={() => moveInTeam('blue', index, 'left')}
                  onMoveRight={() => moveInTeam('blue', index, 'right')}
                  isFirst={index === 0}
                  isLast={index === blueTeam.length - 1}
                />
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border-2 border-red-500/60 bg-raised p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-red-400">Red Team</h2>
              <span className="text-sm font-medium text-muted">
                {redTeam.length}/6
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => clearTeam('red')}
                disabled={redTeam.length === 0}
                className="rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-fg transition-colors hover:bg-white/20 disabled:opacity-50"
                title="Clear team"
              >
                Clear
              </button>
              <button
                onClick={() => generateRandomTeam('red')}
                disabled={isLoading}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 text-sm font-medium transition-colors"
              >
                {isLoading ? 'Generating...' : '🎲 Auto Generate'}
              </button>
            </div>
          </div>
          {redTeam.length === 0 ? (
            <p className="py-8 text-center text-faint">No Pokemon yet</p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {redTeam.map((pokemon, index) => (
                <TeamPokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  teamColor="red"
                  position={index + 1}
                  onRemove={() => removeFromTeam('red', index)}
                  onMoveLeft={() => moveInTeam('red', index, 'left')}
                  onMoveRight={() => moveInTeam('red', index, 'right')}
                  isFirst={index === 0}
                  isLast={index === redTeam.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={handleStartBattle}
            disabled={
              isSimulating ||
              isPlaying ||
              blueTeam.length === 0 ||
              redTeam.length === 0
            }
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-red-600 text-white text-lg font-bold rounded-full shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {isSimulating ? 'Simulating…' : '⚔️ Auto Simulate'}
          </button>
          <button
            onClick={handlePlayBattle}
            disabled={
              isSimulating || blueTeam.length === 0 || redTeam.length === 0
            }
            className="rounded-full border border-accent/50 px-6 py-3 text-lg font-bold text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            🎮 Play Battle
          </button>
        </div>
        <p className="max-w-md text-center text-xs text-muted">
          <strong>Auto Simulate:</strong> the whole battle is resolved at once.{' '}
          <strong>Play Battle:</strong> you control the Blue team turn by turn
          against an AI playing the Red team you picked.
        </p>

        {battleError && (
          <p className="font-medium text-red-400">{battleError}</p>
        )}

        {battleResult && !isPlaying && (
          <div className="w-full rounded-xl border border-white/[.08] bg-raised p-6">
            <div className="text-center mb-4">
              {battleResult.winner === 'tie' ? (
                <h2 className="text-3xl font-bold text-fg">
                  It&apos;s a tie!
                </h2>
              ) : (
                <h2
                  className={`text-3xl font-bold ${
                    battleResult.winner === 'blue'
                      ? 'text-blue-400'
                      : 'text-red-400'
                  }`}
                >
                  {battleResult.winner === 'blue' ? 'Blue' : 'Red'} Team wins!
                </h2>
              )}
              <p className="mt-1 text-sm text-muted">
                Battle #{battleResult.id} · {battleResult.turns} turns
              </p>
            </div>

            <details className="border-t border-white/[.08] pt-4">
              <summary className="cursor-pointer text-sm font-medium text-muted transition-colors hover:text-fg">
                Show battle log ({battleResult.log?.length || 0} events)
              </summary>
              <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap break-all rounded-md bg-ink p-3 text-xs text-muted">
                {(battleResult.log || []).join('\n')}
              </pre>
            </details>
          </div>
        )}
      </div>

      {isPlaying && (
        <div className="mt-10 border-t border-white/[.08] pt-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-accent">
            Battle Arena
          </h2>
          <BattleArena
            blueTeam={blueTeam}
            redTeam={redTeam}
            onReset={handleClosePlay}
            token={playToken}
          />
        </div>
      )}
    </div>
  );
}
