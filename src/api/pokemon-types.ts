export type PokemonListEntry = {
  name: string;
  url: string;
};

export type PokemonTypeSlot = {
  slot: number;
  type: { name: string; url: string };
};

export type PokemonSprites = {
  front_default: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
};

export type PokemonDetails = {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
};

export type BattleTeamMember = {
  species: string;
};

export type BattleResult = {
  id: string;
  winner: 'blue' | 'red' | 'tie';
  turns: number;
  log?: string[];
};

export type BattleMove = {
  id?: string;
  move?: string;
  pp?: number;
  maxpp?: number;
  disabled?: boolean;
};

export type BattleActivePokemon = {
  moves?: BattleMove[];
};

export type BattleSidePokemon = {
  ident: string;
  details: string;
  condition: string;
  active?: boolean;
};

export type BattleRequest = {
  active?: BattleActivePokemon[];
  forceSwitch?: boolean[];
  side?: { pokemon: BattleSidePokemon[] };
};

export type BattleEvent = {
  type: string;
  side?: 'p1' | 'p2';
  name?: string;
  actorName?: string;
  move?: string;
  hp?: number;
  maxHp?: number;
  status?: string;
  number?: number;
  winner?: 'blue' | 'red' | 'tie';
};

export type BattleSnapshot = {
  id: string;
  newEvents?: BattleEvent[];
  finished?: boolean;
  winner?: 'blue' | 'red' | 'tie';
  request?: BattleRequest | null;
};
