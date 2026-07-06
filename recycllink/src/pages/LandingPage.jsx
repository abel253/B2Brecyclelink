import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Recycle, Package, Star, Sparkles, 
  Play, ArrowUpRight, Leaf, Shield, Zap, Globe
} from 'lucide-react';

// Assets
import rec1 from '../assets/recycle/recycle1.jpg';
import rec2 from '../assets/recycle/recycle2.jpg';
import rec3 from '../assets/recycle/recycle3.jpg';
import rec4 from '../assets/recycle/recycle4.jpg';
import rec5 from '../assets/seller/seller4.jpg';
import buyer2 from '../assets/buyer/buyers2.jpg';
import buyer3 from '../assets/buyer/buyers3.jpg';
import buyer4 from '../assets/buyer/buyers4.jpg';

const LandingPage = () => {
  const [currentHeroImg, setCurrentHeroImg] = useState(0);
  const heroImages = [rec1, rec2, rec3, rec4, rec5];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImg((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: "Plastic", count: "1.2k", icon: "🥤" },
    { name: "Metal", count: "850", icon: "🔧" },
    { name: "Paper", count: "2.1k", icon: "📄" },
    { name: "Glass", count: "400", icon: "🍾" },
    { name: "E-Waste", count: "150", icon: "💻" },
  ];

  const recentListings = [
    { id: 1, title: "Clear PET Bottles", price: "2,500 ETB", img: rec1, author: "Green Waste Co." },
    { id: 2, title: "Industrial Cardboard", price: "3,200 ETB", img: rec2, author: "EcoPaper" },
    { id: 3, title: "Aluminum Scrap", price: "4,500 ETB", img: rec3, author: "MetalCycle" },
    { id: 4, title: "Mixed E-Waste", price: "1,800 ETB", img: rec4, author: "TechHub" },
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] font-sans selection:bg-emerald-200 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      {/* ⚠️ እዚህ ጋር pt-32 እና pb-20 በመጨመር ናቭባሩ እንዳይሸፍነው ዝቅ አድርጌዋለሁ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
        
        {/* Background Image Slider with Zoom Effect */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImg}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <img src={heroImages[currentHeroImg]} className="w-full h-full object-cover" alt="Hero" />
              <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[11px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" /> Shaping Ethiopia's Circular Economy
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[13vw] md:text-[9vw] leading-[0.8] font-black uppercase tracking-tighter mb-8"
          >
            Waste to <br /> <span className="text-emerald-400 italic">Wealth</span>
          </motion.h1>

          <motion.p 
            {...fadeUp}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-medium mb-12 leading-relaxed"
          >
            Connect with Ethiopia's largest digital marketplace for sustainable waste trade. 
            Join thousands of verified collectors and industrial buyers.
          </motion.p>

          <motion.div 
            {...fadeUp}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link to="/marketplace" className="group relative px-10 py-5 bg-emerald-600 text-white rounded-full font-black uppercase tracking-widest text-xs overflow-hidden shadow-xl active:scale-95 transition-transform">
              <span className="relative z-10 flex items-center gap-2">Explore Market <ArrowRight className="w-4 h-4" /></span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 opacity-20" />
            </Link>
            <button className="flex items-center gap-4 font-black uppercase tracking-widest text-xs group text-white">
              <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-600 transition-all">
                <Play className="w-5 h-5 fill-current" />
              </div>
              Watch Process
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hidden md:block"
        >
          <div className="w-[1px] h-16 bg-gradient-to-t from-white to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* --- የተቀረው ኮድ እንዳለ ይቀጥላል --- */}
      
      {/* --- STATS TICKER --- */}
      <section className="py-14 border-y border-slate-100 bg-white overflow-hidden shadow-sm">
        <div className="flex whitespace-nowrap gap-20 animate-infinite-scroll">
          {[...categories, ...categories].map((cat, i) => (
            <div key={i} className="flex items-center gap-6 group cursor-pointer">
              <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all">{cat.icon}</span>
              <span className="text-5xl font-black uppercase tracking-tighter text-slate-200 group-hover:text-emerald-600 transition-colors">{cat.name}</span>
              <span className="text-emerald-500 font-mono text-sm px-3 py-1 bg-emerald-50 rounded-full">{cat.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- CORE FEATURES --- */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            {[
              { icon: Leaf, title: "Eco impact", text: "We help divert thousands of tons from landfills every year." },
              { icon: Shield, title: "Verified Trade", text: "Every user on our platform goes through a strict verification." },
              { icon: Zap, title: "Instant Pay", text: "Direct payments to your digital wallet upon successful trade." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.2 }}
                className="group"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-[20px] flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                  <f.icon size={30} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- RECENT LISTINGS --- */}
      <section className="py-32 bg-[#f8f8f8]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <p className="uppercase tracking-[0.3em] text-[11px] font-black text-emerald-600 mb-6">— The Marketplace</p>
              <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">Fresh Supply <br /> On Market.</h2>
            </div>
            <Link to="/marketplace" className="px-10 py-5 border-2 border-slate-200 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-white hover:border-black transition-all flex items-center gap-3">
              Explore All <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentListings.map((item, idx) => (
              <motion.div 
                key={item.id}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer bg-white p-4 rounded-[40px] border border-slate-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[1/1] rounded-[30px] overflow-hidden bg-slate-200 mb-8">
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                  <div className="absolute bottom-4 left-4 right-4 px-4 py-3 bg-white/90 backdrop-blur-md rounded-2xl text-[12px] font-black uppercase tracking-widest text-emerald-600 shadow-lg text-center translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                    {item.price}
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <h3 className="text-xl font-black tracking-tight mb-2 uppercase">{item.title}</h3>
                  <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    Source: <span className="text-black border-b border-black/20 pb-0.5">{item.author}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-24">
             <h2 className="text-6xl font-black uppercase tracking-tighter mb-8 leading-none">What Our <br /> <span className="text-emerald-600 underline decoration-4 underline-offset-8">Partners</span> Say.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[buyer2, buyer3, buyer4].map((avatar, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-12 rounded-[50px] bg-[#fcfcfc] border border-slate-100 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center gap-5 mb-10">
                  <img src={avatar} className="w-20 h-20 rounded-3xl object-cover shadow-xl grayscale hover:grayscale-0 transition-all duration-500" alt="Partner" />
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest mb-1">Partner Case #{idx + 1}</h4>
                    <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-emerald-50 rounded-full inline-block">Verified User</p>
                  </div>
                </div>
                <p className="text-2xl font-bold leading-snug italic text-slate-800 tracking-tight">
                  "RecycleLink has transformed our supply chain. We now source high-quality raw materials with 100% transparency."
                </p>
                <Star className="absolute top-10 right-10 text-emerald-100" size={40} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <style jsx>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 45s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;