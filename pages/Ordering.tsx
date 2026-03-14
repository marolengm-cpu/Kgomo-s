import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, ChevronRight, MapPin, CreditCard, ShieldCheck,
  Timer, Bike, Utensils, CheckCircle2, Package, Map as MapIcon,
  MessageCircle, User, Mail, AlertCircle, Smartphone, Wallet,
  Zap, QrCode, Split, Coins, ArrowLeft
} from 'lucide-react';
import { CartItem } from '../types';
import { db } from '../lib/db';

interface OrderingProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
}

type PaymentMethod = 'Card' | 'EFT' | 'ApplePay' | 'GooglePay' | 'SnapScan' | 'Zapper' | 'PayJustNow' | 'Crypto';

const Ordering: React.FC<OrderingProps> = ({ cart }) => {
  const [step, setStep] = useState(1);
  const [trackingStatus, setTrackingStatus] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Card');
  const [orderId, setOrderId] = useState<string | null>(null);

  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await db.auth.getSession();
      setSession(data.session);
      if (data.session?.user) {
        setCustomerName(data.session.user.user_metadata?.full_name || '');
        setCustomerEmail(data.session.user.email || '');
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    if (step === 3) {
      // Simulate tracking progress
      timerRef.current = setInterval(() => {
        setTrackingStatus((prev) => (prev < 4 ? prev + 1 : prev));
      }, 15000); // Progress every 15 seconds
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 35;
  const grandTotal = total + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { data: order, error: orderError } = await db
        .from('orders')
        .insert({
          user_id: session?.user?.id || 'guest-' + Math.random().toString(36).substr(2, 9),
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          address,
          total: grandTotal,
          status: 'pending',
          payment_method: paymentMethod,
          items: cart,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      setOrderId(order.id);
      setStep(3);
    } catch (err: any) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && step < 3) {
    return (
      <div className="pt-32 pb-24 px-4 bg-cream min-h-screen flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-gold/10 rounded-[2rem] flex items-center justify-center mb-8 animate-bounceIn">
          <ShoppingBag size={48} className="text-gold" />
        </div>
        <h1 className="text-4xl font-bold text-dark mb-4 font-serif italic">Your cart is empty</h1>
        <p className="text-muted mb-10 max-w-md font-medium">Looks like you haven't added any of our delicious wood-fired dishes yet.</p>
        <Link 
          to="/menu" 
          className="bg-gold text-dark px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-dark hover:text-white transition-all shadow-2xl"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-16 gap-4 md:gap-12">
          <StepIndicator step={1} current={step} label="Review" />
          <div className={`h-0.5 w-12 md:w-24 transition-all duration-700 ${step > 1 ? 'bg-gold' : 'bg-gold/10'}`} />
          <StepIndicator step={2} current={step} label="Checkout" />
          <div className={`h-0.5 w-12 md:w-24 transition-all duration-700 ${step > 2 ? 'bg-gold' : 'bg-gold/10'}`} />
          <StepIndicator step={3} current={step} label="Tracking" />
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fadeIn">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gold/5">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-bold text-dark font-serif italic flex items-center gap-4">
                    <Utensils className="text-gold" size={28} /> Your Selection
                  </h2>
                  <Link to="/menu" className="text-[10px] font-black uppercase tracking-widest text-gold hover:text-dark transition-colors flex items-center gap-2">
                    Add More <PlusIcon size={14} />
                  </Link>
                </div>
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-6 py-6 border-b border-gold/10 last:border-0 group">
                      <div className="relative overflow-hidden rounded-2xl w-24 h-24 shrink-0 shadow-lg">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-dark mb-1">{item.name}</h3>
                        <p className="text-xs font-black uppercase tracking-widest text-muted">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black text-gold">R {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-dark text-white rounded-[2.5rem] p-10 shadow-2xl sticky top-32 border border-gold/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
                <h2 className="text-2xl font-bold mb-8 font-serif italic text-gold relative z-10">Order Summary</h2>
                <div className="space-y-5 mb-10 relative z-10">
                  <div className="flex justify-between text-white/60 font-medium">
                    <span>Subtotal</span>
                    <span>R {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60 font-medium">
                    <span>Delivery Fee</span>
                    <span>R {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/10 my-6" />
                  <div className="flex justify-between text-2xl font-black text-gold">
                    <span>Total</span>
                    <span>R {grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-gold text-dark py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-3 relative z-10 group"
                >
                  Proceed to Checkout <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handlePlaceOrder} className="max-w-5xl mx-auto animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gold/5">
                  <h2 className="text-2xl font-bold text-dark mb-8 font-serif italic flex items-center gap-4">
                    <User className="text-gold" size={24} /> Delivery Details
                  </h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-muted ml-1">Full Name *</label>
                      <input
                        required
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-cream/30 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold transition-all outline-none font-medium text-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-muted ml-1">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-cream/30 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold transition-all outline-none font-medium text-sm"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-muted ml-1">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-cream/30 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold transition-all outline-none font-medium text-sm"
                        placeholder="08X XXX XXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-muted ml-1">Delivery Address *</label>
                      <textarea
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-cream/30 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold transition-all h-32 resize-none outline-none font-medium text-sm"
                        placeholder="Street, Suburb, City, Postal Code"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gold/5">
                  <h2 className="text-2xl font-bold text-dark mb-8 font-serif italic flex items-center gap-4">
                    <CreditCard className="text-gold" size={24} /> Payment Method
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <PaymentOption 
                      id="Card" 
                      label="Card" 
                      icon={<CreditCard size={20} />} 
                      selected={paymentMethod === 'Card'} 
                      onClick={() => setPaymentMethod('Card')} 
                    />
                    <PaymentOption 
                      id="EFT" 
                      label="Instant EFT" 
                      icon={<Zap size={20} />} 
                      selected={paymentMethod === 'EFT'} 
                      onClick={() => setPaymentMethod('EFT')} 
                    />
                    <PaymentOption 
                      id="SnapScan" 
                      label="SnapScan" 
                      icon={<QrCode size={20} />} 
                      selected={paymentMethod === 'SnapScan'} 
                      onClick={() => setPaymentMethod('SnapScan')} 
                    />
                    <PaymentOption 
                      id="Zapper" 
                      label="Zapper" 
                      icon={<QrCode size={20} />} 
                      selected={paymentMethod === 'Zapper'} 
                      onClick={() => setPaymentMethod('Zapper')} 
                    />
                    <PaymentOption 
                      id="ApplePay" 
                      label="Apple Pay" 
                      icon={<Smartphone size={20} />} 
                      selected={paymentMethod === 'ApplePay'} 
                      onClick={() => setPaymentMethod('ApplePay')} 
                    />
                    <PaymentOption 
                      id="PayJustNow" 
                      label="PayJustNow" 
                      icon={<Split size={20} />} 
                      selected={paymentMethod === 'PayJustNow'} 
                      onClick={() => setPaymentMethod('PayJustNow')} 
                    />
                    <PaymentOption 
                      id="Crypto" 
                      label="Crypto" 
                      icon={<Coins size={20} />} 
                      selected={paymentMethod === 'Crypto'} 
                      onClick={() => setPaymentMethod('Crypto')} 
                    />
                  </div>

                  <div className="mt-10 p-5 bg-green/5 rounded-2xl border border-green/10 flex items-start gap-4">
                    <ShieldCheck className="text-green shrink-0" size={24} />
                    <p className="text-[10px] text-green font-black uppercase tracking-widest leading-relaxed">
                      Your transaction is secured with 256-bit SSL encryption. We do not store your card details.
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="bg-rust/5 text-rust p-5 rounded-2xl flex items-center gap-4 border border-rust/10 animate-shake">
                    <AlertCircle size={24} className="shrink-0" />
                    <p className="text-sm font-bold uppercase tracking-widest">{error}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold text-dark py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-dark hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Complete Order · R {grandTotal.toFixed(2)} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-muted text-[10px] font-black uppercase tracking-[0.2em] hover:text-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={14} /> Back to Review
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-gold/5 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gold/10">
                <div 
                  className="h-full bg-gold transition-all duration-1000 ease-out" 
                  style={{ width: `${(trackingStatus + 1) * 25}%` }}
                />
              </div>

              <div className="text-center mb-16">
                <div className="w-24 h-24 bg-green/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 animate-bounceIn">
                  <CheckCircle2 size={48} className="text-green" />
                </div>
                <h2 className="text-5xl font-bold text-dark mb-4 font-serif italic">Order Confirmed!</h2>
                <p className="text-muted font-medium">Order ID: <span className="text-dark font-mono font-bold tracking-widest">#{orderId?.slice(0, 8).toUpperCase()}</span></p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <h3 className="text-2xl font-bold text-dark font-serif italic border-b border-gold/10 pb-6">Live Tracking</h3>
                  <div className="space-y-10 relative">
                    <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-gold/10" />
                    <StatusItem 
                      icon={<Utensils size={20} />} 
                      label="Preparing your meal" 
                      active={trackingStatus >= 0} 
                      completed={trackingStatus > 0} 
                    />
                    <StatusItem 
                      icon={<Package size={20} />} 
                      label="Quality check & packing" 
                      active={trackingStatus >= 1} 
                      completed={trackingStatus > 1} 
                    />
                    <StatusItem 
                      icon={<Bike size={20} />} 
                      label="Out for delivery" 
                      active={trackingStatus >= 2} 
                      completed={trackingStatus > 2} 
                    />
                    <StatusItem 
                      icon={<MapPin size={20} />} 
                      label="Arrived at destination" 
                      active={trackingStatus >= 3} 
                      completed={trackingStatus > 3} 
                    />
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="bg-cream/50 rounded-[2.5rem] p-10 border border-gold/5 shadow-inner">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
                          <Timer className="text-gold" size={24} />
                        </div>
                        <span className="font-bold text-dark font-serif text-lg">Estimated Arrival</span>
                      </div>
                      <span className="text-3xl font-black text-gold">25-35 min</span>
                    </div>
                    <div className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-xl border border-gold/5">
                      <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                        <Bike className="text-gold" size={28} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-1">Your Courier</p>
                        <p className="font-bold text-dark text-lg">Thabo M. · 4.9★</p>
                      </div>
                      <button className="p-4 bg-cream rounded-2xl hover:bg-gold hover:text-dark transition-all shadow-sm">
                        <MessageCircle size={22} />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <button 
                      onClick={() => navigate('/')}
                      className="flex-1 border-2 border-gold text-gold py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gold hover:text-dark transition-all shadow-xl"
                    >
                      Home
                    </button>
                    <button 
                      onClick={() => navigate('/orders')}
                      className="flex-1 bg-dark text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gold hover:text-dark transition-all shadow-2xl"
                    >
                      View History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StepIndicator = ({ step, current, label }: { step: number; current: number; label: string }) => (
  <div className="flex flex-col items-center gap-3 group">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-700 ${
      current >= step ? 'bg-gold text-dark shadow-2xl shadow-gold/20 scale-110' : 'bg-gold/10 text-gold/40'
    }`}>
      {current > step ? <CheckCircle2 size={24} /> : step}
    </div>
    <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-700 ${current >= step ? 'text-dark' : 'text-muted'}`}>
      {label}
    </span>
  </div>
);

const PaymentOption = ({ id, label, icon, selected, onClick }: any) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border-2 transition-all group ${
      selected 
        ? 'border-gold bg-gold/5 text-gold shadow-xl' 
        : 'border-gold/10 text-muted hover:border-gold/30 hover:bg-gold/5'
    }`}
  >
    <div className={`transition-transform duration-500 ${selected ? 'scale-110' : 'group-hover:scale-110'}`}>
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
  </button>
);

const StatusItem = ({ icon, label, active, completed }: any) => (
  <div className={`flex items-center gap-6 transition-all duration-700 ${active ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-6'}`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-700 ${
      completed ? 'bg-green text-white shadow-xl shadow-green/10' : active ? 'bg-gold text-dark animate-pulse shadow-2xl shadow-gold/20' : 'bg-gold/10 text-gold/40'
    }`}>
      {completed ? <CheckCircle2 size={22} /> : icon}
    </div>
    <span className={`text-lg font-bold transition-colors duration-700 font-serif italic ${active ? 'text-dark' : 'text-muted'}`}>
      {label}
    </span>
  </div>
);

const PlusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default Ordering;
