// src/App.js
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
// eslint-disable-next-line no-unused-vars
import ProtectedRoute from './components/ProtectedRoute';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import PostPage from './pages/PostPage';
import WritePostPage from './pages/WritePostPage';
import EditPostPage from './pages/EditPostPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 900);
    const dotsInterval = window.setInterval(() => {
      setDots((prev) => (prev.length === 3 ? '' : `${prev}.`));
    }, 300);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(dotsInterval);
    };
  }, []);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        textAlign: 'center',
        padding: '2rem',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'float 2s ease-in-out infinite, glow 2s ease-in-out infinite alternate' }}>💜</div>
        <div style={{ marginTop: '0.5rem', fontSize: '1.3rem', fontWeight: 600, animation: 'fadeIn 1s ease-in' }}>
          looding{dots}
        </div>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes glow {
            from { filter: drop-shadow(0 0 5px rgba(255, 0, 255, 0.5)); }
            to { filter: drop-shadow(0 0 20px rgba(255, 0, 255, 0.8)); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <Routes>
        {/* Public routes — anyone can visit */}
        <Route path='/' element={<SplashPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/admin' element={<ProtectedRoute role='admin'><AdminPage /></ProtectedRoute>} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='/post/:id/edit' element={<ProtectedRoute><EditPostPage /></ProtectedRoute>} />
        <Route path='/write-post' element={<ProtectedRoute><WritePostPage /></ProtectedRoute>} />
        {/* Add more routes here as you create the pages */}
      </Routes>
    </>
  );
}

export default App;
