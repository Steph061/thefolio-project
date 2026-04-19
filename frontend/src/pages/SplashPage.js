// frontend/src/pages/SplashPage.js
import { useNavigate } from 'react-router-dom';

function SplashPage() {
  const navigate = useNavigate();

  return (
    <div className="splash-container">
      <div className="splash-content">
        <h1>Welcome to</h1>
        <h1>BTS Fan Page</h1>
        <p>Discover the world of BTS through music, stories, and the ARMY community.</p>
        <div className="splash-actions">
          <button className="btn btn-primary" onClick={() => navigate('/home')}>Explore Home</button>
          <button className="btn btn-secondary" onClick={() => navigate('/register')}>Join ARMY</button>
        </div>
      </div>
      <style>{`
        .splash-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
        }

        .splash-content {
          max-width: 680px;
          width: 100%;
        }

        .splash-content h1 {
          font-size: clamp(3rem, 5vw, 4.5rem);
          margin-bottom: 1rem;
        }

        .splash-content p {
          font-size: 1.15rem;
          line-height: 1.8;
          margin-bottom: 2rem;
          color: rgba(255,255,255,0.92);
        }

        .splash-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .btn {
          min-width: 170px;
          padding: 1rem 1.75rem;
          border-radius: 999px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          opacity: 0.95;
        }

        .btn-primary {
          background-color: #ffffff;
          color: #5a2fa1;
        }

        .btn-secondary {
          background-color: rgba(255,255,255,0.15);
          color: white;
          border: 1px solid rgba(255,255,255,0.4);
        }

        @media (max-width: 640px) {
          .splash-content h1 {
            font-size: 2.4rem;
          }
          .splash-actions {
            flex-direction: column;
          }
          .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default SplashPage;
