import React from 'react';
import loadingGif from '../assets/loading-arrow.gif';

export const Loading = () => {
  return (
    <div className='loading'>
      <img src={loadingGif} alt='loading-gif' />
    </div>
  );
};
