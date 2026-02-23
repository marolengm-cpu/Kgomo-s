
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronRight, MapPin, CreditCard, ShieldCheck, Timer, Bike, Utensils, CheckCircle2, Package, Map as MapIcon, RefreshCw, MessageCircle, User, Mail, AlertCircle, Smartphone, Wallet, Zap, QrCode, Split, Coins } from 'lucide-react';
import { CartItem } from '../types';
import { db } from '../lib/db';

interface OrderingProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
}

type PaymentMethod = 'Card' | 'EFT' | 'ApplePay' | 'GooglePay' | 'SnapScan' | 'Zapper' | 'PayJustNow' | 'Crypto';

const Ordering: React.FC<OrderingProps> = ({ cart, addToCart }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [trackingStatus, setTrackingStatus] = useState(0); 
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Card');

  const subtotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const deliveryFee = subtotal > 0 ? 35 : 0;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    db.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        setCustomerEmail(session.user.email || '');
      }
    });

    if (step === 3 && trackingStatus < 3) {
      const timer = setTimeout(() => {
        setTrackingStatus(prev => prev + 1);
        setLastUpdated(new Date());
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [step, trackingStatus]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError("Please login to place an order and track your history.");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      const { data: orderData, error: orderError } = await db
        .from('orders')
        .insert({
          user_id: userId,
          total_amount: total,
          delivery_address: address,
          status: 'Pending',
          payment_method: paymentMethod
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const details = cart.map(item => ({
        order_id: orderData.id,
        menu_item_id: item.menuItemId,
        item_name: item.name,
        quantity: item.quantity,
        price_at_time_of_order: item.price
      }));

      const { error: detailsError } = await db.from('order_details').insert(details);
      if (detailsError) throw detailsError;

      setStep(3);
      setTrackingStatus(0);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while placing your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getArrivalTime = () => {
    if (trackingStatus === 0) return "25-30 mins";
    if (trackingStatus === 1) return "15-20 mins";
    if (trackingStatus === 2) return "5-8 mins";
    return "Delivered";
  };

  if (step === 3) {
    return (
      <div className="pt-24 pb-24 bg-rustic-cream min-h-screen">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col animate-scaleIn">
            <div className="bg-rustic-dark p-10 md:p-14 text-white relative">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-white/10">
                <div 
                  className="h-full bg-rustic-orange transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(215,130,88,0.8)]" 
                  style={{ width: `${(trackingStatus + 1) * 25}%` }}
                ></div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-3 italic text-rustic-orange">Track Your Feast</h1>
                  <div className="flex items-center gap-3 text-rustic-mint/60">
                    <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Live Updates</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-rustic-orange animate-pulse"></span>
                    <span className="text-sm">En Route</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7 space-y-12">
                  <div className="relative pl-10 border-l-2 border-dashed border-gray-100 py-2">
                    <StatusItem active={trackingStatus >= 0} current={trackingStatus === 0} icon={<CheckCircle2 />} title="Order Received" desc={trackingStatus === 0 ? "We've got your order! Our kitchen is getting ready." : "Confirmed and processed."} />
                    <StatusItem active={trackingStatus >= 1} current={trackingStatus === 1} icon={<Utensils />} title="Kitchen Magic" desc={trackingStatus === 1 ? "Chef Kgola is hand-stretching your dough and firing the oven." : "Awaiting the chef's touch."} />
                    <StatusItem active={trackingStatus >= 2} current={trackingStatus === 2} icon={<Bike />} title="On the Road" desc={trackingStatus === 2 ? "Your driver is zooming through Pretoria East. Almost there!" : "Preparing for pickup."} />
                    <StatusItem active={trackingStatus >= 3} current={trackingStatus === 3} icon={<Package />} title="Bon Appétit!" desc={trackingStatus === 3 ? "Your wood-fired feast has been delivered. Enjoy!" : "The best part is yet to come."} />
                  </div>
                </div>
                <div className="lg:col-span-5 space-y-8">
                  <div className="bg-rustic-cream p-10 rounded-[3rem] border border-rustic-mint/40 text-center relative overflow-hidden group">
                    <div className="relative z-10">
                      <span className="text-[10px] font-black text-rustic-green uppercase tracking-[0.4em] mb-4 block">ETA to Your Door</span>
                      <div className="text-7xl font-black text-rustic-dark mb-4 tracking-tighter">
                        {trackingStatus === 3 ? 'Enjoy!' : getArrivalTime().split(' ')[0]}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-rustic-orange font-bold text-sm italic">
                        <Timer size={18} />
                        <span>{trackingStatus === 3 ? 'Order Complete' : getArrivalTime().split(' ')[1] || ''}</span>
                      </div>
                    </div>
                    <MapIcon className="absolute inset-0 w-full h-full text-rustic-dark opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-rustic-cream min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 animate-fadeIn">
          <div className="flex items-center gap-4">
            <StepIndicator step={1} currentStep={step} label="Your Order" />
            <ChevronRight size={20} className="text-gray-300" />
            <StepIndicator step={2} currentStep={step} label="Checkout" />
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-fadeIn">
            <AlertCircle size={20} />
            <span className="font-medium text-sm">{error}</span>
          </div>
        )}

        {cart.length === 0 && step === 1 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center animate-slideUp">
            <div className="p-8 bg-white rounded-full mb-6 shadow-sm border border-rustic-mint/30">
              <ShoppingBag size={80} className="text-rustic-tan opacity-40" />
            </div>
            <h1 className="text-3xl font-bold mb-4 italic text-rustic-dark">Your bag is empty.</h1>
            <p className="text-rustic-green mb-8 max-w-sm mx-auto">Explore our menu and add some artisanal wood-fired goodness to your life.</p>
            <Link to="/menu" className="bg-rustic-orange text-white px-10 py-4 rounded-full font-bold hover:bg-rustic-tan transition-all shadow-lg">View Menu</Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-fadeIn">
            <div className="lg:col-span-2 space-y-8">
              {step === 1 ? (
                <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-100">
                  <h2 className="text-3xl font-bold mb-8 italic text-rustic-dark">Review Your Feast</h2>
                  <div className="divide-y divide-gray-100">
                    {cart.map(item => (
                      <div key={item.id} className="py-6 flex justify-between items-center group">
                        <div className="flex flex-col">
                          <h4 className="font-bold text-lg text-rustic-dark group-hover:text-rustic-orange transition-colors italic">{item.name}</h4>
                          <p className="text-gray-400 text-sm font-medium">Quantity: {item.quantity}</p>
                        </div>
                        <span className="font-black text-rustic-orange text-lg">R {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-rustic-dark italic"><MapPin className="text-rustic-orange" /> Delivery Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1"><User size={12} /> Full Name</label>
                        <input required value={customerName} onChange={e => setCustomerName(e.target.value)} type="text" className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1"><Mail size={12} /> Email Address</label>
                        <input required value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} type="email" className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Street Address</label>
                      <input required value={address} onChange={e => setAddress(e.target.value)} type="text" className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange outline-none" placeholder="Pretoria East Area" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-rustic-dark italic"><Wallet className="text-rustic-orange" /> Payment Method</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <PaymentOption active={paymentMethod === 'Card'} onClick={() => setPaymentMethod('Card')} icon={<CreditCard size={20} />} title="Credit/Debit Card" desc="Safe & Secure" />
                      <PaymentOption active={paymentMethod === 'EFT'} onClick={() => setPaymentMethod('EFT')} icon={<Zap size={20} />} title="Instant EFT" desc="Via OZOW / PayFast" />
                      <PaymentOption active={paymentMethod === 'SnapScan'} onClick={() => setPaymentMethod('SnapScan')} icon={<QrCode size={20} />} title="SnapScan" desc="QR Payment" />
                      <PaymentOption active={paymentMethod === 'Zapper'} onClick={() => setPaymentMethod('Zapper')} icon={<QrCode size={20} />} title="Zapper" desc="Scan to Pay" />
                      <PaymentOption active={paymentMethod === 'ApplePay'} onClick={() => setPaymentMethod('ApplePay')} icon={<Smartphone size={20} />} title="Apple Pay" desc="Fast & Private" />
                      <PaymentOption active={paymentMethod === 'PayJustNow'} onClick={() => setPaymentMethod('PayJustNow')} icon={<Split size={20} />} title="PayJustNow" desc="3x Interest-Free" />
                      <PaymentOption active={paymentMethod === 'Crypto'} onClick={() => setPaymentMethod('Crypto')} icon={<Coins size={20} />} title="Bitcoin" desc="Lightning Network" />
                    </div>

                    <div className="animate-fadeIn p-8 bg-gray-50 rounded-3xl text-center border border-gray-100">
                      <p className="text-rustic-green italic font-medium">Your order will be processed securely for database: 16ueg_u4t4d</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-rustic-dark text-white p-10 rounded-[3rem] shadow-2xl border border-white/5 sticky top-28">
                <h3 className="text-xl font-bold mb-8 italic text-rustic-orange border-b border-white/5 pb-4">Order Summary</h3>
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between text-rustic-mint/60">
                    <span>Subtotal</span>
                    <span>R {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-rustic-mint/60">
                    <span>Delivery Fee</span>
                    <span>R {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-8 border-t border-white/10 flex justify-between font-bold text-4xl">
                    <span>Total</span>
                    <span className="text-rustic-orange font-black italic">R {total.toFixed(2)}</span>
                  </div>
                </div>

                {step === 1 ? (
                  <button type="button" onClick={() => setStep(2)} className="w-full bg-rustic-orange text-white py-5 rounded-2xl font-bold text-lg hover:bg-rustic-tan transition-all">
                    Proceed to Checkout
                  </button>
                ) : (
                  <button disabled={isSubmitting} type="submit" className="w-full bg-rustic-orange text-white py-5 rounded-2xl font-bold text-lg hover:bg-rustic-tan transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                    {isSubmitting ? 'Processing...' : <><ShieldCheck size={20} /> Place Order Now</>}
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const PaymentOption = ({ active, onClick, icon, title, desc }: any) => (
  <button type="button" onClick={onClick} className={`p-6 rounded-3xl border-2 transition-all text-left flex flex-col gap-2 group ${active ? 'border-rustic-orange bg-rustic-orange/5 shadow-md' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
    <div className={`p-2 rounded-xl w-fit ${active ? 'bg-rustic-orange text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>{icon}</div>
    <div>
      <p className={`font-bold text-sm ${active ? 'text-rustic-dark' : 'text-gray-600'}`}>{title}</p>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{desc}</p>
    </div>
  </button>
);

const StatusItem = ({ active, current, icon, title, desc }: any) => (
  <div className="relative mb-12">
    <div className={`absolute -left-[3.15rem] top-0 p-3 rounded-2xl transition-all duration-500 ${active ? 'bg-rustic-orange text-white shadow-xl scale-110' : 'bg-gray-100 text-gray-400'}`}>{React.cloneElement(icon, { size: 24 })}</div>
    <div className={`transition-all duration-500 ${current ? 'scale-105 origin-left' : ''}`}>
      <h3 className={`text-xl font-bold italic mb-1 ${active ? 'text-rustic-dark' : 'text-gray-300'}`}>{title}</h3>
      <p className={`text-sm ${active ? 'text-rustic-green' : 'text-gray-300'}`}>{desc}</p>
    </div>
  </div>
);

const StepIndicator = ({ step, currentStep, label }: any) => (
  <div className={`flex items-center gap-3 font-bold transition-colors ${currentStep === step ? 'text-rustic-orange' : 'text-gray-400'}`}>
    <span className={`w-10 h-10 rounded-2xl border-2 border-current flex items-center justify-center text-sm ${currentStep === step ? 'bg-rustic-orange text-white border-rustic-orange' : ''}`}>{step}</span>
    <span className="text-sm uppercase tracking-widest">{label}</span>
  </div>
);

export default Ordering;
