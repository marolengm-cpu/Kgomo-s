import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Users, Clock, MessageSquare, Info, 
  CheckCircle2, AlertCircle, Phone, Mail, User,
  ChevronRight, ShieldCheck, Timer, Star
} from 'lucide-react';
import { db } from '../lib/db';

const Reservations: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const reservationData = {
      date: formData.get('date'),
      guests: formData.get('guests'),
      time: formData.get('time'),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      requests: formData.get('requests'),
      status: 'pending'
    };

    try {
      const { error: dbError } = await db.from('reservations').insert(reservationData);
      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (err: any) {
      console.error('Reservation failed:', err);
      setError('We were unable to process your booking. Please try calling us on 084 292 0000.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-40 flex flex-col items-center justify-center container mx-auto px-4 text-center animate-fadeIn bg-cream min-h-screen">
        <div className="w-24 h-24 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-8 animate-bounceIn shadow-xl shadow-gold/5">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-5xl font-bold mb-4 font-serif text-dark tracking-tight">Reservation Requested!</h1>
        <p className="text-muted max-w-md mx-auto mb-10 text-lg leading-relaxed font-medium">
          Thank you for choosing Kgomo's. We've received your request and will confirm your table via email or phone within 2 hours.
        </p>
        <button 
          onClick={() => setSubmitted(false)} 
          className="bg-gold text-dark px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-dark hover:text-white transition-all shadow-xl"
        >
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="mb-10 p-5 bg-rust/5 border border-rust/10 rounded-2xl flex items-center gap-4 text-rust animate-fadeIn">
              <AlertCircle size={24} className="shrink-0" />
              <span className="font-bold text-sm uppercase tracking-widest">{error}</span>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Section */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gold/5">
                <div className="mb-12">
                  <span className="text-gold text-[10px] font-bold uppercase tracking-[4px] mb-4 block">Reservations</span>
                  <h1 className="text-4xl md:text-5xl font-bold text-dark font-serif leading-tight">Book a <em className="text-gold italic font-normal">Table</em></h1>
                  <p className="text-muted mt-4 font-medium">Reserve your spot at Kgomo's. We'll confirm your booking shortly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-muted uppercase tracking-[3px] ml-1">Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                        <input 
                          name="date" 
                          type="date" 
                          required 
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-12 pr-4 py-4 bg-cream/50 border-0 rounded-2xl focus:ring-2 focus:ring-gold transition-all text-dark font-medium" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-muted uppercase tracking-[3px] ml-1">Guests *</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                        <select 
                          name="guests" 
                          required 
                          className="w-full pl-12 pr-4 py-4 bg-cream/50 border-0 rounded-2xl appearance-none focus:ring-2 focus:ring-gold transition-all text-dark font-medium"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                          <option value="9+">9+ (Please call us)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-muted uppercase tracking-[3px] ml-1">Preferred Time *</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                      <select 
                        name="time" 
                        required 
                        className="w-full pl-12 pr-4 py-4 bg-cream/50 border-0 rounded-2xl appearance-none focus:ring-2 focus:ring-gold transition-all text-dark font-medium"
                      >
                        <option value="">Select Time</option>
                        {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-muted uppercase tracking-[3px] ml-1">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                      <input 
                        name="name" 
                        type="text" 
                        required 
                        placeholder="Your full name" 
                        className="w-full pl-12 pr-4 py-4 bg-cream/50 border-0 rounded-2xl focus:ring-2 focus:ring-gold transition-all text-dark font-medium" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-muted uppercase tracking-[3px] ml-1">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                        <input 
                          name="email" 
                          type="email" 
                          required 
                          placeholder="you@example.com" 
                          className="w-full pl-12 pr-4 py-4 bg-cream/50 border-0 rounded-2xl focus:ring-2 focus:ring-gold transition-all text-dark font-medium" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-muted uppercase tracking-[3px] ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                        <input 
                          name="phone" 
                          type="tel" 
                          placeholder="0XX XXX XXXX" 
                          className="w-full pl-12 pr-4 py-4 bg-cream/50 border-0 rounded-2xl focus:ring-2 focus:ring-gold transition-all text-dark font-medium" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-muted uppercase tracking-[3px] ml-1 flex items-center gap-2">
                      <MessageSquare size={12} /> Special Requests
                    </label>
                    <textarea 
                      name="requests" 
                      rows={4} 
                      placeholder="Dietary requirements, highchair needed, celebration occasion..." 
                      className="w-full px-6 py-4 bg-cream/50 border-0 rounded-2xl focus:ring-2 focus:ring-gold transition-all text-dark font-medium resize-none"
                    ></textarea>
                  </div>

                  <button 
                    disabled={isSubmitting} 
                    type="submit" 
                    className="w-full bg-dark text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-gold hover:text-dark transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-3 relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative z-10">
                      {isSubmitting ? 'Processing Request...' : 'Confirm Reservation Request'}
                    </span>
                    {!isSubmitting && <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-dark text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-gold/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                
                <h3 className="text-sm font-black mb-10 uppercase tracking-[0.3em] text-gold flex items-center gap-3">
                  <Info size={18} /> Good to Know
                </h3>
                
                <div className="space-y-10">
                  <InfoItem 
                    icon={<Timer className="text-gold" size={24} />} 
                    title="Confirmation" 
                    desc="We'll confirm your table via email or phone within 2 hours of your request." 
                  />
                  <InfoItem 
                    icon={<Clock className="text-gold" size={24} />} 
                    title="Grace Period" 
                    desc="Tables are held for 15 minutes past your reservation time. Please call if you're running late." 
                  />
                  <InfoItem 
                    icon={<Users className="text-gold" size={24} />} 
                    title="Large Groups" 
                    desc="For groups of 9 or more, please call us directly to discuss our set menu options." 
                  />
                  <InfoItem 
                    icon={<ShieldCheck className="text-gold" size={24} />} 
                    title="Kids' Zone" 
                    desc="Supervised play area is available during all operating hours for children aged 3-10." 
                  />
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gold/5">
                <h3 className="text-xl font-bold text-dark font-serif mb-6 flex items-center gap-3">
                  <Star className="text-gold" size={20} /> Operating Hours
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gold/5">
                    <span className="font-bold text-dark">Mon – Sun</span>
                    <span className="text-muted font-medium">08:00 – 21:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-dark">Public Holidays</span>
                    <span className="text-muted font-medium">09:00 – 18:00</span>
                  </div>
                </div>
              </div>

              <div className="relative h-72 rounded-[2.5rem] overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1550966841-3ee5ad60d0d9?w=800&auto=format&fit=crop" 
                  alt="Kgomo's Atmosphere" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <p className="text-white font-serif italic text-xl">Experience the warmth of Kgomo's</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex gap-6 group">
    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
      {icon}
    </div>
    <div>
      <h4 className="text-xs font-black uppercase tracking-widest text-gold mb-2">{title}</h4>
      <p className="text-sm text-white/60 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

export default Reservations;
