import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Bell, UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-100 px-8 py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
             <Leaf size={20} fill="currentColor" />
          </div>
          <span className="text-xl font-black text-slate-900">
            Recycle<span className="text-emerald-600">Link.</span>
          </span>
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
          <Link to="/dashboard" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
          <Link to="/marketplace" className="hover:text-emerald-600 transition-colors">Marketplace</Link>
          <a href="#" className="hover:text-emerald-600 transition-colors">Impact Reports</a>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-emerald-600 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>
          <button className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 hover:border-emerald-600 transition-all">
            <UserCircle size={20} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-900">Account</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;