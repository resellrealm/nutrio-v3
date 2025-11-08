import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/icon.png';
import './Layout.css';

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.user);
  const achievements = useSelector(state => state.achievements);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/analyze', label: 'Analyze Meal', icon: '🔍' },
    { path: '/history', label: 'History', icon: '📜' },
    { path: '/favourites', label: 'Favourites', icon: '❤️' },
    { path: '/achievements', label: 'Achievements', icon: '🏆' },
    { path: '/account', label: 'Account', icon: '👤' }
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="layout">
      {/* Header with safe-area padding */}
      <header className="header safe-top">
        <button 
          className="hamburger-btn glass"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`hamburger-icon ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <div className="header-logo">
          <img src={logo} alt="Nutrio" className="logo-img" />
          <h1 className="logo-text">Nutrio</h1>
        </div>
        
        <div className="header-level">
          <span className="level-badge">Lv {achievements.level}</span>
        </div>
      </header>

      {/* Side Menu */}
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
        <nav className="menu-content safe-top">
          <div className="menu-header">
            <img src={logo} alt="Nutrio" className="menu-logo" />
            <h2>{user.name}</h2>
            <p className="menu-subtitle">Level {achievements.level} • {user.plan === 'premium' ? '⭐ Premium' : 'Basic'}</p>
          </div>
          
          <div className="menu-items">
            {navItems.map(item => (
              <button
                key={item.path}
                className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => handleNavigate(item.path)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="menu-footer">
            <p className="menu-version">Nutrio v3.0</p>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        {navItems.slice(0, 5).map(item => (
          <button
            key={item.path}
            className={`nav-btn ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
