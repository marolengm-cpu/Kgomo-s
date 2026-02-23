
import React, { useState } from 'react';
import { Shield, Award, Zap, Calculator, Gift, TrendingUp, CheckCircle2, User, Mail, Send, AlertCircle } from 'lucide-react';
import { db } from '../lib/db';

const Loyalty: React.FC = () => {
  const [spend, setSpend] = useState(1000);
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
      monthly_spend_estimate: spend
    };

    try {
      const { error: dbError } = await db.from('loyalty_signups').insert(signupData);
      if (dbError) throw dbError;
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Loyalty sign-up failed:', err);
      setError('We could not register your account in 16ueg_u4t4d. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-[#fdfbf7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-fadeIn">
              <AlertCircle size={20} />
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 italic">Kgomo's Inner Circle</h1>
            <p className="text-xl text-gray-600">Earn 1 point for every R 10 spent. Unlock exclusive perks across three tiers.</p>
          </div>

          <div id="signup" className="mt-24 max-w-2xl mx-auto">
            <div className="bg-rustic-dark p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden text-center">
              {isSuccess ? (
                <div className="animate-fadeIn relative z-10">
                  <div className="w-20 h-20 bg-rustic-mint text-rustic-dark rounded-full flex items-center justify-center mb-8 mx-auto">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 italic text-rustic-orange">Welcome to the Circle!</h3>
                  <button onClick={() => setIsSuccess(false)} className="text-rustic-orange font-bold underline hover:text-white transition-all">Back</button>
                </div>
              ) : (
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4 italic text-rustic-orange">Join the Family</h3>
                  <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-rustic-orange transition-colors" placeholder="Full Name" />
                      <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-rustic-orange transition-colors" placeholder="info@kgomos.co.za" />
                    </div>
                    <button disabled={isSubmitting} type="submit" className="w-full bg-rustic-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-rustic-tan transition-all flex items-center justify-center gap-3">
                      {isSubmitting ? 'Processing...' : <><Send size={20} /> Create My Account</>}
                    </button>
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

export default Loyalty;
