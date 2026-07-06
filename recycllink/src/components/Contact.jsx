import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <div className="w-full min-h-screen bg-[#fcfcfc] text-[#1a1a1a] pt-32 px-[5vw] pb-20">
      
      <div className="grid lg:grid-cols-2 gap-24 items-start">
        
        {/* Left Side: Info */}
        <div className="space-y-12">
          <div>
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-emerald-600 font-black text-xs uppercase tracking-[0.5em] mb-6"
            >
              — Connect
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-10"
            >
              GET IN <br /> <span className="text-emerald-600 underline decoration-8 underline-offset-8">TOUCH.</span>
            </motion.h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-md">
              Have a question about trading? Or want to partner with us for a cleaner Ethiopia? Send us a message.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Mail size={24} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Us</p>
                    <p className="text-lg font-bold">hello@recyclelink.com</p>
                </div>
            </div>

            <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Phone size={24} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Call Now</p>
                    <p className="text-lg font-bold">+251 911 00 00 00</p>
                </div>
            </div>

            <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <MapPin size={24} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Office</p>
                    <p className="text-lg font-bold">Kirkos, Addis Ababa, ET</p>
                </div>
            </div>
          </div>
        </div>

        {/* Right Side: Professional Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[60px] p-12 shadow-2xl border border-slate-50 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                <MessageSquare className="text-emerald-600" /> Send Message
            </h3>
            <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Full Name</label>
                        <input type="text" placeholder="Abebe Kebede" className="w-full p-5 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Email Address</label>
                        <input type="email" placeholder="abebe@mail.com" className="w-full p-5 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Subject</label>
                    <input type="text" placeholder="Partnership inquiry" className="w-full p-5 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-3">Your Message</label>
                    <textarea rows="5" placeholder="Write your message here..." className="w-full p-5 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-emerald-500 outline-none resize-none"></textarea>
                </div>
                <button className="w-full py-6 bg-black text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-4">
                    <Send size={18} /> Send Message Now
                </button>
            </form>
          </div>
          {/* Background Decor */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;