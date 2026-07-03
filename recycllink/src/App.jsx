// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import MaterialDetail from "./pages/MaterialDetail";
import AdminPanel from "./pages/AdminPanel"; // Add this import
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<MaterialDetail />} />
          <Route path="/admin" element={<AdminPanel />} /> {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;