
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Bike, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
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
      setError('Failed to send message to 16ueg_u4t4d. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-fadeIn">
              <AlertCircle size={20} />
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 italic text-rustic-dark">Get in Touch</h1>
            <p className="text-xl text-rustic-green">Visit us in the heart of Pretoria East or reach out online.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ContactInfo 
                  icon={<MapPin className="text-rustic-orange" />} 
                  title="Our Location" 
                  lines={['Plot 123, Olympus AH', 'Pretoria East, 0081']} 
                />
                <ContactInfo 
                  icon={<Phone className="text-rustic-orange" />} 
                  title="Phone Us" 
                  lines={[
                    'GM Modisa: 084 292 0000', 
                    'Chef Kgola: 067 740 7650'
                  ]} 
                />
                <ContactInfo 
                  icon={<Mail className="text-rustic-orange" />} 
                  title="Email Us" 
                  lines={['info@kgomos.co.za']} 
                />
                <ContactInfo 
                  icon={<Clock className="text-rustic-orange" />} 
                  title="Hours" 
                  lines={['Mon-Sun: 08:00 - 21:00', 'Public Holidays: 09:00 - 18:00']} 
                />
              </div>

              <div className="bg-rustic-cream/20 p-8 rounded-3xl border border-rustic-mint/30 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-rustic-orange text-white rounded-lg">
                    <Bike size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-rustic-dark italic">Delivery Partners</h3>
                </div>
                <p className="text-rustic-green text-sm mb-6">Can't make it to us? We'll come to you via our trusted delivery partners.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#06C167] text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-lg transition-all">
                    Uber Eats
                  </a>
                  <a href="https://www.mrdfood.com" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#e21a23] text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-lg transition-all">
                    Mr D Food
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-rustic-dark p-10 md:p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rustic-orange opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn relative z-10">
                   <div className="w-20 h-20 bg-rustic-mint text-rustic-dark rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} />
                   </div>
                   <h2 className="text-3xl font-bold mb-4 italic text-rustic-orange">Message Sent!</h2>
                   <p className="text-rustic-mint/80 max-w-xs mx-auto mb-8">
                     Thank you for reaching out. A member of the Kgomo's family will respond within 24 hours.
                   </p>
                   <button onClick={() => setIsSuccess(false)} className="text-rustic-orange font-bold underline hover:text-white transition-colors">
                     Send another message
                   </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-8 italic text-rustic-orange">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-rustic-mint uppercase tracking-widest">Your Name</label>
                        <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-rustic-orange transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-rustic-mint uppercase tracking-widest">Email Address</label>
                        <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-rustic-orange transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-rustic-mint uppercase tracking-widest">Subject</label>
                      <select name="subject" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-rustic-orange transition-colors appearance-none">
                        <option>General Inquiry</option>
                        <option>Corporate Events</option>
                        <option>Kids Birthday Parties</option>
                        <option>Meal Prep Question</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-rustic-mint uppercase tracking-widest">Message</label>
                      <textarea name="message" required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-rustic-orange transition-colors resize-none"></textarea>
                    </div>
                    <button 
                      disabled={isSubmitting}
                      type="submit" 
                      className="w-full bg-rustic-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-rustic-tan transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : <><Send size={20} /> Send Message</>}
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
  <div className="flex gap-4">
    <div className="shrink-0 p-3 bg-rustic-cream/50 rounded-xl h-fit">{icon}</div>
    <div>
      <h3 className="font-bold text-rustic-dark mb-2 italic">{title}</h3>
      {lines.map((l: string, i: number) => (
        <p key={i} className="text-rustic-green text-sm leading-relaxed">{l}</p>
      ))}
    </div>
  </div>
);

export default Contact;
