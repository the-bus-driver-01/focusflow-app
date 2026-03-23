import React from 'react';
import { LoadingProps } from '@/types';
import './Loading.css';

const Loading: React.FC<LoadingProps> = ({
  fullscreen = false,
  message = 'Loading...',
  size = 'md',
}) => {
  const loaderClasses = `loader loader--${size}`;

  if (fullscreen) {
    return (
      <div className="loading-fullscreen">
        <div className={loaderClasses}></div>
        <p className="loading-message">{message}</p>
      </div>
    );
  }

  return (
    <div className="loading">
      <div className={loaderClasses}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default Loading;
