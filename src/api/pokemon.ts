import { apiFetch } from './client';
import type {
  BattleResult,
  BattleSnapshot,
  BattleTeamMember,
  PokemonDetails,
  PokemonListEntry,
} from './pokemon-types';

export async function fetchPokemonList(): Promise<PokemonListEntry[]> {
  const data = await apiFetch<{ results?: PokemonListEntry[] }>(
    '/pokemon?limit=100000'
  );
  return data.results || [];
}

export async function fetchPokemonDetails(
  url: string
): Promise<PokemonDetails> {
  const match = url.match(/\/pokemon\/([^/]+)\/?$/);
  const nameOrId = match ? match[1] : url;
  return apiFetch<PokemonDetails>(`/pokemon/${nameOrId}`);
}

export async function simulateBattle({
  blueTeam,
  redTeam,
}: {
  blueTeam: BattleTeamMember[];
  redTeam: BattleTeamMember[];
}): Promise<BattleResult> {
  return apiFetch<BattleResult>('/battles/simulate', {
    method: 'POST',
    body: JSON.stringify({ blueTeam, redTeam }),
  });
}

export async function startPlayBattle({
  blueTeam,
  redTeam,
}: {
  blueTeam: BattleTeamMember[];
  redTeam: BattleTeamMember[];
}): Promise<BattleSnapshot> {
  return apiFetch<BattleSnapshot>('/play/start', {
    method: 'POST',
    body: JSON.stringify({ blueTeam, redTeam }),
  });
}

export async function chooseMove({
  battleId,
  moveIndex,
}: {
  battleId: string;
  moveIndex: number;
}): Promise<BattleSnapshot> {
  return apiFetch<BattleSnapshot>(`/play/${battleId}/choose`, {
    method: 'POST',
    body: JSON.stringify({ move: moveIndex }),
  });
}

export async function chooseSwitch({
  battleId,
  switchIndex,
}: {
  battleId: string;
  switchIndex: number;
}): Promise<BattleSnapshot> {
  return apiFetch<BattleSnapshot>(`/play/${battleId}/choose`, {
    method: 'POST',
    body: JSON.stringify({ switch: switchIndex }),
  });
}

const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

export function getTypeColor(type: string): string {
  return TYPE_COLORS[type.toLowerCase()] || '#777777';
}
