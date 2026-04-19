// frontend/src/pages/RegisterPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import btsHero from '../assets/bts-hero.jpg';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    birth: '',
    password: '',
    confirmPassword: '',
    gender: '',
    accountType: '',
    agree: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
      isValid = false;
    }

    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (formData.birth === '') {
      newErrors.birth = 'Birth date is required';
      isValid = false;
    } else {
      const birthDate = new Date(formData.birth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        newErrors.birth = 'You must be at least 18 years old';
        isValid = false;
      }
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
      isValid = false;
    }

    if (formData.accountType === '') {
      newErrors.accountType = 'Select an account type';
      isValid = false;
    }

    if (!formData.agree) {
      newErrors.agree = 'You must agree to the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Only send the fields the backend accepts
      await API.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Navigate to login page after successful registration
      navigate('/login');
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h2>Join the BTS Community</h2>
          <p>Create your account to become part of our amazing BTS fan community. Share your passion for BTS music and connect with fellow ARMY members.</p>
        </div>
        <img src={btsHero} alt="BTS performing on stage during a concert" />
      </section>

      <section className="promo-section">
        <div className="promo-copy">
          <p className="eyebrow">Join ARMY Today</p>
          <h3>Welcome to the BTS Community</h3>
          <p>Connect with fellow ARMY members, share your BTS passion, and access exclusive content from K-pop's most influential group.</p>
          <ul className="promo-list">
            <li>Exclusive BTS content and discussions</li>
            <li>Global ARMY community connections</li>
            <li>Share your BTS journey and experiences</li>
          </ul>

          <div className="register-form-container">
            {errors.submit && <p className="error-msg">{errors.submit}</p>}

            <form id="registerForm" className="register-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="username">Preferred Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && <span className="error">{errors.username}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="birth">Date of Birth:</label>
                  <input
                    type="date"
                    id="birth"
                    name="birth"
                    value={formData.birth}
                    onChange={handleChange}
                  />
                  {errors.birth && <span className="error">{errors.birth}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="radio-group">
                  <label>Gender:</label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  /> Male
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  /> Female
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === 'other'}
                    onChange={handleChange}
                  /> Other
                  {errors.gender && <span className="error">{errors.gender}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="accountType">Account Type:</label>
                  <select
                    id="accountType"
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                  </select>
                  {errors.accountType && <span className="error">{errors.accountType}</span>}
                </div>
              </div>

              <label className="terms-label">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  required
                /> I agree to the terms and conditions
              </label>
              {errors.agree && <span className="error">{errors.agree}</span>}

              <button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <p className="login-link">
              Already have an account? Please use the backend login portal.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .error {
          color: red;
          font-size: 0.9em;
          display: block;
          margin-top: 0.25rem;
        }
        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          min-height: 60vh;
        }
        .hero-text {
          flex: 1;
          max-width: 50%;
        }
        .hero-text h2 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: bold;
        }
        .hero-text p {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 0;
        }
        .hero img {
          max-width: 40%;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .promo-section {
          padding: 4rem 2rem;
          background: #f8f9fa;
        }
        .promo-copy {
          max-width: 1200px;
          margin: 0 auto;
        }
        .eyebrow {
          color: #6c757d;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .promo-copy h3 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #333;
          font-weight: bold;
        }
        .promo-copy > p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #666;
          margin-bottom: 2rem;
          text-align: center;
        }
        .promo-list {
          list-style: none;
          padding: 0;
          margin-bottom: 2rem;
          text-align: center;
        }
        .promo-list li {
          padding: 0.5rem 0;
          color: #555;
        }
        .promo-list li:before {
          content: "✓";
          color: #28a745;
          font-weight: bold;
          margin-right: 0.5rem;
        }
        .register-form-container {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          margin-top: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 500px;
        }
        .register-form {
          margin-top: 2rem;
        }
        .form-row {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
        }
        .form-group {
          flex: 1;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e9ecef;
          border-radius: 5px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #667eea;
        }
        .radio-group {
          flex: 1;
        }
        .radio-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }
        .radio-group input {
          margin-right: 0.5rem;
        }
        .terms-label {
          display: block;
          margin: 1.5rem 0;
          font-weight: 500;
          cursor: pointer;
        }
        .terms-label input {
          margin-right: 0.5rem;
        }
        .register-form button {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .register-form button:hover {
          transform: translateY(-2px);
        }
        .register-form button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }
        .login-link {
          text-align: center;
          margin-top: 1.5rem;
          color: #666;
        }
        .login-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }
        .login-link a:hover {
          text-decoration: underline;
        }
        .error-msg {
          color: red;
          text-align: center;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            text-align: center;
            padding: 2rem 1rem;
          }
          .hero-text {
            max-width: 100%;
            margin-bottom: 2rem;
          }
          .hero-text h2 {
            font-size: 2rem;
          }
          .hero img {
            max-width: 80%;
          }
          .form-row {
            flex-direction: column;
            gap: 1rem;
          }
          .promo-copy h3 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default RegisterPage;