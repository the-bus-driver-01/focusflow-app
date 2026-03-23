import React from 'react';
import './AuthLayout.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__container">
        <div className="auth-layout__card">
          {title && <h1 className="auth-layout__title">{title}</h1>}
          <div className="auth-layout__content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
