import React from 'react';
import { CardProps } from '@/types';
import './Card.css';

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className}`.trim()}>
      {title && <h2 className="card__title">{title}</h2>}
      <div className="card__content">{children}</div>
    </div>
  );
};

export default Card;
