import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import axios from 'axios';
import profileImg from '../assets/image3.jpg'; 
import { logout } from '../utils/auth'; 

import {
  Package, Wallet, BarChart3, X, Plus, 
  Settings, Bell, MapPin, Building2, 
  ShieldCheck, LogOut, LayoutDashboard, Clock, CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // ዳታዎችን ከ localStorage እዚህ እናወጣለን
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const fullName = localStorage.getItem('fullName');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthorized(true);
      fetchMyListings();
    }
  }, [token, navigate]);

  const fetchMyListings = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://127.0.0.1:5000/api/listings/user/${userId}`); 
      setMyListings(res.data);
    } catch (err) {
      console.error("Error fetching my listings", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) return null; // ፍቃድ ከሌለው ምንም እንዳያሳይ

  return (
    <div className="w-full min-h-screen bg-[#fcfcfc] text-[#1e293b] font-sans flex flex-col">
      <nav className="w-full bg-white border-b border-slate-100 py-5 px-[5vw] flex justify-between items-center sticky top-0 z-[100] backdrop-blur-md bg-white/80">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-lg"><Package size={24} /></div>
          <span className="text-2xl font-black tracking-tighter uppercase text-slate-900">Recycle<span className="text-emerald-600">Link</span></span>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          <Link to="/marketplace" className="hover:text-emerald-600 transition-colors">Marketplace</Link>
          <Link to="/" className="hover:text-emerald-600 transition-colors">How it works</Link>
          <Link to="/impact" className="hover:text-emerald-600 transition-colors">Impact</Link>
          <span className="text-emerald-600 border-b-2 border-emerald-600 pb-1">Dashboard</span>
        </div>
        <div className="flex items-center gap-5">
           <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
             <img src={user.avatar} className="w-8 h-8 rounded-xl object-cover" alt="User" />
             <span className="text-xs font-black uppercase tracking-widest">{user.name.split(' ')[0]}</span>
           </div>
        </div>
      </nav>

      <main className="w-full flex-1 px-[5vw] py-12">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <img src={profileImg} className="w-24 h-24 rounded-full object-cover border-4 border-emerald-600 shadow-lg" alt="User Profile" />
          <div>
            <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              HELLO, <span className="text-emerald-600 underline decoration-8 underline-offset-[10px]">{user.name.split(' ')[0]}</span>.
            </motion.h1>
            <p className="text-slate-400 text-lg font-medium italic mt-4">Manage your sustainable business and track listings.</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white border p-4 rounded-3xl flex items-center gap-4 shadow-sm">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600"><BarChart3 size={20}/></div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase">My Impact</p><p className="font-bold">{user.impact}</p></div>
             </div>
             <div className="bg-white border p-4 rounded-3xl flex items-center gap-4 shadow-sm">
                <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600"><Wallet size={20}/></div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase">Wallet</p><p className="font-bold">{formatCurrency(user.balance)}</p></div>
             </div>
          </div>
          </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[50px] p-10 border border-slate-100 shadow-sm min-h-[600px]">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black uppercase tracking-tighter">My Active Listings</h2>
                <div className="px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black">{myListings.length} TOTAL POSTS</div>
              </div>
              {loading ? (
                <div className="flex justify-center items-center h-64 text-slate-300 font-bold uppercase tracking-widest text-[10px]">Loading your data...</div>
              ) : myListings.length > 0 ? (
                <div className="space-y-4">
                  {myListings.map((list) => (
                    <div key={list.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[30px] border border-slate-100 group hover:border-emerald-500 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-50">📦</div>
                        <div>
                           <h4 className="font-bold text-slate-800 text-lg">{list.title}</h4>
                           <div className="flex gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                              <span>{list.category}</span> • <span>{list.location}</span> • <span className="text-emerald-600 font-black">Active</span>
                           </div>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-xl font-black text-slate-900">{formatCurrency(list.price)}</p>
                         <p className="text-[10px] font-medium text-slate-400 italic">Posted {new Date(list.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-20 opacity-30">
                  <Package size={100} className="mb-6 text-slate-300" />
                  <h3 className="text-2xl font-black uppercase tracking-tighter">No listings found</h3>
                  <p className="text-slate-500 font-medium">Start by posting your first recyclable material.</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <div className="bg-slate-900 rounded-[50px] p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[300px]">
                <div className="relative z-10">
                   <h3 className="text-3xl font-black tracking-tight leading-none mb-6">Want to sell or buy more?</h3>
                   <p className="text-slate-400 text-sm leading-relaxed mb-10">Post your materials to the marketplace or upgrade your business tools.</p>
                </div>
                <Link to="/dashboardpost" className="group flex items-center gap-4 bg-emerald-600 text-white px-10 py-5 rounded-[25px] font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all shadow-2xl shadow-emerald-500/20 active:scale-95">
                  <div className="bg-white/20 p-2 rounded-xl group-hover:rotate-90 transition-transform"><Plus size={20} /></div> New Material Post
                </Link>
             </div>
             <div className="bg-white rounded-[50px] p-10 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black uppercase tracking-widest mb-8 text-slate-400">System Actions</h3>
                <div className="space-y-4">
                   <button className="w-full py-5 bg-slate-50 text-slate-900 rounded-[25px] font-black text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all flex items-center justify-center gap-3"><Settings size={18} /> Manage Profile</button>
                   <button onClick={logout} className="w-full py-5 text-red-500 bg-red-50 rounded-[25px] font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3"><LogOut size={18} /> Exit Dashboard</button>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;