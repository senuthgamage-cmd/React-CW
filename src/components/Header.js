import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo">
          <span className="logo-icon">🏠</span>
          <h1 className="logo-text">Westminster Estate Agents</h1>
        </div>
        
        {/* Navigation Menu */}
        <nav className="navbar">
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#search" className="nav-link active">
                <span className="nav-icon">🔍</span>
                Search Properties
              </a>
            </li>
            <li className="nav-item">
              <a href="#favourites" className="nav-link">
                <span className="nav-icon">❤️</span>
                Favourites
                <span className="favourite-count">0</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">
                <span className="nav-icon">ℹ️</span>
                About
              </a>
            </li>
          </ul>
        </nav>
        
        {/* User/Mobile Menu */}
        <div className="header-actions">
          <button className="mobile-menu-btn" aria-label="Open menu">
            
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;