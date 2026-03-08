import React from 'react';
import './Error.css';

interface ErrorProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const Error: React.FC<ErrorProps> = ({ title = 'Error', message, onRetry }) => {
  return (
    <div className="error">
      <div className="error__icon">⚠️</div>
      <h3 className="error__title">{title}</h3>
      <p className="error__message">{message}</p>
      {onRetry && (
        <button className="error__retry" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;
