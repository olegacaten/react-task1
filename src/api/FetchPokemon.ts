import { PokemonResponse, DetailedPokemon } from "../interfaces";

export async function GetAllPokemons():Promise<DetailedPokemon[]> {

  const UrlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  const next = `${UrlPokemon}?limit=1100&offset=0`;
 try {
  
  const Response = await fetch(next);
  if(!Response.ok){
    throw new Error ("Couldnt fetch list of pokemons");
  }
  const pokemonNamesObj: PokemonResponse = await Response.json();

  const detailedPokemons = await Promise.all(pokemonNamesObj.results.map(async (pokemon) => {
    return GetAllDetailedPokemons(pokemon.url);
  }));
  return detailedPokemons;

} catch (error) {
  console.error("Error fetching Pokemon data: ", error);
  return [];

}
};




async function GetAllDetailedPokemons(url:string):Promise<DetailedPokemon> {

  const result = await fetch(url);
  if(!result.ok){
    throw new Error (`Couldnt fetch detailed info about pokemon from ${url}`)
  }
  return result.json();
  
};

