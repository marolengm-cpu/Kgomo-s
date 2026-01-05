import React, { useState, useEffect, useRef } from 'react';
/* Added missing Link import */
import { Link } from 'react-router-dom';
/* Added missing Phone icon import */
import { ShoppingBag, ChevronRight, MapPin, CreditCard, ShieldCheck, Timer, ExternalLink, Bike, Utensils, CheckCircle2, Package, Map as MapIcon, RefreshCw, MessageCircle, Phone } from 'lucide-react';
import { CartItem } from '../types';

interface OrderingProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
}

const Ordering: React.FC<OrderingProps> = ({ cart, addToCart }) => {
  const [step, setStep] = useState(1);
  const [trackingStatus, setTrackingStatus] = useState(0); // 0: Received, 1: Preparing, 2: Out for delivery, 3: Delivered
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const subtotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const deliveryFee = subtotal > 0 ? 35 : 0;
  const total = subtotal + deliveryFee;

  // Simulate automatic progress for demo purposes
  useEffect(() => {
    if (step === 3 && trackingStatus < 3) {
      const timer = setTimeout(() => {
        setTrackingStatus(prev => prev + 1);
        setLastUpdated(new Date());
      }, 20000); // Progress automatically every 20 seconds
      return () => clearTimeout(timer);
    }
  }, [step, trackingStatus]);

  const handlePlaceOrder = () => {
    setStep(3);
    setTrackingStatus(0);
    setLastUpdated(new Date());
  };

  const checkStatus = () => {
    setIsRefreshing(true);
    // Simulate a network delay
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
      // For the demo, let's also manually push the status if the user is impatient
      if (trackingStatus < 3) {
        // Optional: setTrackingStatus(prev => prev + 1);
      }
    }, 800);
  };

  const getArrivalTime = () => {
    if (trackingStatus === 0) return "25-30 mins";
    if (trackingStatus === 1) return "15-20 mins";
    if (trackingStatus === 2) return "5-8 mins";
    return "Delivered";
  };

  if (step === 3) {
    return (
      <div className="pt-24 pb-24 bg-[#fdfbf7] min-h-screen">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
            
            {/* Tracking Header with Progress */}
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
                    <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Order #KG-88291</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-rustic-orange animate-pulse"></span>
                    <span className="text-sm">Live Updates</span>
                  </div>
                </div>
                
                <button 
                  onClick={checkStatus}
                  disabled={isRefreshing}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl flex items-center gap-3 transition-all border border-white/10 group active:scale-95"
                >
                  <RefreshCw size={18} className={`${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                  <span className="font-bold text-sm tracking-wide">{isRefreshing ? 'Syncing...' : 'Check Status'}</span>
                </button>
              </div>
            </div>

            <div className="p-8 md:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Status Timeline */}
                <div className="lg:col-span-7 space-y-12">
                  <div className="relative pl-10 border-l-2 border-dashed border-gray-100 py-2">
                    
                    {/* Step 1: Received */}
                    <div className="relative mb-12">
                      <div className={`absolute -left-[3.15rem] top-0 p-3 rounded-2xl transition-all duration-500 ${trackingStatus >= 0 ? 'bg-rustic-orange text-white shadow-xl shadow-rustic-orange/30 scale-110' : 'bg-gray-100 text-gray-400'}`}>
                        <CheckCircle2 size={24} />
                      </div>
                      <div className="transition-all duration-500">
                        <h3 className={`text-xl font-bold italic mb-1 ${trackingStatus >= 0 ? 'text-rustic-dark' : 'text-gray-300'}`}>Order Received</h3>
                        <p className={`text-sm ${trackingStatus >= 0 ? 'text-rustic-green' : 'text-gray-300'}`}>
                          {trackingStatus === 0 ? "We've got your order! Our kitchen is getting ready." : "Confirmed and processed at 12:45 PM."}
                        </p>
                      </div>
                    </div>

                    {/* Step 2: Preparing */}
                    <div className="relative mb-12">
                      <div className={`absolute -left-[3.15rem] top-0 p-3 rounded-2xl transition-all duration-500 ${trackingStatus >= 1 ? 'bg-rustic-orange text-white shadow-xl shadow-rustic-orange/30 scale-110' : 'bg-gray-100 text-gray-400'}`}>
                        <Utensils size={24} />
                      </div>
                      <div className="transition-all duration-500">
                        <h3 className={`text-xl font-bold italic mb-1 ${trackingStatus >= 1 ? 'text-rustic-dark' : 'text-gray-300'}`}>Kitchen Magic</h3>
                        <p className={`text-sm ${trackingStatus >= 1 ? 'text-rustic-green' : 'text-gray-300'}`}>
                          {trackingStatus === 1 ? "Chef Kgola is hand-stretching your dough and firing the oven." : trackingStatus > 1 ? "Your meal was prepared to perfection." : "Awaiting the chef's touch."}
                        </p>
                        {trackingStatus === 1 && (
                          <div className="mt-3 inline-flex items-center gap-2 bg-amber-50 text-rustic-orange px-4 py-2 rounded-xl text-xs font-bold border border-amber-100 italic">
                             <span className="w-1.5 h-1.5 rounded-full bg-rustic-orange animate-ping"></span>
                             Firing the Wood Oven
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 3: Out for Delivery */}
                    <div className="relative mb-12">
                      <div className={`absolute -left-[3.15rem] top-0 p-3 rounded-2xl transition-all duration-500 ${trackingStatus >= 2 ? 'bg-rustic-orange text-white shadow-xl shadow-rustic-orange/30 scale-110' : 'bg-gray-100 text-gray-400'}`}>
                        <Bike size={24} />
                      </div>
                      <div className="transition-all duration-500">
                        <h3 className={`text-xl font-bold italic mb-1 ${trackingStatus >= 2 ? 'text-rustic-dark' : 'text-gray-300'}`}>On the Road</h3>
                        <p className={`text-sm ${trackingStatus >= 2 ? 'text-rustic-green' : 'text-gray-300'}`}>
                          {trackingStatus === 2 ? "Your driver is zooming through Pretoria East. Almost there!" : trackingStatus > 2 ? "Safely delivered to your door." : "Preparing for pickup."}
                        </p>
                      </div>
                    </div>

                    {/* Step 4: Delivered */}
                    <div className="relative">
                      <div className={`absolute -left-[3.15rem] top-0 p-3 rounded-2xl transition-all duration-500 ${trackingStatus >= 3 ? 'bg-rustic-orange text-white shadow-xl shadow-rustic-orange/30 scale-110' : 'bg-gray-100 text-gray-400'}`}>
                        <Package size={24} />
                      </div>
                      <div className="transition-all duration-500">
                        <h3 className={`text-xl font-bold italic mb-1 ${trackingStatus >= 3 ? 'text-rustic-dark' : 'text-gray-300'}`}>Bon Appétit!</h3>
                        <p className={`text-sm ${trackingStatus >= 3 ? 'text-rustic-green' : 'text-gray-300'}`}>
                          {trackingStatus === 3 ? "Your wood-fired feast has been delivered. Enjoy every bite!" : "The best part is yet to come."}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Arrival Time & Quick Map */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="bg-rustic-cream/20 rounded-[3rem] p-10 border border-rustic-mint/40 text-center relative overflow-hidden group">
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
                    
                    {/* Simulated Map Visual */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                      <MapIcon className="w-full h-full text-rustic-dark" />
                    </div>
                    
                    {/* Delivery Driver Pulse - only visible when out for delivery */}
                    {trackingStatus === 2 && (
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                         <div className="w-4 h-4 bg-rustic-orange rounded-full animate-ping"></div>
                       </div>
                    )}
                  </div>

                  {/* Live Activity Log */}
                  <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <MessageCircle size={14} /> Recent Activity
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-rustic-green italic">Last updated:</span>
                        <span className="text-gray-400 font-medium">{lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl text-[11px] text-rustic-dark font-medium border border-gray-50 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        {trackingStatus === 0 && "Your order is in the queue."}
                        {trackingStatus === 1 && "The wood oven is at 450°C. Cooking now."}
                        {trackingStatus === 2 && "Our driver is navigating Olympus AH."}
                        {trackingStatus === 3 && "Feast complete. Share your photos @kgomos_pretoria!"}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Order Content Summary */}
              <div className="mt-16 pt-10 border-t border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h4 className="font-bold text-rustic-dark italic text-lg mb-4">Your Ordered Items</h4>
                    <div className="flex flex-wrap gap-3">
                      {cart.map(item => (
                        <div key={item.id} className="px-5 py-2.5 bg-rustic-cream/10 rounded-2xl text-[11px] font-bold text-rustic-green border border-rustic-mint/20">
                          {item.quantity}× {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to="/contact" className="text-rustic-orange font-bold text-sm flex items-center gap-2 hover:underline italic">
                    <Phone size={16} /> Need help? Call Restaurant
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/" 
              className="text-gray-400 font-bold hover:text-rustic-orange transition-colors italic flex items-center justify-center gap-2 mx-auto text-sm group"
            >
              <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-[#fdfbf7]">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Order Progress Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 font-bold ${step === 1 ? 'text-rustic-orange' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm ${step === 1 ? 'bg-rustic-orange text-white' : ''}`}>1</span>
              Your Order
            </div>
            <ChevronRight size={20} className="text-gray-300" />
            <div className={`flex items-center gap-2 font-bold ${step === 2 ? 'text-rustic-orange' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm ${step === 2 ? 'bg-rustic-orange text-white' : ''}`}>2</span>
              Checkout
            </div>
          </div>
          
          {/* Quick Header Partner Links */}
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Apps:</span>
            <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer" className="bg-[#06C167] text-white px-3 py-1.5 rounded-xl text-[10px] font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm shadow-[#06C167]/20">
              Uber Eats
            </a>
            <a href="https://www.mrdfood.com" target="_blank" rel="noopener noreferrer" className="bg-[#e21a23] text-white px-3 py-1.5 rounded-xl text-[10px] font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm shadow-[#e21a23]/20">
              Mr D
            </a>
          </div>
        </div>

        {cart.length === 0 && step === 1 ? (
          <div className="flex flex-col items-center">
            {/* Empty Cart View */}
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="p-8 bg-rustic-cream/30 rounded-full mb-6">
                <ShoppingBag size={80} className="text-rustic-tan opacity-40" />
              </div>
              <h1 className="text-3xl font-bold mb-4 italic text-rustic-dark">Your bag is empty.</h1>
              <p className="text-rustic-green mb-8 max-w-sm mx-auto">Explore our menu and add some artisanal wood-fired goodness to your life.</p>
              <Link to="/menu" className="bg-rustic-orange text-white px-8 py-3 rounded-full font-bold hover:bg-rustic-tan transition-all shadow-lg shadow-rustic-orange/20">
                View Menu
              </Link>
            </div>

            {/* External Partners Section for Empty Cart */}
            <div className="mt-12 w-full max-w-4xl">
               <div className="text-center mb-10">
                 <h2 className="text-2xl font-bold text-rustic-dark italic">Or Order via Our Partners</h2>
                 <p className="text-rustic-green text-sm">Find us on your favorite delivery apps for convenience and rewards.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer" className="bg-white p-8 rounded-[2.5rem] shadow-md border border-gray-100 flex flex-col items-center group hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-[#06C167] rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                      <ShoppingBag size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-rustic-dark mb-2">Uber Eats</h3>
                    <p className="text-gray-400 text-xs text-center mb-6">Use your Uber Pass or earn Uber Cash on every order.</p>
                    <span className="text-[#06C167] font-bold flex items-center gap-2 text-sm uppercase tracking-widest">Open App <ExternalLink size={14} /></span>
                  </a>
                  
                  <a href="https://www.mrdfood.com" target="_blank" rel="noopener noreferrer" className="bg-white p-8 rounded-[2.5rem] shadow-md border border-gray-100 flex flex-col items-center group hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-[#e21a23] rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                      <Bike size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-rustic-dark mb-2">Mr D Food</h3>
                    <p className="text-gray-400 text-xs text-center mb-6">South Africa's favorite delivery app with local expertise.</p>
                    <span className="text-[#e21a23] font-bold flex items-center gap-2 text-sm uppercase tracking-widest">Open App <ExternalLink size={14} /></span>
                  </a>
               </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Ordering Flow */}
            <div className="lg:col-span-2 space-y-8">
              {step === 1 ? (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold mb-8 italic text-rustic-dark border-b border-gray-100 pb-4">Review Items</h2>
                  <div className="divide-y divide-gray-100">
                    {cart.map(item => (
                      <div key={item.id} className="py-6 flex justify-between items-center group">
                        <div className="flex flex-col">
                          <h4 className="font-bold text-lg text-rustic-dark group-hover:text-rustic-orange transition-colors italic">{item.name}</h4>
                          <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <span className="font-black text-rustic-orange text-lg">R {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <label className="block text-xs font-bold text-rustic-green uppercase tracking-widest mb-3">Special Instructions</label>
                    <textarea className="w-full p-4 rounded-xl border border-gray-200 bg-white resize-none focus:outline-none focus:ring-1 focus:ring-rustic-orange h-24" placeholder="Extra crispy? No garlic? Let us know."></textarea>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-rustic-dark italic"><MapPin className="text-rustic-orange" /> Delivery Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Street Address</label>
                        <input type="text" className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Unit / Complex</label>
                        <input type="text" className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange outline-none" />
                      </div>
                    </div>
                    <p className="mt-6 text-sm text-rustic-green/70 flex items-center gap-2 italic">
                      <ShieldCheck size={14} /> Direct delivery restricted to 8km radius of Olympus AH.
                    </p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-rustic-dark italic"><CreditCard className="text-rustic-orange" /> Payment Method</h2>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <button className="flex-1 border-2 border-rustic-orange bg-rustic-orange/5 rounded-xl p-4 flex items-center gap-3 transition-all">
                        <CreditCard className="text-rustic-orange" />
                        <span className="font-bold text-rustic-dark">Card Payment</span>
                      </button>
                      <button className="flex-1 border-2 border-gray-100 rounded-xl p-4 flex items-center gap-3 grayscale opacity-40 cursor-not-allowed">
                        <ShoppingBag size={20} />
                        <span className="font-bold">E-Wallet</span>
                      </button>
                    </div>
                    <div className="space-y-4">
                      <input type="text" placeholder="Cardholder Name" className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange outline-none" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Expiry MM/YY" className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange outline-none" />
                        <input type="text" placeholder="CVV" className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-rustic-orange outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Partners CTA Block */}
              <div className="bg-rustic-dark text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 h-full w-48 bg-rustic-orange opacity-5 -skew-x-12 translate-x-1/2"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <Bike className="text-rustic-orange" />
                      <span className="text-xs font-bold text-rustic-tan uppercase tracking-[0.2em]">External Platforms</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-3 italic">Order on Your Favorite App</h3>
                    <p className="text-rustic-mint/60 text-sm max-w-md leading-relaxed">
                      Prefer the convenience of your existing delivery subscriptions? Find Kgomo's full menu on Uber Eats and Mr D Food.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 w-full md:w-auto">
                    <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer" className="bg-[#06C167] text-white px-8 py-4 rounded-2xl font-bold text-center hover:shadow-lg transition-all flex items-center justify-center gap-3">
                      Uber Eats <ExternalLink size={18} />
                    </a>
                    <a href="https://www.mrdfood.com" target="_blank" rel="noopener noreferrer" className="bg-[#e21a23] text-white px-8 py-4 rounded-2xl font-bold text-center hover:shadow-lg transition-all flex items-center justify-center gap-3">
                      Mr D Food <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Sticky Summary */}
            <div className="space-y-6">
              <div className="bg-rustic-dark text-white p-8 rounded-[2rem] shadow-2xl border border-white/5 relative">
                <h3 className="text-xl font-bold mb-8 italic text-rustic-orange border-b border-white/5 pb-4">Order Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-rustic-mint/60">
                    <span>Subtotal</span>
                    <span>R {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-rustic-mint/60">
                    <span>Delivery Fee</span>
                    <span>R {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between font-bold text-3xl">
                    <span>Total</span>
                    <span className="text-rustic-orange font-black">R {total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-8 text-xs p-4 bg-white/5 rounded-2xl border border-white/5">
                  <Timer size={18} className="text-rustic-orange" />
                  <span className="text-rustic-mint/80 font-medium italic">Estimated Prep: <strong>25 - 35 mins</strong></span>
                </div>

                {step === 1 ? (
                  <button onClick={() => setStep(2)} className="w-full bg-rustic-orange text-white py-5 rounded-2xl font-bold text-lg hover:bg-rustic-tan transition-all shadow-xl shadow-rustic-orange/30">
                    Proceed to Checkout
                  </button>
                ) : (
                  <button onClick={handlePlaceOrder} className="w-full bg-rustic-orange text-white py-5 rounded-2xl font-bold text-lg hover:bg-rustic-tan transition-all flex items-center justify-center gap-2 shadow-xl shadow-rustic-orange/30">
                    <ShieldCheck size={20} /> Place Order Now
                  </button>
                )}
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-center gap-3">
                  <ShieldCheck className="text-green-500" size={18} />
                  <span className="text-xs font-bold text-rustic-green/70 uppercase tracking-widest">POPIA Compliant Secure Checkout</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Ordering;