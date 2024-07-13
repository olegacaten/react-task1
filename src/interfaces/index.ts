

export interface StateProps {
  SearchWord: string;
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

interface PokemonType {
  type: {
    name: string;
  };
}
