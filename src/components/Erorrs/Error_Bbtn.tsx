import React, { useState } from 'react';

// Utility function to clear local storage
const clearLocalStorage = () => {
  localStorage.removeItem('pokemonsClientSide');
  localStorage.removeItem('SearchWord');
};

const Error_Bbtn: React.FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  const CreateError = () => {
    clearLocalStorage(); 
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Error for you');
  }

  return (
    <div>
      <button onClick={() => CreateError()}>Err</button>
    </div>
  );
};

export default Error_Bbtn;
