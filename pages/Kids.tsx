import React, { useState } from 'react';
import { 
  Shield, Sparkles, Cake, Star, UserCheck, 
  Timer, CheckCircle2, Send, ArrowRight, 
  AlertCircle, ChevronRight, Heart
} from 'lucide-react';
import { db } from '../lib/db';

const Kids: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const inquiryData = {
      parent_name: formData.get('name'),
      email: formData.get('email'),
      proposed_date: formData.get('date'),
      kids_count: parseInt(formData.get('kids_count') as string) || 0,
      preferred_package: formData.get('package')
    };

    try {
      const { error: dbError } = await db.from('kids_inquiries').insert(inquiryData);
      if (dbError) throw dbError;
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Kids inquiry failed:', err);
      setError('We were unable to submit your inquiry. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 mb-32 relative">
        <div className="bg-dark rounded-[3rem] p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16 border border-gold/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
          
          <div className="flex-1 relative z-10">
            <span className="text-gold text-[10px] font-bold uppercase tracking-[6px] mb-6 inline-block">Parent Approved</span>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 text-white font-serif leading-tight">The Ultimate <em className="text-gold italic font-normal">Kids' Zone</em></h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 font-medium">
              A 16m² world of supervised wonder. Let your little explorers play while you savor your meal in peace. Safe, engaging, and designed for discovery.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#birthday-inquiry" className="bg-gold text-dark px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all shadow-xl shadow-gold/10 flex items-center gap-3 group">
                Book a Birthday <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <Shield size={20} className="text-gold" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">Fully Supervised</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative z-10">
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1566415111163-f1118bc00938?auto=format&fit=crop&q=80&w=600" 
                alt="Safe Kids Play Area" 
                className="rounded-[2.5rem] shadow-2xl border border-gold/20 transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-gold opacity-30 rounded-br-[3rem]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<Sparkles className="text-gold" size={32} />} 
            title="Creative Play" 
            desc="Interactive zones designed to spark imagination and cognitive development."
          />
          <FeatureCard 
            icon={<UserCheck className="text-gold" size={32} />} 
            title="Professional Care" 
            desc="Our trained childminders ensure a safe and supportive environment at all times."
          />
          <FeatureCard 
            icon={<Timer className="text-gold" size={32} />} 
            title="Operating Hours" 
            desc="Available every day from 08:00 to 21:00 for your convenience."
          />
        </div>
      </section>

      {/* Inquiry Section */}
      <section id="birthday-inquiry" className="py-32 bg-cream">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {error && (
            <div className="mb-10 p-5 bg-rust/5 border border-rust/10 rounded-2xl flex items-center gap-4 text-rust animate-fadeIn">
              <AlertCircle size={24} className="shrink-0" />
              <span className="font-bold text-sm uppercase tracking-widest">{error}</span>
            </div>
          )}
          
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:row border border-gold/5">
            <div className="bg-dark text-white p-12 lg:w-1/3 flex flex-col justify-center border-r border-gold/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-gold rounded-full -translate-x-1/2 -translate-y-1/2 blur-[80px]"></div>
              </div>
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-8 relative z-10">
                <Cake className="text-gold" size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-6 font-serif italic relative z-10">Let's Celebrate!</h3>
              <p className="text-white/60 text-sm leading-relaxed font-medium relative z-10">
                Fill out our inquiry form and our party coordinator will reach out within 24 hours to help you plan the perfect day for your little one.
              </p>
              <div className="mt-12 space-y-4 relative z-10">
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gold">
                  <Star size={14} /> Custom Themes
                </div>
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gold">
                  <Star size={14} /> Healthy Catering
                </div>
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gold">
                  <Star size={14} /> Private Zone
                </div>
              </div>
            </div>

            <div className="p-12 lg:w-2/3">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn py-12">
                  <div className="w-24 h-24 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-8 shadow-xl shadow-gold/5 animate-bounceIn">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 font-serif text-dark italic">Inquiry Sent!</h3>
                  <p className="text-muted mb-10 font-medium">We'll be in touch soon to discuss the magic.</p>
                  <button 
                    onClick={() => setIsSuccess(false)} 
                    className="bg-gold text-dark px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-dark hover:text-white transition-all shadow-xl"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Parent's Name *</label>
                      <input name="name" required type="text" className="w-full px-6 py-4 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none text-sm font-medium" placeholder="Full Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Email Address *</label>
                      <input name="email" required type="email" className="w-full px-6 py-4 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none text-sm font-medium" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Proposed Date *</label>
                      <input name="date" required type="date" className="w-full px-6 py-4 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none text-sm font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Approx. No. of Kids *</label>
                      <input name="kids_count" required type="number" className="w-full px-6 py-4 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none text-sm font-medium" placeholder="e.g. 10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Preferred Package *</label>
                    <div className="relative">
                      <select name="package" required className="w-full px-6 py-4 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none appearance-none text-sm font-medium">
                        <option>The Mini Chef (R185/pp)</option>
                        <option>The Ultimate Explorer (R250/pp)</option>
                        <option>Bespoke / Custom Theme</option>
                      </select>
                      <ChevronRight size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-gold rotate-90" />
                    </div>
                  </div>
                  <button 
                    disabled={isSubmitting} 
                    type="submit" 
                    className="w-full bg-dark text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-gold hover:text-dark transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-2xl group"
                  >
                    {isSubmitting ? 'Sending Request...' : <><Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Submit Inquiry</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gold/5 hover:border-gold/20 transition-all group hover:-translate-y-2">
    <div className="mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
    <h4 className="text-xl font-bold text-dark font-serif mb-4">{title}</h4>
    <p className="text-sm text-muted leading-relaxed font-medium">{desc}</p>
  </div>
);

export default Kids;
