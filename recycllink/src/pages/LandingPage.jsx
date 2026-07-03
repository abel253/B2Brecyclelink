// src/pages/LandingPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Recycle, Users, ShoppingBag, TrendingUp, Package,
  Award, Clock, ChevronRight, Star, MapPin, Calendar, Leaf,
  Sparkles, BarChart3, DollarSign, CheckCircle, Shield, Truck,
  Zap, Globe, Heart, Play, Menu, X
} from 'lucide-react';

// --- ምስሎቹን ከ Assets ፎልደር ማስገባት (በስክሪንሾቱ መሠረት) ---
import rec1 from '../assets/recycle/recycle1.jpg';
import rec2 from '../assets/recycle/recycle2.jpg';
import rec3 from '../assets/recycle/recycle3.jpg';
import rec4 from '../assets/recycle/recycle4.jpg';
import rec5 from '../assets/recycle/recycle5.jpg';
import buyer2 from '../assets/buyer/buyers2.jpg';
import buyer3 from '../assets/buyer/buyers3.jpg';
import buyer4 from '../assets/buyer/buyers4.jpg';

const LandingPage = () => {
  const [stats, setStats] = useState({
    recycled: 0,
    buyers: 0,
    sellers: 0,
    transactions: 0
  });
  
  // ለ Hero Slider አዲስ ስቴት
  const [currentHeroImg, setCurrentHeroImg] = useState(0);
  const heroImages = [rec1, rec2, rec3, rec4, rec5];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Animated stats effect
  useEffect(() => {
    const targetStats = { recycled: 45280, buyers: 1234, sellers: 567, transactions: 9870000 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setStats({
        recycled: Math.round(targetStats.recycled * progress),
        buyers: Math.round(targetStats.buyers * progress),
        sellers: Math.round(targetStats.sellers * progress),
        transactions: Math.round(targetStats.transactions * progress)
      });
      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, interval);
    return () => clearInterval(timer);
  }, []);

  // Hero Image Slider Timer
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentHeroImg((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  // Testimonials (ምስሎችን ተክቻለሁ)
  const testimonials = [
    { id: 1, name: "Abebe Kebede", role: "Plastic Recycler", avatar: buyer2, quote: "RecycleLink has transformed my business. I've earned over ETB 50,000 from waste." },
    { id: 2, name: "Sara Aregawi", role: "Buyer", avatar: buyer3, quote: "Finding quality recyclable materials has never been easier. The platform is reliable." },
    { id: 3, name: "Green Waste Solutions", role: "Verified Seller", avatar: buyer4, quote: "We've grown our recycling business 3x since joining RecycleLink." }
  ];

  // Categories
  const categories = [
    { name: "Plastic", icon: "🥤", color: "bg-blue-100 text-blue-700", count: "1,234 listings" },
    { name: "Paper", icon: "📄", color: "bg-amber-100 text-amber-700", count: "856 listings" },
    { name: "Metal", icon: "🔧", color: "bg-slate-200 text-slate-700", count: "623 listings" },
    { name: "Glass", icon: "🍾", color: "bg-emerald-100 text-emerald-700", count: "421 listings" },
    { name: "E-Waste", icon: "💻", color: "bg-purple-100 text-purple-700", count: "312 listings" }
  ];

  // Recent Listings (ምስሎችን ተክቻለሁ)
  const recentListings = [
    { id: 1, title: "Plastic Bottles - Clear PET", type: "Plastic", weight: "45 kg", price: "2,500 ETB", location: "Addis Ababa", image: rec1, seller: "Green Waste Co.", time: "2 hours ago", rating: 4.8, verified: true },
    { id: 2, title: "Mixed Paper & Cardboard", type: "Paper", weight: "120 kg", price: "3,200 ETB", location: "Addis Ababa", image: rec2, seller: "EcoPaper Recyclers", time: "5 hours ago", rating: 4.6, verified: true },
    { id: 3, title: "Aluminum Cans - Sorted", type: "Metal", weight: "30 kg", price: "4,500 ETB", location: "Addis Ababa", image: rec3, seller: "MetalCycle", time: "8 hours ago", rating: 4.9, verified: true },
    { id: 4, title: "Electronic Waste - Mixed", type: "E-Waste", weight: "15 kg", price: "1,800 ETB", location: "Addis Ababa", image: rec4, seller: "TechRecycle Hub", time: "12 hours ago", rating: 4.7, verified: false }
  ];

  const steps = [
    { number: "1", title: "Post Your Waste", description: "List your recyclable materials with photos, quantity, and location", icon: Package, color: "bg-emerald-500" },
    { number: "2", title: "Get Offers", description: "Recyclers and buyers will bid on your materials within hours", icon: TrendingUp, color: "bg-blue-500" },
    { number: "3", title: "Secure Trade", description: "Complete the transaction safely through our platform", icon: Shield, color: "bg-purple-500" }
  ];

  const features = [
    { icon: Leaf, title: "Zero Waste Initiative", description: "Help Ethiopia achieve its waste reduction goals." },
    { icon: Users, title: "Community Driven", description: "Connect with conscious recyclers across Ethiopia." },
    { icon: ShoppingBag, title: "Fair Marketplace", description: "Get competitive pricing for all materials." },
    { icon: Shield, title: "Secure Trading", description: "Protected transactions with verified users." }
  ];

  const impactMetrics = [
    { value: "150+", label: "Tons Recycled", icon: Recycle },
    { value: "2,500+", label: "Active Users", icon: Users },
    { value: "10+", label: "Cities Covered", icon: MapPin },
    { value: "98%", label: "Satisfaction", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section (በምስል Slider የተተካ) */}
      <section className="relative h-[600px] lg:h-[750px] overflow-hidden">
        {heroImages.map((img, idx) => (
          <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentHeroImg ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img src={img} className="w-full h-full object-cover" alt="Background" />
          </div>
        ))}
        
        <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-400 text-sm font-bold mb-6 border border-emerald-500/30">
              <Sparkles className="w-4 h-4" /> Empowering Ethiopia's Green Future
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Turn Your Waste Into <span className="text-emerald-400">Value</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-lg leading-relaxed">
              Connect, trade, and recycle waste materials in Ethiopia. Join the circular economy and earn money.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/marketplace" className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-xl flex items-center gap-2">
                Browse Market <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/register" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold hover:bg-white hover:text-slate-900 transition-all">
                Register As Seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-12 bg-white border-y border-slate-100 relative z-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-emerald-50/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <metric.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{metric.value}</div>
                  <div className="text-sm text-slate-500">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings (ምስሎችን ተጠቅሟል) */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Recent Listings</h2>
              <p className="text-slate-500">Latest recyclable materials posted by sellers</p>
            </div>
            <Link to="/marketplace" className="text-emerald-600 font-bold flex items-center gap-2">View All <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                <div className="h-48 overflow-hidden relative">
                  <img src={listing.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={listing.title} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-emerald-600 uppercase">Verified</div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-800 mb-1">{listing.title}</h3>
                  <div className="text-xs text-slate-400 mb-4">{listing.location}</div>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-black text-emerald-600">{listing.price}</div>
                    <Link to={`/marketplace/${listing.id}`} className="p-2 bg-slate-50 rounded-full hover:bg-emerald-500 hover:text-white transition-all"><ChevronRight className="w-4 h-4" /></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (ምስሎችን ተጠቅሟል) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-12">What Our Community Says</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-8 bg-slate-50 rounded-[40px] text-left border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.avatar} className="w-14 h-14 rounded-2xl object-cover shadow-lg" alt={t.name} />
                  <div>
                    <div className="font-bold text-slate-800">{t.name}</div>
                    <div className="text-xs text-emerald-600 font-bold uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
                <p className="text-slate-600 italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;