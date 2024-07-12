export interface StateProps {
  SearchWord: string;
  detailedPokemons_Obj:[] |undefined;
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
height: number;
id: number;
name: string;
sprites: {
  front_default: string;
};
weight: number;
  type: {
    name: string;
  }[];
}