import React from 'react';
import './App.css';


interface Pokemon {
  height: number;
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}
interface InterfaceData {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
}

interface MyState {
  SearchWord:string;
  PokemonList: InterfaceData | null;
  DetailedPokemon: Pokemon[] | null; 
  isLoading: boolean;
  fetchingDetailed: boolean;

}


class App extends React.Component<object, MyState> {

  state: MyState = {
    SearchWord: '',
    PokemonList: null,
    DetailedPokemon: null, 
    isLoading: true,
    fetchingDetailed: false,
  };


  InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => {
      const newValue = e.target.value;
      if (prevState.SearchWord !== newValue) {
        console.log('Previous SearchWord: ', prevState.SearchWord);
        console.log('New SearchWord: ', newValue);
      }
      return { SearchWord: newValue };
    });
  };

  fetchPokemonData = async (url?: string) => {
    this.setState({ isLoading: true });
    try {
      let data;
      if (this.state.SearchWord) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${this.state.SearchWord}`
        );
        data = await response.json();
        this.setState({ DetailedPokemon: [data], isLoading: false });
      } else {
        const apiUrl = url ? url : 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=6';
        const response = await fetch(apiUrl);
        data = await response.json();
        this.setState({ PokemonList: data });
        if (!this.state.fetchingDetailed) {
          this.setState({ fetchingDetailed: true }, () => {
            this.fetchDetailedPokemon();
          });
        }
      }
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      this.setState({ DetailedPokemon: null, isLoading: false });
    }
  };



  fetchDetailedPokemon = async () => {
    if (!this.state.PokemonList) {
      return;
    }
    try {
      const promises = this.state.PokemonList.results.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      );

      const detailedPokemonData: Pokemon[] = await Promise.all(promises);
      this.setState({ DetailedPokemon: detailedPokemonData, isLoading: false, fetchingDetailed: false }); 
      console.log('Gathered Detailed info');
      console.log(detailedPokemonData);
    } catch (error) {
      console.error("Error fetching detailed Pokemon:", error);
      this.setState({ isLoading: false, fetchingDetailed: false }); 
    }
  };

  componentDidMount() {
    this.fetchPokemonData();
    console.log('componentDidMount');
  }

  handlePagination = (nextPage: boolean) => {
    if (this.state.PokemonList) {
      const url = nextPage ? this.state.PokemonList.next : this.state.PokemonList.previous;
      if (url) {
        this.fetchPokemonData(url);
      }
    }
  };



  render() {
    return (     <div className="Container">
      {this.state.isLoading && <div>Loading...</div>}
      <div className="Container__search-container">
        <input
          type="text"
          value={this.state.SearchWord}
          onChange={this.InputChange}
          placeholder="Type your search word"
          className="Container__search-container__input"
        />
        <button onClick={this.fetchPokemonData} className="Container__search-container__button">
          Search
        </button>
      </div>
      <div className="Container__pokedex-result">
        {this.state.DetailedPokemon ? (
          this.state.DetailedPokemon.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))
        ) : (
          'No Data Available'
        )}
        {this.state.PokemonList && this.state.DetailedPokemon && this.state.DetailedPokemon.length > 1 && (
          <div className="Container__pagination">
            {this.state.PokemonList.previous && (
              <button onClick={() => this.handlePagination(false)}>Previous</button>
            )}
            {this.state.PokemonList.next && (
              <button onClick={() => this.handlePagination(true)}>Next</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
};

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => (
  <div className="Container__pokedex-result__card">
    {pokemon.id ? `"${pokemon.id}"` : 'ID not available'}
    {pokemon.types.length > 0 ? (
      pokemon.types.map((type) => type.type.name).join(', ')
    ) : (
      'No Type Available'
    )}
    {pokemon.name ? `"${pokemon.name}"` : 'Name not available'}
    {pokemon.sprites && pokemon.sprites.front_default ? (
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    ) : (
      'No Image Available'
    )}
  </div>
);
export default App;
