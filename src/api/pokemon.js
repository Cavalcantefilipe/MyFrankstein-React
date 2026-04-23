import { apiFetch } from './client.js';

export async function fetchPokemonList() {
    const data = await apiFetch('/pokemon?limit=100000');
    return data.results || [];
}

export async function fetchPokemonDetails(url) {
    const match = url.match(/\/pokemon\/([^/]+)\/?$/);
    const nameOrId = match ? match[1] : url;
    return apiFetch(`/pokemon/${nameOrId}`);
}

export async function simulateBattle({ blueTeam, redTeam }) {
    return apiFetch('/battles/simulate', {
        method: 'POST',
        body: JSON.stringify({ blueTeam, redTeam }),
    });
}

export function getTypeColor(type) {
    const colors = {
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
    return colors[type.toLowerCase()] || '#777777';
}
