// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import MaterialDetail from "./pages/MaterialDetail";
import AdminPanel from "./pages/AdminPanel"; 
import Navbar from "./components/Navbar";
import Register from './Register'; 
import Login from './Login'; 
import About from './components/About';
import Contact from './components/Contact';
import DashboardPost from "./pages/DashboardPost";

// ProtectedRoute ኮምፖነንት - ከ App ውጭ መሆን አለበት
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard ጥበቃ የሚደረግለት እዚህ ነው */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/dashboardpost" 
            element={
              <ProtectedRoute>
                <DashboardPost />
              </ProtectedRoute>
            } 
          />

          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<MaterialDetail />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;