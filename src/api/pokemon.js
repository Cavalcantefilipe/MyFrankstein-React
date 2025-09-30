export async function fetchPokemonList() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon list');
    }
    const data = await response.json();
    return data.results;
}

export async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon details');
    }
    const data = await response.json();
    return data;
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
