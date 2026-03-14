import React, { useState } from 'react';
import { 
  Users, Briefcase, Camera, MessageSquare, ArrowRight, 
  Quote, Coffee, Home, Truck, UtensilsCrossed, 
  CheckCircle2, AlertCircle, Star, ChevronRight, ShieldCheck
} from 'lucide-react';
import { db } from '../lib/db';

const Corporate: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const inquiryData = {
      company_name: formData.get('company'),
      email: formData.get('email'),
      event_type: formData.get('event_type'),
      event_date: formData.get('date'),
      guests: parseInt(formData.get('guests') as string) || 0,
      details: formData.get('details')
    };

    try {
      const { error: dbError } = await db.from('corporate_inquiries').insert(inquiryData);
      if (dbError) throw dbError;
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Corporate inquiry failed:', err);
      setError('We were unable to submit your request. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 mb-32 text-center">
        <span className="text-gold text-[10px] font-bold uppercase tracking-[6px] mb-6 block">Corporate & Private Functions</span>
        <h1 className="text-5xl md:text-8xl font-bold mb-10 text-dark font-serif leading-tight">Elevated <em className="text-gold italic font-normal">Hosting.</em></h1>
        <p className="text-xl md:text-2xl text-muted max-w-4xl mx-auto mb-12 font-medium leading-relaxed">
          Whether you're hosting at our sophisticated Pretoria East venue or require premium catering at your office or home, Kgomo's delivers artisanal excellence tailored to your vision.
        </p>
        <div className="w-16 h-0.5 bg-gold mx-auto"></div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 md:px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ServiceCard 
            icon={<Briefcase className="text-gold" size={32} />} 
            title="Corporate Events" 
            desc="From board meetings to product launches, we provide a professional and refined atmosphere."
          />
          <ServiceCard 
            icon={<UtensilsCrossed className="text-gold" size={32} />} 
            title="Private Dining" 
            desc="Intimate gatherings and celebrations in our exclusive dining spaces with bespoke menus."
          />
          <ServiceCard 
            icon={<Truck className="text-gold" size={32} />} 
            title="Off-site Catering" 
            desc="Bring the Kgomo's experience to your office or home with our premium catering services."
          />
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry" className="py-24 container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {error && (
            <div className="mb-10 p-5 bg-rust/5 border border-rust/10 rounded-2xl flex items-center gap-4 text-rust animate-fadeIn">
              <AlertCircle size={24} className="shrink-0" />
              <span className="font-bold text-sm uppercase tracking-widest">{error}</span>
            </div>
          )}
          
          {isSuccess ? (
            <div className="bg-white p-16 rounded-[3rem] animate-fadeIn border border-gold/5 text-center shadow-2xl">
               <div className="w-24 h-24 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-8 mx-auto shadow-xl shadow-gold/5 animate-bounceIn">
                  <CheckCircle2 size={48} />
               </div>
               <h2 className="text-4xl font-bold mb-4 text-dark font-serif italic">Inquiry Received!</h2>
               <p className="text-muted mb-10 font-medium">A member of our events team will contact you within 24 hours to discuss your requirements.</p>
               <button 
                onClick={() => setIsSuccess(false)} 
                className="bg-gold text-dark px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-dark hover:text-white transition-all shadow-xl"
               >
                Back to Form
               </button>
            </div>
          ) : (
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gold/5 shadow-2xl flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/3 bg-dark text-white p-10 rounded-[2rem] border border-gold/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
                <h3 className="text-sm font-black mb-10 uppercase tracking-[0.3em] text-gold flex items-center gap-3">
                  <Star size={18} /> Request a Quote
                </h3>
                <p className="text-white/60 text-sm leading-relaxed font-medium mb-10">
                  Let us craft your perfect event. Fill out the form and our events coordinator will get back to you with a bespoke proposal.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gold">
                    <ShieldCheck size={16} /> Secure Bookings
                  </div>
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gold">
                    <Coffee size={16} /> Custom Menus
                  </div>
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gold">
                    <Users size={16} /> Large Groups
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Company / Name *</label>
                      <input name="company" placeholder="Full Name" required type="text" className="w-full px-6 py-4 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none text-sm font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Email Address *</label>
                      <input name="email" placeholder="you@example.com" required type="email" className="w-full px-6 py-4 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none text-sm font-medium" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Event Type *</label>
                      <div className="relative">
                        <select name="event_type" className="w-full px-6 py-4 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none text-sm font-medium appearance-none">
                           <option>On-site Function</option>
                           <option>Office Lunch Delivery</option>
                           <option>Private Dining</option>
                           <option>Corporate Catering</option>
                        </select>
                        <ChevronRight size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-gold rotate-90" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Event Date *</label>
                      <input name="date" required type="date" className="w-full px-6 py-4 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none text-sm font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Number of Guests *</label>
                    <input name="guests" placeholder="e.g. 20" required type="number" className="w-full px-6 py-4 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none text-sm font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Event Details & Requirements</label>
                    <textarea name="details" rows={5} placeholder="Tell us more about your vision..." className="w-full px-6 py-4 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none resize-none text-sm font-medium"></textarea>
                  </div>
                  <button 
                    disabled={isSubmitting} 
                    type="submit" 
                    className="w-full bg-dark text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-gold hover:text-dark transition-all flex items-center justify-center gap-3 shadow-2xl group"
                  >
                    {isSubmitting ? 'Sending Inquiry...' : <>Send Inquiry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ icon, title, desc }: any) => (
  <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gold/5 hover:border-gold/20 transition-all group hover:-translate-y-2">
    <div className="mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
    <h4 className="text-xl font-bold text-dark font-serif mb-4">{title}</h4>
    <p className="text-sm text-muted leading-relaxed font-medium">{desc}</p>
  </div>
);

export default Corporate;
