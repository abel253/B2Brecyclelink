import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePhone = (phone) => {
    return String(phone).match(/^(?:\+251|0)[97]\d{8}$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      setMessage({ type: 'error', text: 'እባክዎ ሁሉንም ሳጥኖች ይሙሉ!' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setMessage({ type: 'error', text: 'ትክክለኛ የኢሜይል አድራሻ ያስገቡ!' });
      return;
    }

    if (!validatePhone(formData.phone)) {
      setMessage({ type: 'error', text: 'ትክክለኛ ስልክ ቁጥር ያስገቡ (ምሳሌ፦ 0911223344)!' });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'ፓስወርድ ቢያንስ 6 ፊደላት መሆን አለበት!' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'የገቡት ፓስወርዶች አይመሳሰሉም!' });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      if (response.status === 201 || response.status === 200) {
        setMessage({ type: 'success', text: 'ምዝገባው ተሳክቷል! ወደ መግቢያ ገጽ እየወሰድዎት ነው...' });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'ምዝገባው አልተሳካም። እባክዎ ደግመው ይሞክሩ።';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="text-5xl mb-4">♻️</div>
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Create Account</h2>
        <p className="mt-2 text-sm text-slate-400 font-medium italic">
          Join RecycleLink to start trading materials
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-2xl rounded-[40px] border border-slate-100">
          
          {message.text && (
            <div className={`p-4 mb-6 rounded-2xl text-center text-xs font-bold border transition-all ${
              message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 ml-2">Full Name</label>
              <input 
                type="text" name="fullName" placeholder="Daniel Zigabe"
                value={formData.fullName} onChange={handleChange}
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 ml-2">Email</label>
                <input 
                  type="email" name="email" placeholder="danielzigabe@gmail.com"
                  value={formData.email} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 ml-2">Phone</label>
                <input 
                  type="tel" name="phone" placeholder="0911111111"
                  value={formData.phone} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 ml-2">Password</label>
              <input 
                type="password" name="password" placeholder="••••••••"
                value={formData.password} onChange={handleChange}
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 ml-2">Confirm Password</label>
              <input 
                type="password" name="confirmPassword" placeholder="••••••••"
                value={formData.confirmPassword} onChange={handleChange}
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
              />
            </div>

            <button 
              type="submit" disabled={loading}
              className={`w-full py-5 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/10 active:scale-95 flex items-center justify-center ${
                loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-slate-900'
              }`}
            >
              {loading ? 'Creating Account...' : 'Register Platform'}
            </button>
          </form>

          <div className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">Login Here</a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;