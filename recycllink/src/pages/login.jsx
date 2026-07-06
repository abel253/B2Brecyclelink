import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage({ type: 'error', text: 'Please fill in all fields!' });
      return;
    }
    if (!validateEmail(formData.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/users/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.status === 200) {
        setMessage({ type: 'success', text: 'Login Successful! Redirecting...' });
        
        // ከBackend የሚመጣውን ዳታ መቀበል
        const { token, role, fullName, userId } = response.data;
        
        // በDashboard ውስጥ ከሚፈለጉት ስሞች ጋር አመሳስሎ ማስቀመጥ
        localStorage.setItem('token', token);       
        localStorage.setItem('fullName', fullName); 
        localStorage.setItem('userId', userId);     
        localStorage.setItem('userRole', role);

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        const msg = error.response.status === 404 ? 'Email not registered!' : 
                    error.response.status === 401 ? 'Incorrect Password!' : 'Login failed.';
        setMessage({ type: 'error', text: msg });
      } else {
        setMessage({ type: 'error', text: 'Server is offline!' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-md w-full bg-white p-8 border border-slate-200 rounded-3xl shadow-2xl">
        <div className="mb-10 text-center">
           <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Login</h2>
           <p className="text-sm text-slate-400 mt-2">Enter your details to access your dashboard</p>
        </div>
        {message.text && (
          <div className={`p-4 mb-6 rounded-2xl text-center text-xs font-bold border transition-all animate-pulse ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
            <input type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} 
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"/>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
            <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} 
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"/>
          </div>
          <button type="submit" disabled={loading} className={`w-full py-5 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center ${loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-slate-900'}`}>
            {loading ? 'Verifying...' : 'Submit Credentials'}
          </button>
        </form>
        <div className="mt-10 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>New to RecycleLink? </span>
          <a href="/register" className="text-blue-600 hover:underline ml-1">Register Account</a>
        </div>
      </div>
    </div>
  );
};
export default Login;