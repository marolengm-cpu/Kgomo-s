import React, { useState, useMemo } from 'react';
import {
  ChefHat, Plus, Minus, CheckCircle2, Leaf, Zap,
  ShieldCheck, Heart, ArrowRight, Package, CreditCard, MapPin,
  Star, Timer, Download, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/db';

// Custom Utensils Icon
const UtensilsIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

const MealPrep: React.FC = () => {
  const [step, setStep] = useState(1);
  const [mealCount, setMealCount] = useState<5 | 10 | 15>(10);
  const [ratio, setRatio] = useState('40/30/30');
  const [portion, setPortion] = useState(500);
  const [dietary, setDietary] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const weeklyTotal = useMemo(() => {
    const basePrices = { 5: 650, 10: 1200, 15: 1700 };
    const portionMultiplier = portion / 500;
    return (basePrices[mealCount] * portionMultiplier).toFixed(2);
  }, [mealCount, portion]);

  const toggleDietary = (pref: string) => {
    setDietary((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const validateStep1 = () => {
    return true; // Step 1 always has defaults
  };

  const validateStep2 = (formData: FormData) => {
    const errors: Record<string, string> = {};
    const address = formData.get('address') as string;
    const name = formData.get('cardholder_name') as string;
    const email = formData.get('email') as string;

    if (!address || address.length < 10) {
      errors.address = 'Please provide a full delivery address (min 10 characters)';
    }
    if (!name || name.length < 3) {
      errors.cardholder_name = 'Please enter your full name';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInitiateSubscription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (!validateStep2(formData)) return;

    setIsSubmitting(true);
    setError(null);

    const subscriptionData = {
      address: formData.get('address'),
      delivery_notes: formData.get('delivery_notes'),
      cardholder_name: formData.get('cardholder_name'),
      email: formData.get('email'),
      meal_count: mealCount,
      macro_ratio: ratio,
      portion_size: portion,
      dietary_preferences: dietary.join(', '),
      weekly_total: parseFloat(weeklyTotal),
      status: 'active',
      created_at: new Date().toISOString(),
    };

    try {
      const { error: dbError } = await db.from('meal_prep_subscriptions').insert(subscriptionData);
      if (dbError) throw dbError;
      
      // Premium transition delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Subscription error:', err);
      setError('Could not create your subscription. Please try again or call 084 292 0000.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadSummary = () => {
    const content = `
      KGOMO'S ARTISANAL MEAL PREP
      ---------------------------
      Plan: ${mealCount} Meals / Week
      Macros: ${ratio}
      Portion: ${portion}g
      Dietary: ${dietary.join(', ') || 'None'}
      Weekly Total: R ${weeklyTotal}
      
      Delivery: Every Monday
      Billing: Every Friday
      ---------------------------
      Thank you for choosing Kgomo's.
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kgomos-meal-prep-plan.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Success View ─────────────────────────────────────────────────────────────
  if (step === 3) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-40 pb-40 flex flex-col items-center justify-center container mx-auto px-4 text-center bg-cream min-h-screen"
      >
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          className="w-28 h-28 bg-gold/10 text-gold rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl shadow-gold/10 border border-gold/20"
        >
          <CheckCircle2 size={56} />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 font-serif text-dark tracking-tight italic"
        >
          Subscription <span className="text-gold not-italic">Confirmed.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted max-w-lg mx-auto mb-12 text-lg font-medium leading-relaxed"
        >
          Welcome to the Kgomo's inner circle. Your artisanal, macro-balanced meals are being scheduled for our next fresh batch.
        </motion.p>

        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-12 rounded-[3.5rem] border border-gold/10 shadow-[0_32px_64px_-16px_rgba(196,150,58,0.15)] max-w-md w-full mb-12 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gold opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-110 duration-700"></div>
          <div className="space-y-6 relative z-10">
            <SummaryItem label="Weekly Plan" value={`${mealCount} Meals`} />
            <SummaryItem label="Macro Ratio" value={ratio} />
            <SummaryItem label="Portion Size" value={`${portion}g`} />
            <div className="border-t border-gold/10 mt-8 pt-8 flex justify-between items-center">
              <div className="text-left">
                <span className="text-muted font-black uppercase tracking-[0.2em] text-[10px] block mb-1">Weekly Investment</span>
                <span className="text-gold font-bold text-4xl font-serif">R {weeklyTotal}</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gold/5 flex items-center justify-center">
                <ShieldCheck size={24} className="text-gold" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => { setStep(1); setError(null); }}
            className="bg-dark text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-gold hover:text-dark transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
          >
            Manage Subscription
          </button>
          <button
            onClick={downloadSummary}
            className="bg-white text-dark border border-gold/20 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-cream transition-all shadow-xl flex items-center gap-3 hover:-translate-y-1 active:translate-y-0"
          >
            <Download size={16} /> Download Plan
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Kgomo's Meal Prep",
                  text: `I just subscribed to Kgomo's Artisanal Meal Prep! ${mealCount} meals a week.`,
                  url: window.location.href
                }).catch(console.error);
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="bg-white text-dark border border-gold/20 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-cream transition-all shadow-xl flex items-center gap-3 hover:-translate-y-1 active:translate-y-0"
          >
            <Share2 size={16} /> Share
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <a 
            href="/"
            className="text-muted hover:text-gold font-bold text-[10px] uppercase tracking-[0.4em] transition-colors flex items-center gap-2"
          >
            <ArrowRight size={14} className="rotate-180" /> Back to Home
          </a>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <span className="text-gold text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">
              Artisanal Heritage Cuisine
            </span>
            <h1 className="text-5xl md:text-8xl font-bold mb-6 text-dark font-serif leading-tight tracking-tight">
              Artisanal <em className="text-gold italic font-normal">Meal Prep</em>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed font-medium">
              Chef Kgola's award-winning kitchen, delivered to your door. Fresh, macro-balanced,
              and locally sourced for the modern lifestyle.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-600 shadow-sm overflow-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <span className="font-bold text-sm tracking-tight">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-8">
              <motion.div 
                layout
                className="bg-white p-8 md:p-14 rounded-[3.5rem] border border-gold/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-gold opacity-[0.02] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <form onSubmit={handleInitiateSubscription} className="relative z-10">
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-14"
                      >
                        <div className="flex items-center gap-5 mb-2">
                          <div className="w-14 h-14 rounded-[1.25rem] bg-gold text-dark flex items-center justify-center font-black text-[10px] tracking-widest shadow-xl shadow-gold/20">
                            01
                          </div>
                          <h2 className="text-4xl font-bold italic text-dark font-serif">
                            Customize Your Plan
                          </h2>
                        </div>

                        {/* Meal count */}
                        <div>
                          <label className="block text-[10px] font-black text-muted uppercase tracking-[0.4em] mb-8 ml-1">
                            Subscription Size
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {([5, 10, 15] as const).map((n) => (
                              <button
                                type="button"
                                key={n}
                                onClick={() => setMealCount(n)}
                                className={`group relative p-10 rounded-[2.5rem] border transition-all duration-500 flex flex-col items-center gap-3 ${
                                  mealCount === n
                                    ? 'bg-dark text-white border-dark shadow-2xl scale-[1.05]'
                                    : 'bg-cream/30 text-dark border-gold/10 hover:border-gold/30 hover:bg-cream/50'
                                }`}
                              >
                                <span className="text-5xl font-bold font-serif">{n}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                                  Meals Per Week
                                </span>
                                {mealCount === n && (
                                  <motion.div 
                                    layoutId="check-count"
                                    className="absolute top-6 right-6 text-gold"
                                  >
                                    <CheckCircle2 size={20} />
                                  </motion.div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Macros & Portion */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
                          <div>
                            <label className="block text-[10px] font-black text-muted uppercase tracking-[0.4em] mb-8 ml-1">
                              Macro Balance (P/C/F)
                            </label>
                            <div className="flex flex-col gap-4">
                              {[
                                { label: 'Performance (40/30/30)', val: '40/30/30' },
                                { label: 'Lean Focus (50/25/25)', val: '50/25/25' },
                                { label: 'Energy (30/35/35)', val: '30/35/35' },
                              ].map((r) => (
                                <button
                                  type="button"
                                  key={r.val}
                                  onClick={() => setRatio(r.val)}
                                  className={`px-8 py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest border text-left transition-all duration-300 flex items-center justify-between group ${
                                    ratio === r.val
                                      ? 'border-gold bg-gold/5 text-dark shadow-lg shadow-gold/5'
                                      : 'border-gold/10 bg-cream/30 text-muted hover:border-gold/30'
                                  }`}
                                >
                                  {r.label}
                                  {ratio === r.val ? (
                                    <Zap size={16} className="text-gold animate-pulse" />
                                  ) : (
                                    <Zap size={16} className="text-gold/20 group-hover:text-gold/40 transition-colors" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-black text-muted uppercase tracking-[0.4em] mb-8 ml-1">
                              Portion Selector
                            </label>
                            <div className="bg-cream/50 border border-gold/10 rounded-[2.5rem] p-10 text-center flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                              <div className="flex items-center gap-10 mb-6 relative z-10">
                                <button
                                  type="button"
                                  onClick={() => setPortion((p) => Math.max(400, p - 100))}
                                  className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all hover:-translate-y-1 active:translate-y-0"
                                >
                                  <Minus size={24} />
                                </button>
                                <div className="flex flex-col">
                                  <motion.span 
                                    key={portion}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-5xl font-bold text-dark font-serif"
                                  >
                                    {portion}g
                                  </motion.span>
                                  <span className="text-[10px] font-black text-muted uppercase tracking-widest mt-2">
                                    Per Meal
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setPortion((p) => Math.min(700, p + 100))}
                                  className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all hover:-translate-y-1 active:translate-y-0"
                                >
                                  <Plus size={24} />
                                </button>
                              </div>
                              <p className="text-[10px] text-muted font-bold uppercase tracking-widest italic relative z-10">Standard is 500g.</p>
                            </div>
                          </div>
                        </div>

                        {/* Dietary */}
                        <div>
                          <label className="block text-[10px] font-black text-muted uppercase tracking-[0.4em] mb-8 ml-1">
                            Dietary Accommodations
                          </label>
                          <div className="flex flex-wrap gap-4">
                            {['Keto', 'Vegan', 'Vegetarian', 'Halal', 'Gluten-Free'].map((p) => (
                              <button
                                type="button"
                                key={p}
                                onClick={() => toggleDietary(p)}
                                className={`px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 flex items-center gap-3 ${
                                  dietary.includes(p)
                                    ? 'bg-gold border-gold text-dark shadow-lg shadow-gold/10'
                                    : 'bg-cream/30 border-gold/10 text-muted hover:border-gold/30'
                                }`}
                              >
                                {p === 'Vegan' && <Leaf size={16} />}
                                {p}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (validateStep1()) {
                              setStep(2);
                              window.scrollTo({ top: 200, behavior: 'smooth' });
                            }
                          }}
                          className="w-full bg-dark text-white py-7 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-gold hover:text-dark transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center gap-4 group"
                        >
                          Proceed to Delivery <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-14"
                      >
                        <div className="flex items-center gap-5 mb-2">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center font-bold hover:bg-gold hover:text-dark transition-all shadow-lg shadow-gold/5"
                          >
                            ←
                          </button>
                          <h2 className="text-4xl font-bold italic text-dark font-serif">
                            Delivery & Billing
                          </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-6">
                            <label className="block text-[10px] font-black text-muted uppercase tracking-[0.4em] flex items-center gap-3 ml-1">
                              <MapPin size={16} className="text-gold" /> Shipping Address
                            </label>
                            <div className="space-y-4">
                              <input
                                name="address"
                                type="text"
                                placeholder="Full Address in Pretoria East"
                                className={`w-full px-8 py-5 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none text-sm font-medium transition-all ${formErrors.address ? 'ring-2 ring-red-400' : ''}`}
                                required
                              />
                              {formErrors.address && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{formErrors.address}</p>}
                              <input
                                name="delivery_notes"
                                type="text"
                                placeholder="Special Delivery Notes (optional)"
                                className="w-full px-8 py-5 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none text-sm font-medium transition-all"
                              />
                            </div>
                          </div>
                          <div className="space-y-6">
                            <label className="block text-[10px] font-black text-muted uppercase tracking-[0.4em] flex items-center gap-3 ml-1">
                              <CreditCard size={16} className="text-gold" /> Account Details
                            </label>
                            <div className="space-y-4">
                              <input
                                name="cardholder_name"
                                type="text"
                                placeholder="Full Name"
                                className={`w-full px-8 py-5 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none text-sm font-medium transition-all ${formErrors.cardholder_name ? 'ring-2 ring-red-400' : ''}`}
                                required
                              />
                              <input
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                className={`w-full px-8 py-5 rounded-2xl bg-cream/30 border-0 focus:ring-2 focus:ring-gold outline-none text-sm font-medium transition-all ${formErrors.email ? 'ring-2 ring-red-400' : ''}`}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-gold/5 p-10 rounded-[2.5rem] border border-gold/10 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gold opacity-[0.05] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                          <div className="flex gap-6 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                              <ShieldCheck className="text-gold" size={24} />
                            </div>
                            <p className="text-sm text-muted leading-relaxed font-medium">
                              Your subscription will be billed weekly on Fridays for Monday delivery.
                              You can pause or cancel at any time through your dashboard. We use bank-grade encryption for all transactions.
                            </p>
                          </div>
                        </div>

                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="w-full bg-gold text-dark py-7 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-dark hover:text-white transition-all shadow-[0_20px_40px_-10px_rgba(196,150,58,0.3)] flex items-center justify-center gap-4 disabled:opacity-50 group"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-3">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full"
                              />
                              Processing...
                            </div>
                          ) : (
                            <>Initiate Subscription <Heart size={20} className="group-hover:scale-125 transition-transform" /></>
                          )}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 sticky top-32 space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-dark text-white p-12 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden border border-gold/10"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold opacity-[0.05] rounded-full -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-[10px] font-black mb-12 uppercase tracking-[0.5em] text-gold border-b border-white/5 pb-6">
                  Plan Summary
                </h3>
                <div className="space-y-10 mb-14">
                  <SummaryRow icon={<Package className="text-gold" size={22} />} label="Quantity" value={`${mealCount} Meals / Week`} />
                  <SummaryRow icon={<Zap className="text-gold" size={22} />} label="Macro Target" value={ratio} />
                  <SummaryRow icon={<UtensilsIcon className="text-gold" size={22} />} label="Portion" value={`${portion}g per meal`} />
                </div>
                <div className="pt-10 border-t border-white/10">
                  <span className="text-muted font-black uppercase tracking-[0.3em] text-[10px]">Weekly Investment</span>
                  <div className="text-6xl font-bold text-gold mt-3 font-serif tracking-tight">
                    R {weeklyTotal}
                  </div>
                  <p className="text-[10px] text-muted mt-6 font-black uppercase tracking-widest flex items-center gap-3">
                    <Star size={12} className="text-gold" /> Free Delivery in Pretoria East
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-12 rounded-[3rem] shadow-xl border border-gold/5 space-y-8"
              >
                <FeatureItem text="Chef-prepared in small batches" />
                <FeatureItem text="100% Recyclable packaging" />
                <FeatureItem text="Local Pretoria East sourcing" />
              </motion.div>
            </div>
          </div>

          {/* Meal Highlights */}
          <div className="mt-48">
            <div className="text-center mb-20">
              <span className="text-gold text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block">Seasonal Selection</span>
              <h2 className="text-5xl md:text-6xl font-bold text-dark font-serif italic tracking-tight">On the Menu This Week</h2>
              <div className="w-20 h-0.5 bg-gold mx-auto mt-8 opacity-30"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <MealCard
                title="Lemon Herb Roast Chicken"
                desc="Roasted sweet potato mash & steamed seasonal greens with a zesty citrus reduction."
                cals={480}
                protein={45}
                img="https://images.unsplash.com/photo-1598514982901-e8f80e60f7f7?w=600&auto=format&fit=crop"
              />
              <MealCard
                title="Grass-Fed Beef Lasagne"
                desc="Handmade wholewheat pasta sheets layered with lean beef mince ragu and artisanal cheese."
                cals={550}
                protein={38}
                img="https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?w=600&auto=format&fit=crop"
              />
              <MealCard
                title="Grilled Halloumi & Grain Bowl"
                desc="Protein-rich quinoa, toasted pomegranate seeds, and a signature honey-mustard vinaigrette."
                cals={420}
                protein={22}
                img="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center group">
    <span className="text-muted font-black uppercase tracking-[0.3em] text-[10px] group-hover:text-gold transition-colors">{label}</span>
    <span className="text-dark font-bold font-serif text-xl">{value}</span>
  </div>
);

const SummaryRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center gap-6 group">
    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-all group-hover:scale-110">
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-black text-muted uppercase tracking-widest mb-1.5">{label}</div>
      <div className="text-xl font-bold font-serif tracking-tight">{value}</div>
    </div>
  </div>
);

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-5 group cursor-default">
    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold transition-all duration-500 group-hover:rotate-[360deg]">
      <CheckCircle2 className="text-gold group-hover:text-dark transition-colors" size={18} />
    </div>
    <span className="text-base text-dark font-medium group-hover:text-gold transition-colors">{text}</span>
  </div>
);

const MealCard = ({ title, desc, cals, protein, img }: any) => (
  <motion.div 
    whileHover={{ y: -15 }}
    className="bg-white border border-gold/5 rounded-[3rem] overflow-hidden shadow-xl hover:shadow-[0_40px_80px_-20px_rgba(196,150,58,0.2)] transition-all group"
  >
    <div className="h-72 relative overflow-hidden">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute top-8 left-8">
        <span className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-dark shadow-2xl">
          Fresh Batch
        </span>
      </div>
    </div>
    <div className="p-12">
      <h3 className="text-3xl font-bold mb-5 text-dark font-serif italic tracking-tight">{title}</h3>
      <p className="text-base text-muted mb-10 leading-relaxed font-medium line-clamp-2">{desc}</p>
      <div className="flex justify-between items-center text-[10px] font-black text-gold uppercase tracking-[0.3em] border-t border-gold/5 pt-10">
        <div className="flex items-center gap-3 group/stat">
          <Timer size={16} className="group-hover/stat:rotate-12 transition-transform" />
          <span>{cals} kcal</span>
        </div>
        <div className="w-2 h-2 bg-gold/20 rounded-full" />
        <div className="flex items-center gap-3 group/stat">
          <Star size={16} className="group-hover/stat:scale-125 transition-transform" />
          <span>{protein}g Protein</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default MealPrep;
