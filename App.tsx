
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, ShoppingBag, MapPin, Phone, Instagram, Facebook, User, LogOut, ClipboardList, ChevronDown, Plus, Minus } from 'lucide-react';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import Reservations from './pages/Reservations';
import MealPrep from './pages/MealPrep';
import About from './pages/About';
import Kids from './pages/Kids';
import Corporate from './pages/Corporate';
import Loyalty from './pages/Loyalty';
import Contact from './pages/Contact';
import Ordering from './pages/Ordering';
import AuthPage from './pages/AuthPage';
import MyOrders from './pages/MyOrders';
import { CartItem, MenuItem } from './types';
import { db } from './lib/db';

export const LogoHorns = ({ className = "w-8 h-8", color = "#D4AF37" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M 10 30 C 10 60 35 85 50 85 C 65 85 90 60 90 30 C 80 50 65 65 50 65 C 35 65 20 50 10 30 Z" 
      fill={color} 
      className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
    />
    <path 
      d="M 20 40 C 20 55 35 75 50 75 C 65 75 80 55 80 40 C 70 50 60 60 50 60 C 40 60 30 50 20 40 Z" 
      fill="white" 
      fillOpacity="0.1"
    />
  </svg>
);

const NavItem: React.FC<{ link: any }> = ({ link }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={link.path} 
        className={`flex items-center gap-1.5 text-sm font-bold tracking-wide transition-colors duration-300 text-white hover:text-[#D4AF37]`}
      >
        {link.name}
        {link.subLinks && <ChevronDown size={14} className={`transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />}
      </Link>
      
      {link.subLinks && (
        <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
          <div className="bg-[#1a0f0a] border border-white/10 rounded-2xl shadow-2xl py-3 w-56 backdrop-blur-xl">
            {link.subLinks.map((sub: any) => (
              <Link 
                key={sub.name}
                to={sub.path} 
                className="block px-6 py-2.5 text-sm font-bold text-white/70 hover:text-[#D4AF37] hover:bg-white/5 transition-all"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);

  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    db.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const updateQuantity = (item: MenuItem, delta: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.menuItemId === item.id);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          return prev.filter(i => i.menuItemId !== item.id);
        }
        return prev.map(i => i.menuItemId === item.id ? { ...i, quantity: newQty } : i);
      }
      if (delta > 0) {
        return [...prev, {
          id: Math.random().toString(36).substr(2, 9),
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: delta
        }];
      }
      return prev;
    });
  };

  const handleLogout = async () => {
    await db.auth.signOut();
    setSession(null);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Menu', 
      path: '/menu',
      subLinks: [
        { name: 'Food Menu', path: '/menu?view=food' },
        { name: 'Drinks Menu', path: '/menu?view=drinks' },
        { name: 'Meal Prep', path: '/meal-prep' }
      ]
    },
    { 
      name: 'Book', 
      path: '/book',
      subLinks: [
        { name: 'Table Reservations', path: '/book' },
        { name: 'Events', path: '/events' }
      ]
    },
    { name: 'Kids', path: '/kids' },
    { name: 'Loyalty', path: '/loyalty' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <nav className={`fixed w-full z-[100] transition-all duration-500 bg-[#1a0f0a] ${isScrolled ? 'shadow-2xl py-3' : 'py-5'}`}>
          <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-4 group">
              <LogoHorns className="w-10 h-10 group-hover:scale-110 transition-transform" color="#D4AF37" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tighter leading-none font-serif text-[#D4AF37]">KGOMO'S</span>
                <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/40">WHERE HERITAGE MEETS TASTE</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <NavItem key={link.name} link={link} />
              ))}
              
              <div className="flex items-center gap-4 ml-4">
                {session ? (
                  <div className="flex items-center gap-3 group relative cursor-pointer">
                    <div className="flex items-center gap-2 p-2 rounded-lg transition-colors text-white hover:bg-white/10">
                      <User size={18} />
                      <span className="text-sm font-semibold max-w-[100px] truncate">{session.user.email}</span>
                    </div>
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link to="/orders" className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#3d2b1f] hover:bg-[#fdfbf7] transition-colors">
                        <ClipboardList size={16} /> My Orders
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to="/auth" className="text-sm font-bold flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-white hover:bg-white/10">
                    <User size={18} /> Login
                  </Link>
                )}

                <Link to="/order" className="bg-[#D4AF37] text-[#1a0f0a] hover:bg-white px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg relative group">
                  <div className="relative">
                    <ShoppingBag size={18} />
                    {totalItems > 0 && (
                      <span className="absolute -top-3 -right-3 bg-[#1a0f0a] text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white animate-bounceIn">
                        {totalItems}
                      </span>
                    )}
                  </div>
                  Order
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:hidden">
              <Link to="/order" className="relative p-2">
                <ShoppingBag className="text-[#D4AF37]" size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#d78258] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounceIn shadow-md">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 transition-colors duration-300 text-white">
                {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t animate-slideUp overflow-y-auto max-h-[90vh]">
              <div className="flex flex-col p-6 gap-2">
                {navLinks.map(link => (
                  <div key={link.name} className="border-b border-gray-100 last:border-none">
                    {link.subLinks ? (
                      <div className="py-3">
                        <button 
                          onClick={() => setOpenMobileSub(openMobileSub === link.name ? null : link.name)}
                          className="w-full flex items-center justify-between text-lg font-bold text-[#3d2b1f]"
                        >
                          {link.name}
                          {openMobileSub === link.name ? <Minus size={20} className="text-[#d78258]" /> : <Plus size={20} className="text-[#d78258]" />}
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${openMobileSub === link.name ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                          {link.subLinks.map((sub: any) => (
                            <Link 
                              key={sub.name}
                              to={sub.path} 
                              className="block py-2.5 pl-4 text-base font-bold text-[#778979] active:text-[#d78258]"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link 
                        to={link.path} 
                        className="block py-4 text-lg font-bold text-[#3d2b1f]" 
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="mt-4 space-y-4">
                  {session ? (
                    <>
                      <Link to="/orders" className="flex items-center gap-3 py-4 text-lg font-bold text-[#3d2b1f]" onClick={() => setIsMenuOpen(false)}>
                        <ClipboardList size={20} /> My Orders
                      </Link>
                      <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 py-4 text-lg font-bold text-red-600 text-left">
                        <LogOut size={20} /> Logout
                      </button>
                    </>
                  ) : (
                    <Link to="/auth" className="flex items-center gap-3 py-4 text-lg font-bold text-[#3d2b1f]" onClick={() => setIsMenuOpen(false)}>
                      <User size={20} /> Login / Sign Up
                    </Link>
                  )}
                  <Link to="/order" className="block bg-[#d78258] text-white py-4 rounded-2xl text-center font-black uppercase tracking-[0.2em] shadow-xl" onClick={() => setIsMenuOpen(false)}>
                    Order Now {totalItems > 0 && `(${totalItems})`}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage updateQuantity={updateQuantity} session={session} cart={cart} />} />
            <Route path="/book" element={<Reservations />} />
            <Route path="/meal-prep" element={<MealPrep />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/events" element={<Corporate />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={session ? <Navigate to="/" /> : <AuthPage setSession={setSession} />} />
            <Route path="/order" element={<Ordering cart={cart} addToCart={(item) => updateQuantity({ id: item.menuItemId, name: item.name, price: item.price, category: item.name as any, description: '', image: '' }, 1)} />} />
            <Route path="/orders" element={session ? <MyOrders session={session} /> : <Navigate to="/auth" />} />
          </Routes>
        </main>

        <footer className="bg-[#1a0f0a] text-white py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <LogoHorns className="w-12 h-12" color="#D4AF37" />
                  <div className="flex flex-col">
                    <h3 className="text-3xl font-bold font-serif leading-none tracking-tight text-[#D4AF37]">KGOMO'S</h3>
                    <span className="text-[8px] tracking-[0.3em] text-white/40 font-black">WHERE HERITAGE MEETS TASTE</span>
                  </div>
                </div>
                <p className="text-[#ccdcc1]/80 leading-relaxed mb-8 text-sm">
                  Premium-casual family dining in Pretoria East. Artisanal wood-fired pizzas, full-service dining, and a dedicated supervised play area for the kids.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-[#D4AF37] hover:text-[#1a0f0a] transition-all"><Instagram size={20} /></a>
                  <a href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-[#D4AF37] hover:text-[#1a0f0a] transition-all"><Facebook size={20} /></a>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-[#D4AF37]">Quick Links</h4>
                <ul className="space-y-5 text-[#ccdcc1]/70 font-medium text-sm">
                  <li><Link to="/menu" className="hover:text-white transition-colors">Digital Menu</Link></li>
                  <li><Link to="/meal-prep" className="hover:text-white transition-colors">Meal Prep Service</Link></li>
                  <li><Link to="/book" className="hover:text-white transition-colors">Book a Table</Link></li>
                  <li><Link to="/events" className="hover:text-white transition-colors">Corporate Events</Link></li>
                  <li><Link to="/loyalty" className="hover:text-white transition-colors">Loyalty Program</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-[#D4AF37]">Visit Us</h4>
                <ul className="space-y-5 text-[#ccdcc1]/70 font-medium text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin size={20} className="shrink-0 text-[#D4AF37]" />
                    <span>Plot 123, Olympus AH, Pretoria East, 0081</span>
                  </li>
                  <li className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="shrink-0 text-[#D4AF37]" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">GM Modisa</span>
                        <a href="tel:+27842920000" className="hover:text-[#D4AF37] transition-colors">084 292 0000</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="shrink-0 text-[#D4AF37]" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Chef Kgola</span>
                        <a href="tel:+27677407650" className="hover:text-[#D4AF37] transition-colors">067 740 7650</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-[#D4AF37]">Our Hours</h4>
                <ul className="space-y-5 text-[#ccdcc1]/70 font-medium text-sm">
                  <li className="flex justify-between">
                    <span className="font-bold">Mon - Sun:</span>
                    <span>08:00 - 21:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-bold">Public Holidays:</span>
                    <span>09:00 - 18:00</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-white/5 text-center text-[#ccdcc1]/20 text-[9px] font-black uppercase tracking-[0.4em]">
              &copy; {new Date().getFullYear()} KGOMO'S RESTAURANT. ALL RIGHTS RESERVED.
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
