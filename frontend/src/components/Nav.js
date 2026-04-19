// src/components/Nav.js
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Nav() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.remove('dark-mode');
    setIsDarkMode(false);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleLogout = () => {
    logout();
  };

  const publicLinks = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register' },
  ];

  const memberLinks = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/write-post', label: 'Write Post' },
    { path: '/profile', label: 'Profile' },
  ];

  const adminLinks = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/write-post', label: 'Write Post' },
    { path: '/profile', label: 'Profile' },
    { path: '/admin', label: 'Admin' },
  ];

  const links = user ? (user.role === 'admin' ? adminLinks : memberLinks) : publicLinks;

  return (
    <header className='site-header'>
      <button id="modeToggle" className="mode-btn" onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h1 className='logo'>BTS: The Music That Shaped My Journey</h1>
      <nav>
        <ul className='nav-links'>
          {links.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}>
                {link.label}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '0' }}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Nav;