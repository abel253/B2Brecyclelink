import { motion } from 'framer-motion';
import { 
  Leaf, Target, Eye, Users, ShieldCheck, Globe, 
  Truck, Recycle, Factory, BarChart3, ArrowUpRight, 
  CheckCircle2, Sparkles, Layers, DollarSign 
} from 'lucide-react';

// Assets (በፎልደርህ መሠረት የተገቡ ምስሎች)
import aboutHero from '../assets/image1.jpg';
import missionImg from '../assets/recycle/recycle4.jpg';
import visionImg from '../assets/image2.jpg';
import servicePlastic from '../assets/recycle/recycle1.jpg';
import servicePaper from '../assets/recycle/recycle2.jpg';
import serviceMetal from '../assets/recycle/recycle3.jpg';
import sellerImg from '../assets/seller/seller4.jpg';
import impactImg from '../assets/image3.jpg';

const About = () => {
  const services = [
    {
      title: "Recyclables Marketplace",
      desc: "A digital ecosystem to buy and sell clear PET plastic bottles, scrap metals, industrial cardboard, and electronic waste with instant market pricing.",
      img: servicePlastic,
      tag: "Marketplace"
    },
    {
      title: "Direct B2B Factory Sourcing",
      desc: "Connecting recycling plants and manufacturing factories directly with verified bulk suppliers, eliminating middleman exploitation.",
      img: servicePaper,
      tag: "Industrial B2B"
    },
    {
      title: "Logistics & Pickup Coordination",
      desc: "Smart route planning and transport dispatch connecting material sellers with buyers across Addis Ababa and major cities in Ethiopia.",
      img: serviceMetal,
      tag: "Transport"
    },
    {
      title: "Impact & CO2 Analytics",
      desc: "Providing enterprise partners with verifiable green certificates and analytics on carbon emissions offset by recycling.",
      img: impactImg,
      tag: "Verification"
    }
  ];

  const focusAreas = [
    {
      icon: Recycle,
      title: "Plastic Waste (PET & HDPE)",
      detail: "Converting millions of discarded plastic bottles into industrial-grade flakes and raw synthetic fibers."
    },
    {
      icon: Layers,
      title: "Paper & Cardboard",
      detail: "Supplying packaging industries with sorted cardboard scrap to reduce tree cutting and industrial deforestation."
    },
    {
      icon: Factory,
      title: "Scrap Metals & Cans",
      detail: "Aggregating aluminum and iron scrap for local steel mills and metal manufacturing plants."
    },
    {
      icon: Sparkles,
      title: "E-Waste & Glass",
      detail: "Safely handling discarded electronics, computer components, and glass bottles for specialized recycling."
    }
  ];

  return (
    <div className="w-full bg-[#fcfcfc] text-[#1a1a1a] font-sans overflow-x-hidden">
      
      {/* --- 1. HERO SECTION (FULL SCREEN) --- */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={aboutHero} className="w-full h-full object-cover" alt="About Hero" />
          <div className="absolute inset-0 bg-[#0a0a0a]/65 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 text-center px-[5vw] max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-md text-emerald-400 font-black text-xs uppercase tracking-[0.3em] mb-8"
          >
            <Sparkles size={14} /> Empowering Ethiopia's Circular Economy
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[11vw] md:text-[8vw] leading-[0.85] font-black text-white uppercase tracking-tighter mb-8"
          >
            REDEFINING <span className="italic text-emerald-500">RECYCLING.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            RecycleLink is Ethiopia’s pioneer digital marketplace connecting informal waste collectors, scrap yards, and recycling factories into one unified, transparent network.
          </motion.p>
        </div>
      </section>

      {/* --- 2. WHAT IS RECYCLELINK? (PROJECT OVERVIEW) --- */}
      <section className="w-full py-32 px-[5vw] bg-white">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -40 }}
            className="space-y-8"
          >
            <p className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em]">— Project Overview</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              TURNING ETHIOPIA'S <br /> <span className="text-emerald-600">WASTE INTO VALUE.</span>
            </h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Every day, thousands of tons of recyclable plastics, paper, and metal end up in urban landfills or street corners across Ethiopia. Meanwhile, local recycling factories suffer from severe raw material shortages due to fragmented supply chains.
            </p>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              <strong className="text-slate-900 font-black">RecycleLink fixes this gap.</strong> We provide a technology-driven platform where collectors can list materials with clear quantities and locations, while factories bid for supply at fair, real-time market rates.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="text-3xl font-black text-emerald-600 mb-1">01. Fair</div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Real-Time Pricing</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="text-3xl font-black text-emerald-600 mb-1">02. Verified</div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Trusted Partners</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-[50px] overflow-hidden shadow-2xl h-[550px] border border-slate-100"
          >
            <img src={sellerImg} className="w-full h-full object-cover" alt="RecycleLink Collector" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <span className="px-4 py-1.5 bg-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">Empowering Communities</span>
              <h3 className="text-2xl font-black uppercase tracking-tight">Fair Income for Local Waste Collectors</h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 3. MISSION & VISION (SIDE BY SIDE CARDS) --- */}
      <section className="w-full py-32 px-[5vw] bg-slate-900 text-white rounded-[60px] my-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Mission */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            className="p-12 rounded-[40px] bg-white/5 border border-white/10 space-y-8"
          >
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
              <Target size={32} />
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tight">Our Mission</h3>
            <p className="text-slate-300 text-lg leading-relaxed font-medium">
              To build Ethiopia’s most trusted circular economy engine by empowering waste collectors with fair digital trade, providing industries with verified raw materials, and creating zero-waste cities.
            </p>
            <ul className="space-y-3 pt-4 border-t border-white/10 text-slate-400 font-bold text-sm">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-400" /> Transparent Pricing Mechanism</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-400" /> Digital Wallet & Direct Payments</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-400" /> Formalizing the Informal Recycling Sector</li>
            </ul>
          </motion.div>

          {/* Vision */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.2 }}
            className="p-12 rounded-[40px] bg-white/5 border border-white/10 space-y-8"
          >
            <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400">
              <Eye size={32} />
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tight">Our Vision</h3>
            <p className="text-slate-300 text-lg leading-relaxed font-medium">
              To position Ethiopia as a pioneer in African circular technology, where no recyclable resource is wasted, and sustainable waste trade drives economic growth for millions.
            </p>
            <ul className="space-y-3 pt-4 border-t border-white/10 text-slate-400 font-bold text-sm">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-cyan-400" /> 100% Traceable Recyclable Supply Chains</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-cyan-400" /> Zero Landfill Impact Goal for 2030</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-cyan-400" /> Pan-African Green Trade Expansion</li>
            </ul>
          </motion.div>

        </div>
      </section>

      {/* --- 4. OUR SERVICES (DETAILED GRID WITH IMAGES) --- */}
      <section className="w-full py-32 px-[5vw] bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <p className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-4">— Solutions</p>
            <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              WHAT WE <span className="text-emerald-600">DO.</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-md text-sm">
            We deliver end-to-end digital solutions for waste aggregation, industrial supply sourcing, transport dispatch, and environmental tracking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <motion.div 
              key={idx}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-slate-50 p-6 rounded-[35px] border border-slate-100 hover:border-emerald-500 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 rounded-[25px] overflow-hidden mb-6 bg-slate-200">
                  <img src={s.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={s.title} />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-emerald-600 shadow-sm">
                    {s.tag}
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-3 text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">{s.desc}</p>
              </div>
              
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">RecycleLink Service</span>
                <ArrowUpRight size={16} className="text-emerald-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 5. CORE FOCUS MATERIALS --- */}
      <section className="w-full py-32 px-[5vw] bg-[#f8fafc] border-y border-slate-100">
        <div className="max-w-4xl mb-20">
          <p className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-4">— Focus Areas</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            MATERIALS WE <span className="text-emerald-600">TRADE.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {focusAreas.map((item, idx) => (
            <motion.div 
              key={idx}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white rounded-[35px] border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                <item.icon size={28} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight mb-3 text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 6. TARGET STAKEHOLDERS (WHO BENEFITS?) --- */}
      <section className="w-full py-32 px-[5vw] bg-white">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-emerald-600 font-black text-xs uppercase tracking-[0.4em] mb-4">— Ecosystem</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            WHO BENEFITS FROM <br /> <span className="text-emerald-600">RECYCLELINK?</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Collectors */}
          <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 space-y-6">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black">01</div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">Collectors & Scrap Shops</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Get instant access to real-time market prices, connect directly with bulk buyers, and receive guaranteed digital payments without middleman price gouging.
            </p>
          </div>

          {/* Factories */}
          <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 space-y-6">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black">02</div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">Recycling Factories</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Secure a reliable, continuous supply of pre-sorted raw materials (plastic PET, cardboard, metal scrap) directly from verified local suppliers.
            </p>
          </div>

          {/* Cities & Environment */}
          <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 space-y-6">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black">03</div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">Cities & Environment</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Reduces municipal solid waste clogging urban drains and landfills, creates green jobs, and helps Ethiopia achieve its national climate reduction goals.
            </p>
          </div>

        </div>
      </section>

      {/* --- 7. CALL TO ACTION FOOTER BANNER --- */}
      <section className="w-full py-28 px-[5vw] bg-black text-white text-center rounded-t-[60px]">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="px-4 py-1.5 rounded-full bg-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] inline-block border border-white/10">
            Get Started Today
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Ready to Join Ethiopia's <br /> <span className="text-emerald-500 italic">Circular Revolution?</span>
          </h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto text-sm leading-relaxed">
            Whether you have collected waste to sell or need raw materials for your manufacturing plant, RecycleLink is your trusted digital trade partner.
          </p>
          <div className="pt-6">
            <a href="/register" className="inline-block px-12 py-6 bg-emerald-600 text-white rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-2xl">
              Become a Partner Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;