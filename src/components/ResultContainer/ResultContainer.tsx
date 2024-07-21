// src/components/ResultContainer/ResultContainer.tsx
import React, { useState } from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import CardsStyle from './ResultContainer.module.scss';
import { PokemonClientSide } from '../../interfaces';
import Pagination from './Pagination/Pagination'; 

interface ResultContainerProps {
  pokemon: PokemonClientSide[] | undefined;
}

const ResultContainer: React.FC<ResultContainerProps> = ({ pokemon }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pokemonsPerPage = 20;

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPagePokemons = pokemon?.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const totalPages = Math.ceil((pokemon?.length || 0) / pokemonsPerPage);

  return (
    <div className={CardsStyle.CardsContainer}>
      {currentPagePokemons && currentPagePokemons.length > 0 ? (
        <div>
          <div className={CardsStyle.cards}>
            {currentPagePokemons.map((item) => (
              <PokemonCard key={item.id} pokemon={item} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <div className={CardsStyle.nothingFound}>Nothing found</div>
      )}
    </div>
  );
};

export default ResultContainer;
