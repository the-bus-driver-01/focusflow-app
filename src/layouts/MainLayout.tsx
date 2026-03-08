import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <div className="main-layout__header-content">
          <h1 className="main-layout__logo">App</h1>
          <nav className="main-layout__nav">
            <a href="/dashboard" className="main-layout__nav-link">
              Dashboard
            </a>
            <a href="/tasks" className="main-layout__nav-link">
              Tasks
            </a>
            <a href="/settings" className="main-layout__nav-link">
              Settings
            </a>
          </nav>
          <div className="main-layout__user">
            <span className="main-layout__user-name">{user?.name}</span>
            <button className="main-layout__logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="main-layout__content">
        <div className="main-layout__container">{children}</div>
      </main>

      <footer className="main-layout__footer">
        <p>&copy; 2024 App Architecture. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
