import { Component, ReactNode } from 'react'
import { DetailedPokemon } from '../../interfaces'
import PokemonCard from '../PokemonCard/PokemonCard'
import CardsStyle from './ResultContainer.module.scss'
export default class ResultContainer extends Component<{results:DetailedPokemon[] | undefined} > {

    GetPokemons(res: DetailedPokemon[] | undefined):ReactNode {
        if(!res) {
            return null;
        }
        else if(res.length === 0){return <div className='nothing--found'>Nothing found</div>}
        else return res.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ));
    
    }

  render():ReactNode {
    return (
      <div className={CardsStyle.CardsContainer}>{this.GetPokemons(this.props.results)}</div>
    )
  }
}
