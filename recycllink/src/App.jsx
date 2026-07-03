import React from 'react';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      {/* Professional B2B Navbar */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">♻️</span>
            Recycle<span>Link</span>
          </div>
          <div className="nav-links">
            <a href="#" className="active">Dashboard</a>
            <a href="#">Marketplace</a>
            <a href="#">Impact Reports</a>
            <button className="nav-profile">Account</button>
          </div>
        </div>
      </nav>

      <main>
        <Dashboard />
      </main>
      
      <footer className="simple-footer">
        © 2024 RecycleLink B2B Circular Hub - Ethiopia
      </footer>
    </div>
  );
}

export default App;