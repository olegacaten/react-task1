

export interface StateProps {
  SearchWord: string ;
  detailedPokemons_Obj: DetailedPokemon[] | undefined;
  filteredPokemons: DetailedPokemon[] | undefined;
  isLoaded:boolean;
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}


export interface DetailedPokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonClientSide {
  id: number;
  name: string;
  sprite: string;
  types: PokemonType[];
}