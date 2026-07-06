import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // 1. መረጃውን ወደ Backend መላክ
     // በ Login.jsx ውስጥ ያለው handleSubmit
const response = await axios.post('http://127.0.0.1:5000/api/users/login', {
  email: formData.email,
  password: formData.password
});

if (response.status === 200) {
  // ሰርቨሩ የላከውን መረጃ እዚህ እንቀበላለን
  const { token, fullName, userId } = response.data;
  
  // ብሮውዘሩ ውስጥ እናስቀምጠዋለን
  localStorage.setItem('token', token);
  localStorage.setItem('fullName', fullName); // ስሙን እዚህ አስቀመጥነው
  localStorage.setItem('userId', userId);

  navigate('/dashboard'); // አሁን ወደ ዳሽቦርድ ይሄዳል
};   
 } catch (error) {
      // 4. ምዝገባው ካልተገኘ ወይም ፓስወርድ ከተሳሳተ የሚመጣ መልዕክት
      if (error.response) {
        if (error.response.status === 404) {
          setMessage({ 
            type: 'error', 
            text: 'Account not found! This email is not registered. Please register first.' 
          });
        } else if (error.response.status === 401) {
          setMessage({ 
            type: 'error', 
            text: 'Incorrect Password! Please try again.' 
          });
        } else {
          setMessage({ 
            type: 'error', 
            text: error.response.data.message || 'Login failed. Please try again.' 
          });
        }
      } else {
        setMessage({ type: 'error', text: 'Server error. Please check your internet.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white p-8 border border-slate-200 rounded-2xl shadow-xl">
        
        {/* Blue Login Header */}
        <div className="mb-8">
          
            <h1 style={{ color: '#3B82F6', fontSize: '24px', textAlign: 'center' }}>Login</h1>
          
        </div>

        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Welcome Back</h2>
        <p className="text-sm text-center text-slate-500 mb-8">Enter your details to access your dashboard</p>

        {/* Dynamic Status Message */}
        {message.text && (
          <div className={`p-4 mb-6 rounded-lg text-center text-sm font-bold shadow-sm border transition-all ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="name@example.com" 
              required 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              required 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-300"
            />
          </div>

          <div className="flex justify-end">
            <a href="/forgot-password" px-1 className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button with Loading State */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 text-white rounded-xl font-bold text-lg transition-all shadow-md active:scale-95 flex items-center justify-center ${
              loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                Verifying...
              </>
            ) : 'Submit'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          <span>Don't have an account? </span>
          <a href="/register" className="font-bold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline">
            Register Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;