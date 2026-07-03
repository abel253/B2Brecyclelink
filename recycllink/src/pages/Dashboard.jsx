import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
// ምስሉን ከassets ፎልደርህ ላይ እናስገባለን
import profileImg from '../assets/buyer/buyers2.jpg'; 

import {
  LayoutDashboard, Package, ShoppingBag, TrendingUp, DollarSign,
  Clock, CheckCircle, Plus, Settings, Star, Truck, BarChart3, X, Upload
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userRole, setUserRole] = useState('seller'); 
  const [showPostForm, setShowPostForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // ዳታው ሳይቀየር ምስሉን ብቻ እዚህ ጋር ጨምሬያለሁ
  const user = {
    name: 'Abebe Kebede',
    role: userRole,
    avatar: profileImg, // እዚህ ጋር ምስሉ ገብቷል
    verified: true,
    rating: 4.8,
    location: 'Addis Ababa, Ethiopia',
  };

  const sellerData = {
    totalEarnings: 285000,
    listings: [
      { id: 1, title: 'Clean PET Plastic Bottles', weight: 450, price: 2500, status: 'active', image: profileImg }, // ለምሳሌ ያህል ምስሉን እዚህም ተጠቅሜዋለሁ
      { id: 2, title: 'Mixed Cardboard & Paper', weight: 1200, price: 3200, status: 'active', image: profileImg },
    ]
  };

  const formatCurrency = (amount) => `ETB ${amount.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Attractive Hero Header (ልክ እንደ Landing Page) */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 pb-24 pt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6 text-white">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-28 h-28 rounded-3xl object-cover border-4 border-white/30 shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-lg shadow-lg">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h2 className="text-3xl font-bold">{user.name}</h2>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
                  {userRole}
                </span>
              </div>
              <p className="text-emerald-100 mt-2 flex items-center justify-center md:justify-start gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 border-none" />
                {user.rating} (156 Reviews) • {user.location}
              </p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setUserRole(userRole === 'seller' ? 'buyer' : 'seller')}
                className="px-5 py-2.5 bg-white text-emerald-700 rounded-xl font-bold shadow-lg hover:bg-emerald-50 transition-all"
              >
                Switch to {userRole === 'seller' ? 'Buyer' : 'Seller'}
              </button>
              <button className="p-2.5 bg-white/10 backdrop-blur-md text-white rounded-xl hover:bg-white/20 transition-all">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12">
        {/* 2. Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Earnings', value: formatCurrency(285000), icon: DollarSign, color: 'text-emerald-600' },
            { label: 'Active Listings', value: '12', icon: Package, color: 'text-blue-600' },
            { label: 'Pending', value: '3', icon: Clock, color: 'text-amber-600' },
            { label: 'Sales', value: '47', icon: ShoppingBag, color: 'text-purple-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-2">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-emerald-500 text-xs font-bold">+12%</span>
              </div>
              <div className="text-2xl font-black text-slate-800">{stat.value}</div>
              <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 3. Navigation & Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-100 p-2 gap-2 bg-slate-50/50">
            {['overview', 'listings', 'transactions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all capitalize ${
                  activeTab === tab ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white'
                }`}
              >
                {tab}
              </button>
            ))}
            <button 
              onClick={() => setShowPostForm(true)}
              className="ml-auto px-6 py-2.5 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-bold hover:bg-emerald-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Post New
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {sellerData.listings.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all group">
                  {/* አይኮን በምስል ተተክቷል */}
                  <img src={item.image} className="w-16 h-16 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform" alt="item" />
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.weight} kg • <span className="text-emerald-600 font-bold">{formatCurrency(item.price)}</span></p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase">{item.status}</span>
                    <button className="text-slate-400 hover:text-emerald-600 transition-colors"><BarChart3 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Simple Modal for Posting */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-slate-800">Post New Material</h3>
              <button onClick={() => setShowPostForm(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all"><X /></button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowPostForm(false); alert('Success!'); }}>
               <input type="text" placeholder="Material Name" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium" />
               <div className="grid grid-cols-2 gap-4">
                 <input type="number" placeholder="Weight (kg)" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none" />
                 <input type="number" placeholder="Price (ETB)" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none" />
               </div>
               <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:bg-emerald-50 hover:border-emerald-300 transition-all cursor-pointer">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-500 font-bold">Upload Material Image</p>
               </div>
               <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all">POST NOW</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;