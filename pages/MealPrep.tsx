import React, { useState } from 'react';
import { ChefHat, Info, Plus, Minus, CheckCircle2, Leaf, Zap, ShieldCheck, Heart, ArrowRight, Package, CreditCard, MapPin } from 'lucide-react';

const MealPrep: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Customizer, 2: Account/Delivery, 3: Success
  const [mealCount, setMealCount] = useState<5 | 10 | 15>(10);
  const [ratio, setRatio] = useState('40/30/30');
  const [portion, setPortion] = useState(500);
  const [dietary, setDietary] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatePrice = () => {
    const basePrices = { 5: 650, 10: 1200, 15: 1700 };
    const portionMultiplier = portion / 500;
    return (basePrices[mealCount] * portionMultiplier).toFixed(2);
  };

  const toggleDietary = (pref: string) => {
    setDietary(prev => prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]);
  };

  const handleInitiateSubscription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStep(3);
    setIsSubmitting(false);
  };

  if (step === 3) {
    return (
      <div className="pt-40 pb-40 flex flex-col items-center justify-center container mx-auto px-4 text-center animate-fadeIn">
        <div className="w-24 h-24 bg-rustic-mint text-rustic-dark rounded-full flex items-center justify-center mb-8 shadow-xl shadow-rustic-mint/20">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-5xl font-bold mb-4 italic text-rustic-dark tracking-tight">Subscription Active!</h1>
        <p className="text-rustic-green max-w-md mx-auto mb-10 text-lg">
          Welcome to the Kgomo's family! Your first batch of {mealCount} chef-prepared meals will arrive this coming Monday.
        </p>
        <div className="bg-white p-8 rounded-[2rem] border border-rustic-mint/30 shadow-sm max-w-sm w-full mb-12">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-rustic-green font-medium">Plan</span>
            <span className="text-rustic-dark font-bold">{mealCount} Meals / Week</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-rustic-green font-medium">Macros</span>
            <span className="text-rustic-dark font-bold">{ratio}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-rustic-green font-medium">Portion</span>
            <span className="text-rustic-dark font-bold">{portion}g</span>
          </div>
          <div className="border-t border-rustic-mint/20 mt-4 pt-4 flex justify-between">
            <span className="text-rustic-green font-bold">Weekly Total</span>
            <span className="text-rustic-orange font-black">R {calculatePrice()}</span>
          </div>
        </div>
        <button onClick={() => setStep(1)} className="text-rustic-orange font-bold underline hover:text-rustic-tan transition-colors">
          Manage your subscription settings
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-rustic-orange font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Launching Month 9</span>
            <h1 className="text-6xl font-bold mb-6 text-rustic-dark italic leading-tight">Artisanal Meal Prep</h1>
            <p className="text-xl text-rustic-green max-w-2xl mx-auto leading-relaxed">
              Chef Kgola's award-winning kitchen, delivered to your door. Fresh, macro-balanced, and locally sourced.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Section */}
            <div className="lg:col-span-8">
              <div className="bg-rustic-cream/10 p-8 md:p-12 rounded-[3rem] border border-rustic-mint/20">
                <form onSubmit={handleInitiateSubscription}>
                  {step === 1 ? (
                    <div className="space-y-10 animate-fadeIn">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-rustic-orange text-white flex items-center justify-center font-bold">1</div>
                        <h2 className="text-3xl font-bold italic text-rustic-dark">Customize Your Plan</h2>
                      </div>

                      {/* Meals per week */}
                      <div>
                        <label className="block text-xs font-bold text-rustic-green uppercase tracking-[0.2em] mb-6">Subscription Size</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[5, 10, 15].map(n => (
                            <button 
                              type="button"
                              key={n}
                              onClick={() => setMealCount(n as any)}
                              className={`group relative p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${
                                mealCount === n ? 'bg-rustic-dark text-white border-rustic-dark shadow-xl' : 'bg-white text-rustic-green border-rustic-mint/50 hover:border-rustic-orange'
                              }`}
                            >
                              <span className="text-2xl font-black">{n}</span>
                              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Meals Per Week</span>
                              {mealCount === n && <CheckCircle2 className="absolute top-4 right-4 text-rustic-orange" size={20} />}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Macros & Portion Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Macros */}
                        <div>
                          <label className="block text-xs font-bold text-rustic-green uppercase tracking-[0.2em] mb-6">Macro Balance (P/C/F)</label>
                          <div className="flex flex-col gap-3">
                            {[
                              { label: 'Performance (40/30/30)', val: '40/30/30' },
                              { label: 'Lean Focus (50/25/25)', val: '50/25/25' },
                              { label: 'Energy (30/35/35)', val: '30/35/35' }
                            ].map(r => (
                              <button 
                                type="button"
                                key={r.val}
                                onClick={() => setRatio(r.val)}
                                className={`px-6 py-4 rounded-2xl font-bold text-sm border-2 text-left transition-all flex items-center justify-between ${
                                  ratio === r.val ? 'border-rustic-orange bg-rustic-orange/5 text-rustic-dark' : 'border-rustic-mint/30 bg-white text-rustic-green'
                                }`}
                              >
                                {r.label}
                                {ratio === r.val && <Zap size={16} className="text-rustic-orange" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Portion Size */}
                        <div>
                          <label className="block text-xs font-bold text-rustic-green uppercase tracking-[0.2em] mb-6">Portion Selector</label>
                          <div className="bg-white border-2 border-rustic-mint/30 rounded-3xl p-8 text-center flex flex-col items-center justify-center">
                            <div className="flex items-center gap-8 mb-4">
                              <button 
                                type="button"
                                onClick={() => setPortion(p => Math.max(400, p - 100))} 
                                className="w-12 h-12 rounded-full bg-rustic-cream/30 flex items-center justify-center text-rustic-orange hover:bg-rustic-orange hover:text-white transition-all"
                              >
                                <Minus size={24} />
                              </button>
                              <div className="flex flex-col">
                                <span className="text-4xl font-black text-rustic-dark">{portion}g</span>
                                <span className="text-[10px] font-bold text-rustic-green uppercase tracking-widest mt-1">Per Meal</span>
                              </div>
                              <button 
                                type="button"
                                onClick={() => setPortion(p => Math.min(700, p + 100))} 
                                className="w-12 h-12 rounded-full bg-rustic-cream/30 flex items-center justify-center text-rustic-orange hover:bg-rustic-orange hover:text-white transition-all"
                              >
                                <Plus size={24} />
                              </button>
                            </div>
                            <p className="text-xs text-rustic-green/60 italic">Standard portion is 500g.</p>
                          </div>
                        </div>
                      </div>

                      {/* Dietary Preferences */}
                      <div>
                        <label className="block text-xs font-bold text-rustic-green uppercase tracking-[0.2em] mb-6">Dietary Accommodations</label>
                        <div className="flex flex-wrap gap-3">
                          {['Keto', 'Vegan', 'Vegetarian', 'Halal', 'Gluten-Free'].map(p => (
                            <button
                              type="button"
                              key={p}
                              onClick={() => toggleDietary(p)}
                              className={`px-6 py-3 rounded-full text-xs font-bold border-2 transition-all flex items-center gap-2 ${
                                dietary.includes(p) ? 'bg-rustic-orange border-rustic-orange text-white' : 'bg-white border-rustic-mint/30 text-rustic-green hover:border-rustic-orange'
                              }`}
                            >
                              {p === 'Vegan' && <Leaf size={14} />}
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button 
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full bg-rustic-dark text-white py-6 rounded-[2rem] font-bold text-xl hover:bg-rustic-tan transition-all shadow-xl flex items-center justify-center gap-3"
                      >
                        Proceed to Delivery <ArrowRight size={24} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-10 animate-fadeIn">
                       <div className="flex items-center gap-3 mb-2">
                        <button type="button" onClick={() => setStep(1)} className="w-10 h-10 rounded-full bg-rustic-mint text-rustic-dark flex items-center justify-center font-bold hover:bg-rustic-tan hover:text-white transition-all">←</button>
                        <h2 className="text-3xl font-bold italic text-rustic-dark">Delivery & Billing</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="block text-xs font-bold text-rustic-green uppercase tracking-[0.2em] flex items-center gap-2"><MapPin size={14} /> Shipping Address</label>
                          <input name="address" type="text" placeholder="Full Address in Pretoria East" className="w-full px-6 py-4 rounded-2xl border-2 border-rustic-mint/20 bg-white focus:border-rustic-orange outline-none" required />
                          <input name="delivery_notes" type="text" placeholder="Special Delivery Notes" className="w-full px-6 py-4 rounded-2xl border-2 border-rustic-mint/20 bg-white focus:border-rustic-orange outline-none" />
                        </div>
                        <div className="space-y-4">
                          <label className="block text-xs font-bold text-rustic-green uppercase tracking-[0.2em] flex items-center gap-2"><CreditCard size={14} /> Account Details</label>
                          <input name="cardholder_name" type="text" placeholder="Full Name" className="w-full px-6 py-4 rounded-2xl border-2 border-rustic-mint/20 bg-white focus:border-rustic-orange outline-none mb-4" required />
                          <input name="email" type="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-2xl border-2 border-rustic-mint/20 bg-white focus:border-rustic-orange outline-none" required />
                        </div>
                      </div>

                      <div className="bg-rustic-orange/5 p-6 rounded-3xl border border-rustic-orange/20">
                        <div className="flex gap-4">
                          <ShieldCheck className="text-rustic-orange shrink-0" />
                          <p className="text-sm text-rustic-green leading-relaxed">
                            Your subscription will be billed weekly on Fridays for Monday delivery. You can pause or cancel at any time through your dashboard.
                          </p>
                        </div>
                      </div>

                      <button 
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-rustic-orange text-white py-6 rounded-[2rem] font-bold text-xl hover:bg-rustic-tan transition-all shadow-xl shadow-rustic-orange/30 flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Processing...' : <>{'Initiate Subscription'} <Heart size={24} /></>}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Price Card & Summary Sidebar */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="bg-rustic-dark text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rustic-orange opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-xl font-bold mb-8 italic text-rustic-orange border-b border-white/5 pb-4">Plan Summary</h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4">
                    <Package className="text-rustic-mint" size={24} />
                    <div>
                      <div className="text-[10px] font-bold text-rustic-tan uppercase tracking-widest">Quantity</div>
                      <div className="text-lg font-bold">{mealCount} Meals / Week</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Zap className="text-rustic-mint" size={24} />
                    <div>
                      <div className="text-[10px] font-bold text-rustic-tan uppercase tracking-widest">Macro Target</div>
                      <div className="text-lg font-bold">{ratio}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <UtensilsIcon className="text-rustic-mint" size={24} />
                    <div>
                      <div className="text-[10px] font-bold text-rustic-tan uppercase tracking-widest">Portion</div>
                      <div className="text-lg font-bold">{portion}g per meal</div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <span className="text-rustic-mint/60 font-medium">Weekly Investment</span>
                  <div className="text-5xl font-black text-rustic-orange mt-2 italic">R {calculatePrice()}</div>
                  <p className="text-[10px] text-rustic-mint/40 mt-3 font-bold uppercase tracking-widest">Free Delivery in Pretoria East</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-rustic-mint/30 shadow-sm space-y-4">
                <FeatureItem text="Chef-prepared in small batches" />
                <FeatureItem text="100% Recyclable packaging" />
                <FeatureItem text="Local Pretoria East sourcing" />
              </div>
            </div>

          </div>

          {/* This Week's Highlights */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-rustic-dark italic">On the Menu This Week</h2>
              <p className="text-rustic-green mt-2">Always fresh, never frozen.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <MealCard 
                title="Lemon Herb Roast Chicken" 
                desc="Roasted sweet potato mash & steamed seasonal greens with a zesty citrus reduction." 
                cals={480} protein={45}
                img="https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600"
              />
              <MealCard 
                title="Grass-Fed Beef Lasagne" 
                desc="Handmade wholewheat pasta sheets layered with lean beef mince ragu and artisanal cheese." 
                cals={550} protein={38}
                img="https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&q=80&w=600"
              />
              <MealCard 
                title="Grilled Halloumi & Grain Bowl" 
                desc="Protein-rich quinoa, toasted pomegranate seeds, and a signature honey-mustard vinaigrette." 
                cals={420} protein={22}
                img="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <CheckCircle2 className="text-rustic-orange shrink-0" size={16} />
    <span className="text-sm text-rustic-dark/80 font-medium">{text}</span>
  </div>
);

const MealCard = ({ title, desc, cals, protein, img }: any) => (
  <div className="bg-white border border-rustic-mint/20 rounded-[2.5rem] overflow-hidden hover:shadow-xl transition-all group">
    <div className="h-56 relative overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute bottom-4 left-4 flex gap-2">
         <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-rustic-dark">Fresh</span>
      </div>
    </div>
    <div className="p-8">
      <h3 className="text-xl font-bold mb-3 text-rustic-dark italic">{title}</h3>
      <p className="text-sm text-rustic-green mb-6 leading-relaxed line-clamp-2">{desc}</p>
      <div className="flex justify-between items-center text-[10px] font-bold text-rustic-orange uppercase tracking-[0.2em] border-t border-rustic-mint/10 pt-6">
        <span>{cals} kcal</span>
        <div className="w-1 h-1 bg-rustic-mint rounded-full"></div>
        <span>{protein}g Protein</span>
      </div>
    </div>
  </div>
);

const UtensilsIcon = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

export default MealPrep;