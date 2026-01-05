
import React, { useState } from 'react';
import { Shield, Award, Zap, Calculator, Gift, TrendingUp } from 'lucide-react';

const Loyalty: React.FC = () => {
  const [spend, setSpend] = useState(1000);

  return (
    <div className="pt-24 pb-24 bg-[#fdfbf7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 italic">Kgomo's Inner Circle</h1>
            <p className="text-xl text-gray-600">Earn 1 point for every R 10 spent. Unlock exclusive perks across three tiers.</p>
          </div>

          {/* Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <TierCard 
              name="Silver" 
              points="0 - 500" 
              color="bg-gray-100" 
              icon={<Shield className="text-gray-400" size={40} />}
              perks={['5% off birthday bookings', 'Monthly newsletter offers', 'Member-only events']}
            />
            <TierCard 
              name="Gold" 
              points="501 - 2000" 
              color="bg-amber-100" 
              icon={<Award className="text-amber-500" size={40} />}
              perks={['Priority table booking', 'Free coffee with every meal', '10% off meal prep subs']}
              highlight={true}
            />
            <TierCard 
              name="Platinum" 
              points="2000+" 
              color="bg-slate-800 text-white" 
              icon={<Zap className="text-amber-300" size={40} />}
              perks={['VIP events & tastings', 'Free kids play pass', 'Unlimited 10% dining discount']}
            />
          </div>

          {/* Calculator */}
          <div className="bg-white p-12 rounded-[3rem] shadow-xl flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="text-[#d97706]" /> Rewards Calculator
              </h2>
              <p className="text-gray-500 mb-8">Move the slider to see how many points and what tier you'll earn with your average monthly spend.</p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between font-bold mb-4">
                    <span>Monthly Spend</span>
                    <span className="text-[#d97706]">R {spend}</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="10000" 
                    step="100" 
                    value={spend} 
                    onChange={(e) => setSpend(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 w-full bg-[#fdfbf7] p-8 rounded-3xl border border-gray-100 text-center">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 block">Your Result</span>
              <div className="text-5xl font-black text-[#d97706] mb-2">{Math.floor(spend / 10)}</div>
              <p className="font-bold text-[#3d2b1f] mb-6">Points Per Month</p>
              <div className="flex items-center justify-center gap-2 py-3 px-6 bg-white rounded-full shadow-sm">
                <TrendingUp size={16} className="text-green-500" />
                <span className="font-bold">Estimated Tier: <span className="text-[#d97706]">{spend < 5000 ? 'Silver' : spend < 20000 ? 'Gold' : 'Platinum'}</span></span>
              </div>
            </div>
          </div>

          {/* Registration CTA */}
          <div className="mt-24 text-center">
            <h3 className="text-3xl font-bold mb-8">Ready to join the family?</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-[#3d2b1f] text-white px-10 py-4 rounded-full font-bold hover:shadow-xl transition-all">
                Create My Account
              </button>
              <button className="bg-white text-[#3d2b1f] px-10 py-4 rounded-full font-bold border-2 border-gray-100 hover:border-gray-300 transition-all">
                Login to Portal
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-400">Join by Month 4 for a special "Founder Member" badge and 50 bonus points.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TierCard = ({ name, points, color, icon, perks, highlight }: any) => (
  <div className={`${color} p-10 rounded-[2rem] ${highlight ? 'shadow-2xl md:scale-105 relative z-10 border-2 border-[#d97706]' : 'border border-gray-200'}`}>
    <div className="mb-8">{icon}</div>
    <h3 className="text-2xl font-bold mb-1 italic">{name} Tier</h3>
    <p className="text-sm opacity-60 font-bold mb-8 uppercase tracking-widest">{points} Points</p>
    <ul className="space-y-4">
      {perks.map((p: string, i: number) => (
        <li key={i} className="flex items-start gap-3">
          <Gift size={16} className="shrink-0 mt-1 opacity-60" />
          <span className="text-sm font-medium">{p}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Loyalty;
