
import React, { useState } from 'react';
import { Shield, Sparkles, Cake, Star, UserCheck, Timer, CheckCircle2, Send, ArrowRight, AlertCircle } from 'lucide-react';
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
      setError('Could not submit inquiry to 16ueg_u4t4d. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-white overflow-hidden">
      <section className="container mx-auto px-4 md:px-6 mb-24 relative">
        <div className="bg-rustic-mint/30 rounded-[3rem] p-12 md:p-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="bg-white text-rustic-green px-4 py-1 rounded-full font-bold text-sm mb-6 inline-block uppercase tracking-wider">Parent Approved</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 italic text-rustic-dark">The Ultimate Kids' Zone</h1>
            <p className="text-xl text-rustic-green leading-relaxed mb-8">
              A 16m² world of supervised wonder. Let your little explorers play while you savor your meal in peace.
            </p>
            <div className="flex gap-4">
              <a href="#birthday-inquiry" className="bg-rustic-orange text-white px-8 py-4 rounded-full font-bold hover:bg-rustic-tan transition-all shadow-lg">
                Book a Birthday
              </a>
            </div>
          </div>
          <div className="flex-1 relative">
            <img 
              src="https://images.unsplash.com/photo-1566415111163-f1118bc00938?auto=format&fit=crop&q=80&w=600" 
              alt="Safe Kids Play Area" 
              className="rounded-3xl shadow-2xl rotate-3 border-8 border-white" 
            />
          </div>
        </div>
      </section>

      <section id="birthday-inquiry" className="py-24 bg-rustic-cream/10 border-t border-rustic-mint/20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-fadeIn">
              <AlertCircle size={20} />
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
            <div className="bg-rustic-dark text-white p-12 md:w-1/3 flex flex-col justify-center">
              <Sparkles className="text-rustic-orange mb-6" size={48} />
              <h3 className="text-3xl font-bold mb-4 italic">Let's Celebrate!</h3>
              <p className="text-rustic-mint/60 text-sm leading-relaxed">
                Fill out our inquiry form and our party coordinator will reach out within 24 hours to help you plan the perfect day.
              </p>
            </div>
            <div className="p-12 md:w-2/3">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                  <div className="w-20 h-20 bg-rustic-mint text-rustic-dark rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 italic text-rustic-dark">Inquiry Sent!</h3>
                  <p className="text-rustic-green mb-8">We'll be in touch soon.</p>
                  <button onClick={() => setIsSuccess(false)} className="text-rustic-orange font-bold underline hover:text-rustic-tan transition-all">Send another inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Parent's Name</label>
                      <input name="name" required type="text" className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange outline-none" placeholder="Full Name" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input name="email" required type="email" className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange outline-none" placeholder="info@kgomos.co.za" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Proposed Date</label>
                      <input name="date" required type="date" className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Approx. No. of Kids</label>
                      <input name="kids_count" required type="number" className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange outline-none" placeholder="e.g. 10" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Preferred Package</label>
                    <select name="package" required className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange outline-none appearance-none">
                      <option>The Mini Chef (R185/pp)</option>
                      <option>The Ultimate Explorer (R250/pp)</option>
                      <option>Bespoke / Custom Theme</option>
                    </select>
                  </div>
                  <button disabled={isSubmitting} type="submit" className="w-full bg-rustic-orange text-white py-5 rounded-xl font-bold text-lg hover:bg-rustic-tan transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                    {isSubmitting ? 'Sending...' : <><Send size={20} /> Submit Inquiry</>}
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

export default Kids;
