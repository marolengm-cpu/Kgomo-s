import React, { useState } from 'react';
import { 
  Shield, Award, Zap, Calculator, Gift, 
  TrendingUp, CheckCircle2, User, Mail, 
  Send, AlertCircle, Star, ChevronRight, 
  Crown, Sparkles, Gem
} from 'lucide-react';
import { db } from '../lib/db';

const Loyalty: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const signupData = {
      name: formData.get('name'),
      email: formData.get('email'),
      monthly_spend_estimate: 1000 // Default or hidden
    };

    try {
      const { error: dbError } = await db.from('loyalty_signups').insert(signupData);
      if (dbError) throw dbError;
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Loyalty sign-up failed:', err);
      setError('We were unable to register your account. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-24">
            <span className="text-gold text-[10px] font-bold uppercase tracking-[6px] mb-6 block">The Inner Circle</span>
            <h1 className="text-5xl md:text-8xl font-bold mb-10 text-dark font-serif leading-tight">Bespoke <em className="text-gold italic font-normal">Rewards.</em></h1>
            <p className="text-xl md:text-2xl text-muted max-w-4xl mx-auto font-medium leading-relaxed">
              Earn 1 point for every R 10 spent. Unlock exclusive perks, private dining invitations, and artisanal gifts across our tiered membership.
            </p>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-12"></div>
          </div>

          {/* Tiers Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            <TierCard 
              icon={<Award className="text-gold" size={32} />}
              title="Bronze"
              points="0 - 500 Points"
              perks={["5% Cash Back", "Birthday Treat", "Member-only Events"]}
            />
            <TierCard 
              icon={<Crown className="text-gold" size={32} />}
              title="Silver"
              points="501 - 2000 Points"
              perks={["10% Cash Back", "Priority Booking", "Free Delivery", "Quarterly Gift"]}
              featured={true}
            />
            <TierCard 
              icon={<Gem className="text-gold" size={32} />}
              title="Gold"
              points="2000+ Points"
              perks={["15% Cash Back", "Chef's Table Access", "Private Concierge", "VIP Events"]}
            />
          </div>

          {/* Signup Section */}
          <div id="signup" className="max-w-4xl mx-auto">
            {error && (
              <div className="mb-10 p-5 bg-rust/5 border border-rust/10 rounded-2xl flex items-center gap-4 text-rust animate-fadeIn">
                <AlertCircle size={24} className="shrink-0" />
                <span className="font-bold text-sm uppercase tracking-widest">{error}</span>
              </div>
            )}

            <div className="bg-dark p-12 md:p-20 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border border-gold/10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
              
              {isSuccess ? (
                <div className="animate-fadeIn relative z-10 text-center py-12">
                  <div className="w-24 h-24 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-8 mx-auto shadow-xl shadow-gold/5 animate-bounceIn">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-4xl font-bold mb-4 font-serif italic text-gold">Welcome to the Circle!</h3>
                  <p className="text-white/60 mb-10 font-medium">Your membership is now active. You'll receive a welcome package via email shortly.</p>
                  <button 
                    onClick={() => setIsSuccess(false)} 
                    className="bg-gold text-dark px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-xl"
                  >
                    Back to Form
                  </button>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                      <Sparkles className="text-gold" size={32} />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 font-serif italic text-gold">Join the Family</h3>
                    <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-black">Begin your journey with Kgomo's</p>
                  </div>

                  <form onSubmit={handleSignUp} className="space-y-8 max-w-xl mx-auto">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Full Name *</label>
                        <input name="name" required type="text" className="w-full bg-white/5 border border-gold/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-gold transition-all text-sm font-medium" placeholder="Your Name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Email Address *</label>
                        <input name="email" required type="email" className="w-full bg-white/5 border border-gold/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-gold transition-all text-sm font-medium" placeholder="you@example.com" />
                      </div>
                    </div>
                    
                    <button 
                      disabled={isSubmitting} 
                      type="submit" 
                      className="w-full bg-gold text-dark py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all flex items-center justify-center gap-3 shadow-2xl shadow-gold/5 group"
                    >
                      {isSubmitting ? 'Processing...' : <><Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Create My Account</>}
                    </button>

                    <p className="text-center text-[10px] text-white/30 uppercase tracking-widest font-medium">
                      By joining, you agree to our terms and privacy policy.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TierCard = ({ icon, title, points, perks, featured = false }: any) => (
  <div className={`p-10 rounded-[2.5rem] shadow-xl border transition-all group hover:-translate-y-2 flex flex-col ${
    featured ? 'bg-dark text-white border-gold/30 scale-105' : 'bg-white text-dark border-gold/5'
  }`}>
    <div className="mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
    <h4 className={`text-2xl font-bold font-serif mb-2 ${featured ? 'text-gold' : 'text-dark'}`}>{title}</h4>
    <p className={`text-xs font-black uppercase tracking-widest mb-8 ${featured ? 'text-white/40' : 'text-muted'}`}>{points}</p>
    
    <div className="space-y-4 flex-grow">
      {perks.map((perk: string, idx: number) => (
        <div key={idx} className="flex items-center gap-3">
          <CheckCircle2 size={14} className="text-gold shrink-0" />
          <span className={`text-sm font-medium ${featured ? 'text-white/70' : 'text-muted'}`}>{perk}</span>
        </div>
      ))}
    </div>

    {featured && (
      <div className="mt-10 pt-8 border-t border-white/10">
        <span className="text-[10px] font-black uppercase tracking-widest text-gold">Most Popular Tier</span>
      </div>
    )}
  </div>
);

export default Loyalty;
