import React, { useEffect, useRef, useState } from 'react';
import {
  fetchPokemonList,
  fetchPokemonDetails,
  getTypeColor,
} from '../api/pokemon.js';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function TypeBadge({ type }) {
  const color = getTypeColor(type);
  return (
    <span
      className="px-2 py-1 rounded-md text-xs font-semibold text-white uppercase"
      style={{ backgroundColor: color }}
    >
      {type}
    </span>
  );
}

function PokemonCard({ pokemon, onAddToTeam, showActions = true }) {
  return (
    <div className="border border-black/10 rounded-lg p-4 bg-white shadow-sm">
      <div className="flex flex-col items-center">
        <img
          src={
            pokemon.sprites.other['official-artwork'].front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          className="w-32 h-32 object-contain"
        />
        <h3 className="text-lg font-semibold capitalize mt-2">
          {pokemon.name}
        </h3>
        <div className="flex gap-2 mt-2 flex-wrap justify-center">
          {pokemon.types.map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </div>
        {showActions && (
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
        )}
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
}) {
  const bgColor = teamColor === 'blue' ? 'bg-blue-50' : 'bg-red-50';
  const borderColor =
    teamColor === 'blue' ? 'border-blue-200' : 'border-red-200';

  return (
    <div
      className={`border ${borderColor} rounded-lg p-3 ${bgColor} flex flex-col items-center relative`}
    >
      <div className="absolute top-1 left-1 bg-black/70 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
        #{position}
      </div>

      <button
        onClick={onRemove}
        className="absolute top-1 right-1 bg-black/30 hover:bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors"
        title="Remove Pokemon"
      >
        ✕
      </button>

      <div className="w-20 h-20 mb-2">
        <img
          src={
            pokemon.sprites.other['official-artwork'].front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          className="w-full h-full object-contain"
        />
      </div>
      <h4 className="font-semibold capitalize text-sm text-center truncate w-full">
        {pokemon.name}
      </h4>
      <div className="flex gap-1 mt-2 flex-wrap justify-center">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="px-2 py-0.5 rounded text-xs font-semibold text-white uppercase"
            style={{ backgroundColor: getTypeColor(t.type.name) }}
          >
            {t.type.name}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={onMoveLeft}
          disabled={isFirst}
          className="bg-gray-200 hover:bg-gray-300 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 rounded px-3 py-1 text-xs font-medium transition-colors"
          title="Move left"
        >
          ←
        </button>
        <button
          onClick={onMoveRight}
          disabled={isLast}
          className="bg-gray-200 hover:bg-gray-300 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 rounded px-3 py-1 text-xs font-medium transition-colors"
          title="Move right"
        >
          →
        </button>
      </div>
    </div>
  );
}

function PokemonBattle() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);
  const dropdownRef = useRef(null);

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
    function onDocMouseDown(e) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    function onDocKeyDown(e) {
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

  async function handleSelectPokemon(pokemon) {
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

  function addToTeam(team) {
    if (!selectedPokemon) return;

    if (team === 'blue') {
      if (blueTeam.length >= 6) {
        alert('Blue team is full (max 6 Pokemon)');
        return;
      }
      if (blueTeam.find((p) => p.id === selectedPokemon.id)) {
        alert('This Pokemon is already in the blue team');
        return;
      }
      setBlueTeam([...blueTeam, selectedPokemon]);
    } else {
      if (redTeam.length >= 6) {
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

  function removeFromTeam(team, index) {
    if (team === 'blue') {
      setBlueTeam(blueTeam.filter((_, i) => i !== index));
    } else {
      setRedTeam(redTeam.filter((_, i) => i !== index));
    }
  }

  function moveInTeam(team, index, direction) {
    const currentTeam = team === 'blue' ? blueTeam : redTeam;
    const setTeam = team === 'blue' ? setBlueTeam : setRedTeam;
    const newIndex = direction === 'left' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= currentTeam.length) return;

    const newTeam = [...currentTeam];
    [newTeam[index], newTeam[newIndex]] = [newTeam[newIndex], newTeam[index]];
    setTeam(newTeam);
  }

  function clearTeam(team) {
    if (team === 'blue') {
      setBlueTeam([]);
    } else {
      setRedTeam([]);
    }
  }

  async function generateRandomTeam(team) {
    if (pokemonList.length === 0) {
      alert('Pokemon list is still loading...');
      return;
    }

    setIsLoading(true);
    try {
      const teamSize = 6;
      const selectedIndices = new Set();
      const newTeam = [];

      while (selectedIndices.size < teamSize) {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        selectedIndices.add(randomIndex);
      }

      // Fetch details for each selected Pokemon
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
    <>
      <Header />
      <div className="with-header-offset bg-gradient-to-br from-purple-50 to-blue-50 text-black">
        <div className="page-container py-10 min-h-[calc(90dvh-var(--header-height))]">
          <div className="max-w-7xl mx-auto">
            <h1 className="mb-6 text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              Pokemon Battle Simulator
            </h1>

            <div className="max-w-md mx-auto mb-8">
              <label className="block text-sm font-medium mb-2">
                Search Pokemon
              </label>
              <div className="relative" ref={dropdownRef}>
                <input
                  type="text"
                  placeholder="Search for a Pokemon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  className="w-full border border-black/20 rounded-lg px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {isDropdownOpen && filteredPokemon.length > 0 && (
                  <div className="absolute z-20 mt-2 w-full rounded-lg border border-black/20 bg-white shadow-lg max-h-64 overflow-auto">
                    {filteredPokemon.slice(0, 100).map((pokemon) => (
                      <button
                        key={pokemon.name}
                        type="button"
                        onClick={() => handleSelectPokemon(pokemon)}
                        className="block w-full text-left px-4 py-3 hover:bg-purple-50 capitalize border-b border-black/5 last:border-b-0"
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
                <h2 className="text-xl font-semibold mb-3 text-center">
                  Selected Pokemon
                </h2>
                <PokemonCard
                  pokemon={selectedPokemon}
                  onAddToTeam={addToTeam}
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-600">
                      Blue Team
                    </h2>
                    <span className="text-sm font-medium text-gray-600">
                      {blueTeam.length}/6
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => clearTeam('blue')}
                      disabled={blueTeam.length === 0}
                      className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 text-sm font-medium transition-colors"
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
                  <p className="text-gray-400 text-center py-8">
                    No Pokemon yet
                  </p>
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

              <div className="bg-white rounded-xl shadow-md p-6 border-2 border-red-500">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-red-600">
                      Red Team
                    </h2>
                    <span className="text-sm font-medium text-gray-600">
                      {redTeam.length}/6
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => clearTeam('red')}
                      disabled={redTeam.length === 0}
                      className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 text-sm font-medium transition-colors"
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
                  <p className="text-gray-400 text-center py-8">
                    No Pokemon yet
                  </p>
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PokemonBattle;
