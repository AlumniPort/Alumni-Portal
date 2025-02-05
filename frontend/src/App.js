import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Verification from './components/Verification';
import './App.css'; 

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1 className="header-title">Alumni Association Portal</h1>
          <nav>
            <ul className="nav-links">
              <li><Link to="/login" className="nav-button">Login</Link></li>
              <li><Link to="/signup" className="nav-button">Sign Up</Link></li>
              <li><Link to="/verification" className="nav-button">Verification</Link></li>
            </ul>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2025 Alumni Association. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
