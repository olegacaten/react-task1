import React from 'react';
import LoadingStyle from './Loading.module.scss';

// Define the interface for props
interface ILoading {
  isLoaded: boolean;
}


const Loading: React.FC<ILoading> = ({ isLoaded }) => {
  const isLoading = isLoaded;

  return (
    <div className={isLoading ? LoadingStyle.active : ''}>
      <div className={LoadingStyle.spinner}></div>
    </div>
  );
};

export default Loading;
