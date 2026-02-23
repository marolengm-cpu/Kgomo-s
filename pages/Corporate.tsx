import React, { useState } from 'react';
import { Users, Briefcase, Camera, MessageSquare, ArrowRight, Quote, Coffee, Home, Truck, UtensilsCrossed, CheckCircle2, AlertCircle } from 'lucide-react';
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
      setError('Failed to request quote from 16ueg_u4t4d. Please try again or contact us via phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-white">
      <section className="container mx-auto px-4 md:px-6 mb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 italic text-rustic-dark leading-tight">Elevated Hosting.</h1>
        <p className="text-xl text-rustic-green max-w-3xl mx-auto mb-12">
          Whether you're hosting at our sophisticated Pretoria East venue or require premium catering at your office or home, Kgomo's delivers artisanal excellence.
        </p>
      </section>

      <section id="inquiry" className="py-24 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-fadeIn text-left">
              <AlertCircle size={20} />
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}
          {isSuccess ? (
            <div className="bg-rustic-cream/20 p-16 rounded-[3rem] animate-fadeIn border border-rustic-mint/30">
               <div className="w-20 h-20 bg-rustic-mint text-rustic-dark rounded-full flex items-center justify-center mb-8 mx-auto">
                  <CheckCircle2 size={40} />
               </div>
               <h2 className="text-4xl font-bold mb-4 text-rustic-dark italic">Inquiry Received!</h2>
               <button onClick={() => setIsSuccess(false)} className="text-rustic-orange font-bold underline">Back</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="company" placeholder="Company Name" required type="text" className="w-full px-6 py-4 rounded-xl border border-rustic-mint bg-rustic-cream/10 outline-none" />
                <input name="email" placeholder="Email" required type="email" className="w-full px-6 py-4 rounded-xl border border-rustic-mint bg-rustic-cream/10 outline-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select name="event_type" className="w-full px-6 py-4 rounded-xl border border-rustic-mint bg-rustic-cream/10 outline-none">
                   <option>On-site Function</option>
                   <option>Office Lunch Delivery</option>
                   <option>Private Dining</option>
                </select>
                <input name="date" required type="date" className="w-full px-6 py-4 rounded-xl border border-rustic-mint bg-rustic-cream/10 outline-none" />
              </div>
              <input name="guests" placeholder="No. of Guests" required type="number" className="w-full px-6 py-4 rounded-xl border border-rustic-mint bg-rustic-cream/10 outline-none" />
              <textarea name="details" rows={4} placeholder="Event details..." className="w-full px-6 py-4 rounded-xl border border-rustic-mint bg-rustic-cream/10 outline-none resize-none"></textarea>
              <button disabled={isSubmitting} type="submit" className="w-full bg-rustic-orange text-white py-5 rounded-xl font-bold text-lg hover:bg-rustic-tan transition-all flex items-center justify-center gap-2">
                {isSubmitting ? 'Sending...' : <>Send Inquiry <ArrowRight size={20} /></>}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Corporate;