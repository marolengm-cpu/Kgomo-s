import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, Bike, 
  ExternalLink, CheckCircle2, AlertCircle, ChevronRight,
  Instagram, Facebook, MessageSquare
} from 'lucide-react';
import { db } from '../lib/db';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const inquiryData = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      const { error: dbError } = await db.from('contact_inquiries').insert(inquiryData);
      if (dbError) throw dbError;
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Contact submission failed:', err);
      setError('We were unable to send your message. Please try calling us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          
          <div className="text-center mb-20">
            <span className="text-gold text-[10px] font-bold uppercase tracking-[6px] mb-4 block">Olympus AH · Pretoria East</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-dark font-serif leading-tight">Get in <em className="text-gold italic font-normal">Touch</em></h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed font-medium">
              Visit us in the heart of Pretoria East or reach out online for inquiries, bookings, and feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Info Section */}
            <div className="lg:col-span-7 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ContactInfo 
                  icon={<MapPin className="text-gold" size={24} />} 
                  title="Our Location" 
                  lines={['Plot 123, Olympus AH', 'Pretoria East, 0081']} 
                />
                <ContactInfo 
                  icon={<Phone className="text-gold" size={24} />} 
                  title="Phone Us" 
                  lines={[
                    'GM Modisa: 084 292 0000', 
                    'Chef Kgola: 067 740 7650'
                  ]} 
                />
                <ContactInfo 
                  icon={<Mail className="text-gold" size={24} />} 
                  title="Email Us" 
                  lines={['info@kgomos.co.za']} 
                />
                <ContactInfo 
                  icon={<Clock className="text-gold" size={24} />} 
                  title="Hours" 
                  lines={['Mon-Sun: 08:00 - 21:00', 'Public Holidays: 09:00 - 18:00']} 
                />
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gold/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gold/10 text-gold rounded-2xl flex items-center justify-center">
                    <Bike size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-dark font-serif italic">Delivery Partners</h3>
                </div>
                <p className="text-muted text-sm mb-10 font-medium leading-relaxed">Can't make it to us? We'll come to you via our trusted delivery partners. Order your favorites directly to your door.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer" className="bg-dark text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-gold hover:text-dark transition-all shadow-xl group">
                    Uber Eats <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  <a href="https://www.mrdfood.com" target="_blank" rel="noopener noreferrer" className="bg-cream text-dark border border-gold/20 px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:border-gold transition-all shadow-sm group">
                    Mr D Food <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 pt-8">
                <a href="#" className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-dark hover:text-gold transition-all hover:-translate-y-1">
                  <Instagram size={24} />
                </a>
                <a href="#" className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-dark hover:text-gold transition-all hover:-translate-y-1">
                  <Facebook size={24} />
                </a>
                <a href="#" className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-dark hover:text-gold transition-all hover:-translate-y-1">
                  <MessageSquare size={24} />
                </a>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-5 bg-dark p-10 md:p-12 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border border-gold/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn relative z-10 py-12">
                   <div className="w-24 h-24 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-8 shadow-xl shadow-gold/5 animate-bounceIn">
                      <CheckCircle2 size={48} />
                   </div>
                   <h2 className="text-3xl font-bold mb-4 font-serif text-gold italic">Message Sent!</h2>
                   <p className="text-white/60 max-w-xs mx-auto mb-10 text-sm leading-relaxed font-medium">
                     Thank you for reaching out. A member of the Kgomo's family will respond within 24 hours.
                   </p>
                   <button 
                    onClick={() => setIsSuccess(false)} 
                    className="bg-gold text-dark px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-xl"
                   >
                     Send another message
                   </button>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <span className="text-gold text-[10px] font-bold uppercase tracking-[4px] mb-4 block">Contact Form</span>
                    <h2 className="text-3xl font-bold mb-2 font-serif italic text-white">Send a Message</h2>
                    <div className="w-12 h-0.5 bg-gold mt-6"></div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gold uppercase tracking-widest ml-1">Your Name</label>
                      <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-gold transition-colors text-sm font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gold uppercase tracking-widest ml-1">Email Address</label>
                      <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-gold transition-colors text-sm font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gold uppercase tracking-widest ml-1">Subject</label>
                      <div className="relative">
                        <select name="subject" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-gold transition-colors appearance-none text-sm font-medium">
                          <option className="bg-dark">General Inquiry</option>
                          <option className="bg-dark">Corporate Events</option>
                          <option className="bg-dark">Kids Birthday Parties</option>
                          <option className="bg-dark">Meal Prep Question</option>
                          <option className="bg-dark">Feedback</option>
                        </select>
                        <ChevronRight size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-gold rotate-90" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gold uppercase tracking-widest ml-1">Message</label>
                      <textarea name="message" required rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-gold transition-colors resize-none text-sm font-medium"></textarea>
                    </div>
                    <button 
                      disabled={isSubmitting}
                      type="submit" 
                      className="w-full bg-gold text-dark py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-gold/10 group"
                    >
                      {isSubmitting ? 'Sending...' : <><Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Send Message</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfo = ({ icon, title, lines }: any) => (
  <div className="flex gap-6 group">
    <div className="shrink-0 w-16 h-16 bg-white border border-gold/10 rounded-[1.25rem] flex items-center justify-center shadow-lg group-hover:border-gold/30 transition-all group-hover:-translate-y-1">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-dark mb-2 font-serif italic text-xl">{title}</h3>
      {lines.map((l: string, i: number) => (
        <p key={i} className="text-muted text-sm leading-relaxed font-medium">{l}</p>
      ))}
    </div>
  </div>
);

export default Contact;
