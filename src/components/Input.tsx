import React, { useState } from 'react';
import { InputProps } from '@/types';
import './Input.css';

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputClasses = `
    input__field
    ${error ? 'input__field--error' : ''}
    ${isFocused ? 'input__field--focused' : ''}
    ${disabled ? 'input__field--disabled' : ''}
    ${className}
  `.trim();

  return (
    <div className="input">
      {label && <label className="input__label">{label}</label>}
      <input
        className={inputClasses}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
      />
      {error && <span className="input__error">{error}</span>}
    </div>
  );
};

export default Input;
