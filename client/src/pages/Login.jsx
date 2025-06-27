import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// import { FiMail, FiLock } from 'react-icons/fi';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.user);
      setUserName(res.data.user.username);
      setLoggedIn(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-bg">
      <Link to="/" className="login-home-btn" title="Home">🏠</Link>
      <video
        className="login-bg-video"
        src="/sri-lanka-nature.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="login-glass">
        <img src="/logo.webp" alt="Sri Lanka Logo" className="login-logo" />
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-sub">Sign in to explore Sri Lanka's beauty</p>
        {!loggedIn ? (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </div>
            <div className="login-field">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
            {error && <p className="login-error">{error}</p>}
            <p className="login-link">
              New here?{' '}
              <Link to="/register">Create an account</Link>
            </p>
          </form>
        ) : (
          <div className="login-success">
            <p>🎉 Welcome, {userName}!<br />You are now logged in. Start sharing your favorite places in Sri Lanka!</p>
            <button onClick={() => navigate('/create')} className="login-btn">Go to Create Post</button>
          </div>
        )}
      </div>
      <style>{`
        body {
          overflow-x: hidden;
        }
        .login-bg {
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        .login-bg-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .login-glass {
          background: rgba(255,255,255,0.18);
          box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          max-width: 420px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .login-logo {
          width: 80px;
          height: 80px;
          margin-bottom: 16px;
          filter: drop-shadow(0 4px 16px #0006);
        }
        .login-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 8px;
          text-shadow: 0 2px 8px #0008;
          letter-spacing: 1px;
          text-align: center;
        }
        .login-sub {
          color: #fff;
          font-size: 1.1rem;
          margin-bottom: 24px;
          text-align: center;
          text-shadow: 0 1px 4px #0008;
        }
        .login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 18px;
          align-items: center;
        }
        .login-field {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .login-input {
          width: 100%;
          max-width: 280px;
          padding: 14px;
          border-radius: 12px;
          border: none;
          font-size: 1rem;
          background: rgba(255,255,255,0.85);
          color: #222;
          box-shadow: 0 2px 8px #0001;
          outline: none;
          margin-bottom: 2px;
          font-weight: 500;
          letter-spacing: 0.5px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .login-btn {
          width: 100%;
          max-width: 280px;
          padding: 14px;
          border-radius: 12px;
          border: none;
          font-weight: 800;
          font-size: 1.1rem;
          background: linear-gradient(90deg, #2196f3 0%, #4caf50 100%);
          color: #fff;
          box-shadow: 0 4px 16px #0003;
          cursor: pointer;
          margin-top: 8px;
          letter-spacing: 1px;
          transition: background 0.2s;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .login-btn:hover {
          background: linear-gradient(90deg, #4caf50 0%, #2196f3 100%);
        }
        .login-error {
          color: #ffbaba;
          text-align: center;
          font-weight: 600;
          text-shadow: 0 1px 4px #0008;
          font-size: 1rem;
        }
        .login-link {
          color: #fff;
          text-align: center;
          margin-top: 8px;
          text-shadow: 0 1px 4px #0008;
          font-size: 1rem;
        }
        .login-link a {
          color: #ffe082;
          font-weight: 700;
          text-decoration: underline;
        }
        .login-success {
          text-align: center;
          color: #fff;
          font-size: 1.1rem;
          margin: 24px 0;
          text-shadow: 0 2px 8px #0008;
          font-weight: 700;
        }
        .login-home-btn {
          position: absolute;
          top: 32px;
          right: 40px;
          z-index: 2;
          background: rgba(255,255,255,0.25);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.7rem;
          color: #2196f3;
          box-shadow: 0 2px 8px #0002;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .login-home-btn:hover {
          background: rgba(33,150,243,0.18);
          color: #1769aa;
          transform: scale(1.12);
        }
        @media (max-width: 700px) {
          .login-glass {
            padding: 1.2rem 0.5rem;
            max-width: 98vw;
          }
          .login-title {
            font-size: 1.3rem;
          }
          .login-btn {
            font-size: 1rem;
            padding: 10px;
          }
        }
        @media (max-width: 480px) {
          .login-glass {
            padding: 0.7rem 0.1rem;
          }
          .login-title {
            font-size: 1.1rem;
          }
          .login-btn {
            font-size: 0.9rem;
            padding: 8px;
          }
        }
        html, body, #root {
          max-width: 100vw;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default Login; 