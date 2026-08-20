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

/**
 * Cor de texto legível sobre a cor do tipo. As cores canônicas variam muito em
 * luminância — `electric` (#F8D030) e `ice` (#98D8D8) davam menos de 2:1 com
 * texto branco. Escolhemos preto ou branco pela luminância relativa (WCAG),
 * sem alterar a cor do tipo em si, que é a identidade do dado.
 */
export function getTypeTextColor(type: string): string {
  const hex = getTypeColor(type).replace('#', '');
  const channel = (i: number) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const luminance =
    0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
  // Contraste com branco = 1.05 / (L + 0.05); com preto = (L + 0.05) / 0.05.
  return luminance > 0.183 ? '#0b0d0c' : '#ffffff';
}
