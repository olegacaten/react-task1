import React, { useEffect, useState, ChangeEvent } from 'react';
import { DetailedPokemon, PokemonClientSide } from '../../interfaces/index';
import { LocalStorageGet, LocalStorageWrite } from '../../utils/LocalStorage';
import { GetAllPokemons } from '../../api/FetchPokemon';
import ResultContainer from '../ResultContainer/ResultContainer';
import Loading from '../Loading/Loading';
import StylesSearchContainer from './SearchContainer.module.scss';
import Error_Bbtn from '../Erorrs/Error_Bbtn';

// Define constants for local storage keys
const LOCAL_STORAGE_KEY = 'pokemonsClientSide';
const LOCAL_STORAGE_SEARCH_KEY = 'SearchWord';

const SearchContainer: React.FC = () => {
  const [searchWord, setSearchWord] = useState<string>('');
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonClientSide[] | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Fetch data and initialize state
  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      const localStorageSavedWord = LocalStorageGet(LOCAL_STORAGE_SEARCH_KEY);
      setSearchWord(localStorageSavedWord || '');

      const storedPokemons = LocalStorageGet(LOCAL_STORAGE_KEY);
      if (storedPokemons) {
        setFilteredPokemons(JSON.parse(storedPokemons));
        setIsLoaded(true);
      } else {
        const pokemons: DetailedPokemon[] = await GetAllPokemons();

        const simplifiedPokemons: PokemonClientSide[] = pokemons.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          sprite: pokemon.sprites.front_default,
          types: pokemon.types,
        }));

        LocalStorageWrite(LOCAL_STORAGE_KEY, JSON.stringify(simplifiedPokemons));
        setFilteredPokemons(simplifiedPokemons);
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  // Filter pokemons based on search word
  const filterPokemons = () => {
    if (!filteredPokemons || !searchWord.trim()) {
      return filteredPokemons;
    }

    return filteredPokemons.filter(item =>
      item.name.toLowerCase().includes(searchWord.toLowerCase())
    );
  };

  // Handle input change
  const handleChangeInputSave = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  // Perform search and update local storage
  const searchForPokemon = () => {
    LocalStorageWrite(LOCAL_STORAGE_SEARCH_KEY, searchWord);
  };

  // Get the filtered pokemons based on the current search word
  const displayedPokemons = filterPokemons();

  return (
    <>
      <div className={StylesSearchContainer.Search}>
        <div className={StylesSearchContainer.Search__input}>
          <input
            type="text"
            className={StylesSearchContainer.Search__input}
            value={searchWord}
            onChange={handleChangeInputSave}
          />
          <button type="button" className="search__btn" onClick={searchForPokemon}>
            SEARCH
          </button>
        </div>
        <Error_Bbtn />
      </div>

      {isLoaded ? (
        <ResultContainer pokemon={displayedPokemons} />
      ) : (
        <Loading isLoaded={isLoaded} />
      )}
    </>
  );
};

export default SearchContainer;
