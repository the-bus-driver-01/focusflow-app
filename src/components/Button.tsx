import React from 'react';
import { ButtonProps } from '@/types';
import './Button.css';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const baseClasses = `button button--${variant} button--${size}`;
    const finalClasses = `${baseClasses} ${className}`.trim();

    return (
      <button
        ref={ref}
        className={finalClasses}
        disabled={disabled || loading}
        {...rest}
      >
        {loading ? (
          <>
            <span className="button__spinner"></span>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
