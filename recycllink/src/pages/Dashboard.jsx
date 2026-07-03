import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Leaf, Package, BarChart3, ArrowUpRight, Globe } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend API ዳታ ለመሳብ
    axios.get('http://localhost:5000/api/dashboard-data')
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Connecting to RecycleLink Network...</div>;

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dash-header">
        <div>
          <h1>{stats?.user?.company_name || 'Enterprise Dashboard'}</h1>
          <p>B2B Circular Economy Monitor</p>
        </div>
        <div className="eco-badge">
          <Leaf size={18} />
          <span>Eco-Score: {stats?.user?.eco_points || 0}</span>
        </div>
      </header>

      {/* KPI Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon impact"><BarChart3 /></div>
          <h3>Total Impact</h3>
          <p className="stat-value">{stats?.user?.eco_points || 0} pts</p>
          <span className="stat-label">+12% from last month</span>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon supply"><Package /></div>
          <h3>Active Listings</h3>
          <p className="stat-value">{stats?.listings?.length || 0}</p>
          <span className="stat-label">Verified Materials</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon globe"><Globe /></div>
          <h3>CO2 Offset</h3>
          <p className="stat-value">{(stats?.user?.eco_points * 0.4).toFixed(1)} Tons</p>
          <span className="stat-label">Environmental Value</span>
        </div>
      </div>

      {/* Marketplace Listings Section */}
      <h2 className="section-title">Available Materials for Sourcing</h2>
      <div className="listings-grid">
        {stats?.listings?.map((item) => (
          <div key={item.id} className="listing-card">
            <div className="listing-info">
              <h4>{item.material_type}</h4>
              <p>{item.weight_kg} KG available</p>
              <div className="price-tag">{item.price_etb} ETB</div>
            </div>
            <button className="action-btn">
              Bid Now <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;