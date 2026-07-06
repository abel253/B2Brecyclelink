import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Bell, UserCircle, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm border-b border-slate-100' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
             <Leaf size={22} fill="currentColor" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
            Recycle<span className="text-emerald-600">Link</span>
          </span>
        </Link>
        
        {/* Middle Navigation Links - Clean & Spaced */}
        <div className="hidden lg:flex items-center gap-10 text-[13px] font-bold uppercase tracking-widest text-slate-500">
          <Link to="/about" className="hover:text-emerald-600 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
          <Link to="/marketplace" className="hover:text-emerald-600 transition-colors">Marketplace</Link>
          <Link to="/how-it-works" className="hover:text-emerald-600 transition-colors">How it works</Link>
          <Link to="/impact" className="hover:text-emerald-600 transition-colors">Impact</Link>
          <Link to="/dashboard" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2.5 text-slate-400 hover:text-emerald-600 transition-all relative bg-slate-50 rounded-full border border-slate-100">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden md:block"></div>

          <Link to="/login" className="hidden md:block text-[13px] font-bold uppercase tracking-widest text-slate-900 hover:text-emerald-600 transition-all">
            Login
          </Link>

          <Link to="/register" className="bg-black text-white px-6 py-3 rounded-full text-[12px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-100 transition-all active:scale-95">
            Join Platform
          </Link>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-slate-900">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;