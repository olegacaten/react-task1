import React from 'react';
import './App.css';

interface PokemonSprites {
  front_default: string | null;
}

interface Pokemon {
  height: number;
  order: number;
  name: string;
  sprites: PokemonSprites;
}
interface InterfaceData {
  count: number;
  next: string;
  previous: string | null;
  results: { name: string; url: string }[];
}
interface MyState {
  SearchWord: string;
  DataFetched: InterfaceData[] | null;
  DidEverythingLoaded: boolean;
}

class App extends React.Component<object, MyState> {
  state: MyState = {
    SearchWord: '',
    DataFetched: null,
    DidEverythingLoaded: false,
  };

  componentDidMount() {
    this.FindSearchWord();
  }

  InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => {
      const newValue = e.target.value;
      if (prevState.SearchWord !== newValue) {
        console.log('Previous State: ', prevState.SearchWord);
        console.log('New Value: ', newValue);
      }
      return { SearchWord: newValue };
    });
  };

  FindSearchWord = () => {
    const BaseUrl = 'https://pokeapi.co/api/v2/pokemon';
    const SearchWordExist = this.state.SearchWord ? `/${this.state.SearchWord}` : '';
    const url = `${BaseUrl}${SearchWordExist}?offset=0&limit=20`;

    fetch(url)
      .then((response) => response.json())
      .then((pokemonList: InterfaceData) => {
        const detailedDataPromises = pokemonList.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()));
        Promise.all(detailedDataPromises).then((details) => {
          this.setState({ DataFetched: details, DidEverythingLoaded: true });
        });
        console.log(url);
        console.log(this.state.DataFetched);
      });
  };

  render() {
    return (
      <div className="Container">
        <div className="Container__search-container">
          <input
            type="text"
            value={this.state.SearchWord}
            onChange={this.InputChange}
            placeholder="Type your search word"
            className="Container__search-container__input"
          />
          <button onClick={this.FindSearchWord} className="Container__search-container__button">
            Search
          </button>
        </div>

        {this.state.DataFetched && this.state.DataFetched.results
          ? this.state.DataFetched.results.map((pokemon: Pokemon) => {
              console.log(pokemon); // Log the entire pokemon object to inspect its structure
              return (
                <div key={pokemon.order}>
                  {pokemon.order ? `"${pokemon.order}"` : 'Order not available'}
                  {pokemon.height ? `"${pokemon.height}"` : 'Height not available'}
                  {pokemon.name ? `"${pokemon.name}"` : 'Name not available'}
                  {pokemon.sprites && pokemon.sprites.front_default ? (
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  ) : (
                    'No Image Available'
                  )}
                </div>
              );
            })
          : 'Loading or No Data Available'}
      </div>
    );
  }
}

export default App;
