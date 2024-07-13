import { Component, ReactNode } from 'react'
import { DetailedPokemon } from '../../interfaces'
import PokemonCard from '../PokemonCard/PokemonCard'
import CardsStyle from './ResultContainer.module.scss'
export default class ResultContainer extends Component<{ results: DetailedPokemon[] | undefined }, {
  currentPage: number;
  pokemonsPerPage: number;
}> {
  constructor(props: { results: DetailedPokemon[] | undefined }) {
    super(props);
    this.state = {
      currentPage: 1,
      pokemonsPerPage: 20,
    };
  }

  paginate = (PageNumber: number) => {
    this.setState({ currentPage: PageNumber })
  };


  render(): ReactNode {


    const IndexOfLastPokemon = this.state.currentPage * this.state.pokemonsPerPage;
    const IndexOfFirstPokemon = IndexOfLastPokemon - this.state.pokemonsPerPage;

    const currentPagePokemons = this.props.results && this.props.results.slice(IndexOfFirstPokemon, IndexOfLastPokemon);

    const PageNumbers: number[] = [];
    for (let i = 1; i <= ((this.props.results?.length || 0) / this.state.pokemonsPerPage); i++) {
      PageNumbers.push(i);
    }


    return (
      <div className={CardsStyle.CardsContainer}>

        {currentPagePokemons && this.props.results && this.props.results.length > 0 ? (
            <div>
          <div className={CardsStyle.cards}>

            {currentPagePokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
            </div>
            <nav>
              {PageNumbers.map((number) => (
                <button key={number} onClick={() => this.paginate(number)}> {number}</button>

              ))} 
              </nav>
          </div>
        ) : (
          <div className={CardsStyle.nothingFound}>Nothing found</div>

        )}
      </div>
    );
  }
}
