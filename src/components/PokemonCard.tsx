import { Component } from 'react'
import { DetailedPokemon } from '../interfaces'
export default class PokemonCard extends Component <{pokemon: DetailedPokemon}> {
  render() {
    const { pokemon } = this.props;
    return (
      <div className='Card'>
        <div className="Card__title">
          <span>  {pokemon.name} <span> And </span> {pokemon.id} </span> 
        </div>
        <div className="Card__container">
        <div className="Card__container__types">
            {pokemon.type.map((type)=>(
                <span key={type.name}>{type.name}</span>
            ))}
        </div>
        <div className="Card__container__img">{pokemon.sprites.front_default}</div>
        </div>
        <div className="Card__Info">
        <span> Height: {pokemon.height} </span>  
        <span> Weight: {pokemon.weight} </span>  
        </div>
      </div>
    )
  }
}
