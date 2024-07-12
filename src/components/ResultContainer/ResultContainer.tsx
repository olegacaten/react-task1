import { Component, ReactNode } from 'react'
import { DetailedPokemon } from '../../interfaces'
import PokemonCard from '../PokemonCard'

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
      <>{this.GetPokemons(this.props.results)}</>
    )
  }
}
