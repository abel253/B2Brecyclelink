import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { X, Upload, Package, Building2, ShieldCheck, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardPost = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // ፋይል ኢንፑቱን ለመቆጣጠር

  // የተቀናጀ State
  const [selectedFile, setSelectedFile] = useState(null);
  const [postData, setPostData] = useState({
    title: '',
    category: '',
    otherCategory: '',
    price: '',
    weight: '',
    location: '',
    role: 'seller', // default role
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/815/815525.png'
  });

  // ፋይል ሰሌክት ሲደረግ የሚሰራ ፋንክሽን
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // የዲዛይን ሳጥኑ ሲነካ እውነተኛውን ፋይል መምረጫ እንዲከፍት
  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('category', postData.category === 'Other' ? postData.otherCategory : postData.category);
        formData.append('price', postData.price);
        formData.append('weight', postData.weight);
        formData.append('location', postData.location);
        formData.append('role', postData.role);
        formData.append('sellerId', localStorage.getItem('userId') || 1); // የተጠቃሚውን ID መላክ
        
        if (selectedFile) {
            formData.append('image', selectedFile); // ፋይሉን መጨመር
        }

        const response = await axios.post('http://localhost:5000/api/listings', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.status === 201) {
            alert("በተሳካ ሁኔታ ተለጥፏል!");
            navigate('/marketplace');
        }
    } catch (err) {
        console.error("Error:", err.response?.data || err.message);
        alert("ስህተት ተፈጥሯል! እባክዎ ሰርቨሩ መስራቱን ያረጋግጡ።");
    }
};
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 md:p-10 font-sans">
      <motion.div 
        initial={{ y: 30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="bg-white rounded-[60px] max-w-6xl w-full p-8 md:p-16 shadow-2xl relative overflow-hidden"
      >
        {/* የዘጋቢ በተን */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-8 right-8 md:top-12 md:right-12 p-3 bg-slate-50 rounded-full hover:bg-slate-200 transition-all z-10"
        >
          <X size={24} />
        </button>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* የግራ ክፍል - Role Selection */}
          <div className="flex flex-col">
            <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em] mb-6">— Profile & Listing Setup</p>
            <h2 className="text-5xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase mb-8">
              Launch Your <br /> Material Post.
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-10">
              Identify your role. Collectors post materials to sell, while Factories post to buy what they need.
            </p>
            
            <div className="grid gap-5">
              {[
                { id: 'seller', title: 'Collector / Shop', icon: Package, desc: 'Sell collected waste materials.' },
                { id: 'buyer', title: 'Factory / Recycler', icon: Building2, desc: 'Buy materials for processing.' }
              ].map(r => (
                <div 
                  key={r.id}
                  onClick={() => setPostData({...postData, role: r.id})}
                  className={`p-6 rounded-[35px] border-2 cursor-pointer transition-all flex items-center gap-6 ${postData.role === r.id ? 'border-emerald-600 bg-emerald-50 shadow-lg' : 'border-slate-100 hover:bg-slate-50'}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${postData.role === r.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <r.icon size={24} />
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase tracking-widest">{r.title}</p>
                    <p className="text-xs text-slate-500">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* የቀኝ ክፍል - ፎርሙ */}
          <div className="bg-slate-50 rounded-[50px] p-8 md:p-12 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Item or Organization Title</label>
                <input 
                  required type="text" placeholder="e.g. Clean PET Plastic Bottles" 
                  className="w-full p-5 bg-white rounded-[25px] font-bold border-2 border-transparent focus:border-emerald-500 outline-none shadow-sm transition-all" 
                  onChange={(e) => setPostData({...postData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Category</label>
                  <select 
                    required 
                    className="w-full p-5 bg-white rounded-[25px] font-bold border-2 border-transparent focus:border-emerald-500 outline-none cursor-pointer shadow-sm"
                    onChange={(e) => setPostData({...postData, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Metal">Metal</option>
                    <option value="Paper">Paper</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Price (ETB)</label>
                  <input 
                    required type="number" placeholder="2500" 
                    className="w-full p-5 bg-white rounded-[25px] font-bold shadow-sm outline-none focus:border-emerald-500 border-2 border-transparent" 
                    onChange={(e) => setPostData({...postData, price: e.target.value})}
                  />
                </div>
              </div>

              {/* Other Category Input */}
              <AnimatePresence>
                {postData.category === 'Other' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-2 overflow-hidden">
                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600 ml-3">Specify Material</label>
                    <input 
                      required type="text" placeholder="Specify your material..." 
                      className="w-full p-5 bg-white rounded-[25px] font-bold border-2 border-emerald-200 focus:border-emerald-500 shadow-sm outline-none" 
                      onChange={(e) => setPostData({...postData, otherCategory: e.target.value})}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Weight / Quantity</label>
                  <input required type="text" placeholder="e.g. 500 kg" className="w-full p-5 bg-white rounded-[25px] font-bold shadow-sm outline-none border-2 border-transparent focus:border-emerald-500" onChange={(e) => setPostData({...postData, weight: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Location</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input required type="text" placeholder="Addis Ababa" className="w-full pl-12 p-5 bg-white rounded-[25px] font-bold shadow-sm outline-none border-2 border-transparent focus:border-emerald-500" onChange={(e) => setPostData({...postData, location: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* ⚠️ የተስተካከለው የፋይል አፕሎድ ክፍል */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Material Image or License</label>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,.pdf" />
                
                <div 
                  onClick={onUploadClick}
                  className={`border-2 border-dashed rounded-[35px] p-8 text-center transition-all cursor-pointer group 
                    ${selectedFile ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:bg-emerald-100 hover:border-emerald-500'}`}
                >
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-8 h-8 text-emerald-600 mb-2" />
                      <p className="text-[11px] font-bold text-emerald-700 truncate max-w-[250px]">{selectedFile.name}</p>
                      <span className="text-[9px] text-slate-400 uppercase font-black mt-1">Click to change file</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-slate-300 mb-2 group-hover:text-emerald-600 transition-colors" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-colors">
                        Scan & Upload Document
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="w-full py-6 bg-black text-white rounded-[30px] font-black text-xs uppercase tracking-[0.3em] hover:bg-emerald-600 transition-all shadow-2xl flex items-center justify-center gap-4">
                <ShieldCheck size={20} /> Verify & Publish Post <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPost;