import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Eye አንድ ጊዜ ብቻ ነው መፃፍ ያለበት
import { Eye, Search, MapPin, Package, MessageCircle, TrendingUp, Plus } from 'lucide-react';

const Marketplace = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/listings');
        setMaterials(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  return (
    // pt-32 ከ Navbar በታች በቂ ክፍተት ይሰጠዋል
    <div className="min-h-screen bg-[#F8FAFC] pt-32">
      
      {/* Header Section */}
      <div className="px-[5vw] mb-12">
        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 uppercase leading-none">
              Marketplace
            </h1>
            <p className="text-slate-400 font-medium mt-3 text-lg italic">
              Trade recyclables with verified partners.
            </p>
          </div>
          
          {/* ✅ ትክክለኛው ሊንክ እዚህ ጋር ነው (በ App.jsx በሰጠኸው Path ተካው) */}
          <Link 
            to="/dashboardpost" 
            className="group flex items-center gap-4 bg-emerald-600 text-white px-10 py-5 rounded-[25px] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-2xl shadow-emerald-500/20 active:scale-95"
          >
            <div className="bg-white/20 p-2 rounded-xl group-hover:rotate-90 transition-transform">
               <Plus size={20} /> 
            </div>
            New Material Post
          </Link>
        </div>
      </div>

      {/* Listings Grid */}
      <main className="px-[5vw] pb-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {materials.map((item) => (
              <div key={item._id} className="group bg-white rounded-[50px] border border-slate-100 p-6 shadow-sm hover:shadow-2xl transition-all duration-500 relative">
                
                {/* Image Box */}
                <div className="relative h-60 bg-slate-50 rounded-[40px] overflow-hidden flex items-center justify-center mb-6">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-32 group-hover:scale-110 transition-transform duration-700" 
                  />
                  
                  <div className={`absolute top-5 left-5 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${item.role === 'buyer' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'}`}>
                    {item.role === 'buyer' ? 'Factory / Buyer' : 'Collector / Seller'}
                  </div>

                  <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black text-slate-900 shadow-sm flex items-center gap-2">
                    <Package size={14} className="text-emerald-600" /> {item.weight}
                  </div>
                </div>

                <div className="px-2">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    {item.isFeatured && <TrendingUp className="text-amber-500 shrink-0" size={20} />}
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <MapPin size={14} className="text-emerald-500" /> {item.location}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Total Value</p>
                      <p className="text-2xl font-black text-emerald-600">ETB {item.price}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      {/* ወደ ዝርዝር መረጃ (Detail) የሚወስድ */}
                      <button 
                        onClick={() => navigate(`/material/${item._id}`)} 
                        className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                      >
                        <Eye size={22} />
                      </button>
                      <button className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;