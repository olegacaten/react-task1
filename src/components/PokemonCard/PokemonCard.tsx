import { Component } from 'react'
import { PokemonClientSide } from '../../interfaces'
import { getTypeBadgeColor,capitalizeFirstLetter} from '../../utils/PokemonCard/PokemonCardUtils';
import pokemoncardstyle from './PokemonCard.module.scss'

export default class PokemonCard extends Component <{pokemon: PokemonClientSide}> {
  render() {
    const { pokemon } = this.props;
    return (
      <div className={pokemoncardstyle.Card}>
         <div className={pokemoncardstyle.Card__img}><img src={pokemon.sprite} alt="Pokemon Sprite" /></div>
        <div className={pokemoncardstyle.Card__container}>
        <div className={pokemoncardstyle.Card__container__title}>
          <span>  #{pokemon.id} </span> {capitalizeFirstLetter(pokemon.name)}  
        </div>
        <div className={pokemoncardstyle.Card__container__types}>
            {pokemon.types.map((typeGroup, index)=>{
              const {color, typeName} = getTypeBadgeColor(typeGroup.type.name);
              return(
                <div key={index} style={{backgroundColor: color, borderRadius: '4px', padding: '2px 4px', margin:'4px', color: 'white', fontSize:'12px', display: 'inline-block' }}>
                  {typeName}
                </div>
              );
            })}
        </div>
       
        </div>
      </div>
    )
  }
}
