import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import {
  Menu as MenuIcon, X, ShoppingBag, MapPin, Phone,
  Instagram, Facebook, User, LogOut, ClipboardList,
  ChevronDown, ChevronRight, Plus, Minus,
} from 'lucide-react';
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
import ChatAssistant from './src/components/ChatAssistant';
import { CartItem, MenuItem } from './types';
import { db } from './lib/db';

export const LogoHorns = ({
  className = 'w-8 h-8',
  color = '#C4963A',
}: {
  className?: string;
  color?: string;
}) => (
  <svg viewBox="0 0 100 100" className={`${className} animate-float`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 10 30 C 10 60 35 85 50 85 C 65 85 90 60 90 30 C 80 50 65 65 50 65 C 35 65 20 50 10 30 Z"
      fill={color}
      className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
    />
    <path
      d="M 20 40 C 20 55 35 75 50 75 C 65 75 80 55 80 40 C 70 50 60 60 50 60 C 40 60 30 50 20 40 Z"
      fill="white"
      fillOpacity="0.15"
    />
    <circle cx="50" cy="45" r="5" fill="white" fillOpacity="0.2" />
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
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 text-white/80 hover:text-gold group-hover:translate-y-[-1px]"
      >
        {link.name}
        {link.subLinks && (
          <ChevronDown
            size={12}
            className={`transition-transform duration-500 ${isHovered ? 'rotate-180 text-gold' : 'text-white/30'}`}
          />
        )}
      </Link>

      {link.subLinks && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-500 ${
            isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
          }`}
        >
          <div className="bg-dark/95 border border-gold/15 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-4 w-64 backdrop-blur-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
            {link.subLinks.map((sub: any) => (
              <Link
                key={sub.name}
                to={sub.path}
                className="block px-8 py-3.5 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-gold hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-gold"
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
  const [sessionLoaded, setSessionLoaded] = useState(false);

  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    // FIX: persist session on initial load AND listen for changes
    db.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSessionLoaded(true);
    });

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FIX: updateQuantity — build a complete MenuItem-compatible object so
  // the cart doesn't break on items added from Ordering page
  const updateQuantity = (item: MenuItem, delta: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.menuItemId === item.id);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) return prev.filter((i) => i.menuItemId !== item.id);
        return prev.map((i) =>
          i.menuItemId === item.id ? { ...i, quantity: newQty } : i
        );
      }
      if (delta > 0) {
        return [
          ...prev,
          {
            id: Date.now().toString(36),
            menuItemId: item.id,
            name: item.name,
            price: item.price,
            quantity: delta,
          },
        ];
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
        { name: 'Meal Prep', path: '/meal-prep' },
      ],
    },
    {
      name: 'Book',
      path: '/book',
      subLinks: [
        { name: 'Table Reservations', path: '/book' },
        { name: 'Events', path: '/events' },
      ],
    },
    { name: 'Kids', path: '/kids' },
    { name: 'Loyalty', path: '/loyalty' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Don't render auth-dependent routes until session is resolved (avoids flash)
  if (!sessionLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <LogoHorns className="w-16 h-16 animate-pulse" color="#C4963A" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* ── Nav ─────────────────────────────────────────────────────────────── */}
        <nav
          className={`fixed w-full z-[100] transition-all duration-700 ${
            isScrolled 
              ? 'bg-dark/95 backdrop-blur-2xl py-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border-b border-gold/15' 
              : 'bg-transparent py-8'
          }`}
        >
          <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gold blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                <LogoHorns
                  className="w-12 h-12 group-hover:scale-110 transition-transform duration-700 relative z-10"
                  color="#C4963A"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold tracking-tighter leading-none font-serif text-gold group-hover:text-white transition-colors duration-700">
                  KGOMO'S
                </span>
                <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/40 group-hover:text-gold/60 transition-colors duration-700">
                  WHERE HERITAGE MEETS TASTE
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <NavItem key={link.name} link={link} />
              ))}

              <div className="flex items-center gap-6 ml-6 border-l border-white/10 pl-10">
                {session ? (
                  <div className="flex items-center gap-3 group relative cursor-pointer">
                    <div className="flex items-center gap-3 p-2 rounded-2xl transition-all text-white/80 hover:text-gold hover:bg-white/5">
                      <div className="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center">
                        <User size={16} className="text-gold" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest max-w-[120px] truncate">
                        {session.user.user_metadata?.full_name || session.user.email?.split('@')[0]}
                      </span>
                    </div>
                    <div className="absolute top-full right-0 mt-4 bg-dark/95 rounded-[2rem] shadow-2xl border border-gold/15 py-4 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 transition-all duration-500 backdrop-blur-2xl overflow-hidden">
                      <Link
                        to="/orders"
                        className="w-full flex items-center gap-4 px-8 py-3.5 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-gold hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-gold"
                      >
                        <ClipboardList size={14} /> My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-8 py-3.5 text-[10px] font-black uppercase tracking-widest text-rust hover:bg-rust/10 transition-all border-l-2 border-transparent hover:border-rust text-left"
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3 px-6 py-3 rounded-2xl transition-all text-white/80 hover:text-gold hover:bg-white/5 border border-white/10"
                  >
                    <User size={16} /> Login
                  </Link>
                )}

                <Link
                  to="/order"
                  className="bg-gold text-dark hover:bg-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 shadow-2xl relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="relative">
                      <ShoppingBag size={18} />
                      {totalItems > 0 && (
                        <span className="absolute -top-3 -right-3 bg-dark text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white animate-bounceIn">
                          {totalItems}
                        </span>
                      )}
                    </div>
                    Order
                  </div>
                </Link>
              </div>
            </div>

            {/* Mobile nav toggle */}
            <div className="flex items-center gap-4 lg:hidden">
              <Link to="/order" className="relative p-2">
                <ShoppingBag className="text-gold" size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rust text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounceIn shadow-md">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 transition-colors duration-300 text-white"
              >
                {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t animate-slideUp overflow-y-auto max-h-[90vh]">
              <div className="flex flex-col p-6 gap-2">
                {navLinks.map((link) => (
                  <div key={link.name} className="border-b border-gray-100 last:border-none">
                    {link.subLinks ? (
                      <div className="py-3">
                        <button
                          onClick={() =>
                            setOpenMobileSub(openMobileSub === link.name ? null : link.name)
                          }
                          className="w-full flex items-center justify-between text-lg font-bold text-dark"
                        >
                          {link.name}
                          {openMobileSub === link.name ? (
                            <Minus size={20} className="text-gold" />
                          ) : (
                            <Plus size={20} className="text-gold" />
                          )}
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            openMobileSub === link.name
                              ? 'max-h-40 mt-3 opacity-100'
                              : 'max-h-0 opacity-0'
                          }`}
                        >
                          {link.subLinks.map((sub: any) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="block py-2.5 pl-4 text-base font-bold text-muted active:text-gold"
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
                        className="block py-4 text-lg font-bold text-dark"
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
                      <Link
                        to="/orders"
                        className="flex items-center gap-3 py-4 text-lg font-bold text-dark"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <ClipboardList size={20} /> My Orders
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 py-4 text-lg font-bold text-red-600 text-left"
                      >
                        <LogOut size={20} /> Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      className="flex items-center gap-3 py-4 text-lg font-bold text-dark"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={20} /> Login / Sign Up
                    </Link>
                  )}
                  <Link
                    to="/order"
                    className="block bg-gold text-dark py-4 rounded-2xl text-center font-black uppercase tracking-[0.2em] shadow-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Order Now {totalItems > 0 && `(${totalItems})`}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* ── Routes ──────────────────────────────────────────────────────────── */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/menu"
              element={
                <MenuPage updateQuantity={updateQuantity} session={session} cart={cart} />
              }
            />
            <Route path="/book" element={<Reservations />} />
            <Route path="/meal-prep" element={<MealPrep />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/events" element={<Corporate />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/auth"
              element={session ? <Navigate to="/" /> : <AuthPage setSession={setSession} />}
            />
            <Route
              path="/order"
              element={
                <Ordering
                  cart={cart}
                  addToCart={(item) =>
                    updateQuantity(
                      {
                        id: item.menuItemId,
                        name: item.name,
                        price: item.price,
                        category: item.name as any,
                        description: '',
                        image: '',
                      },
                      1
                    )
                  }
                />
              }
            />
            <Route
              path="/orders"
              element={session ? <MyOrders session={session} /> : <Navigate to="/auth" />}
            />
          </Routes>
        </main>

        {/* ── Footer ──────────────────────────────────────────────────────────── */}
        <footer className="bg-dark text-white py-24 border-t border-gold/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold opacity-[0.02] rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold opacity-[0.01] rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px] pointer-events-none"></div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
              <div className="flex flex-col">
                <div className="flex items-center gap-5 mb-10">
                  <LogoHorns className="w-14 h-14" color="#C4963A" />
                  <div className="flex flex-col">
                    <h3 className="text-4xl font-bold font-serif leading-none tracking-tight text-gold">
                      KGOMO'S
                    </h3>
                    <span className="text-[10px] tracking-[0.4em] text-white/40 font-black">
                      WHERE HERITAGE MEETS TASTE
                    </span>
                  </div>
                </div>
                <p className="text-white/50 leading-relaxed mb-10 text-sm font-medium">
                  Premium-casual family dining in Pretoria East. Artisanal wood-fired pizzas,
                  full-service dining, and a dedicated supervised play area for the kids.
                </p>
                <div className="flex gap-5">
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-gold hover:text-dark transition-all shadow-lg group"
                  >
                    <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-gold hover:text-dark transition-all shadow-lg group"
                  >
                    <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-gold">
                  Quick Links
                </h4>
                <ul className="space-y-6 text-white/40 font-black text-[10px] uppercase tracking-widest">
                  <li>
                    <Link to="/menu" className="hover:text-gold transition-colors flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/20 group-hover:bg-gold transition-colors"></div>
                      Digital Menu
                    </Link>
                  </li>
                  <li>
                    <Link to="/meal-prep" className="hover:text-gold transition-colors flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/20 group-hover:bg-gold transition-colors"></div>
                      Meal Prep Service
                    </Link>
                  </li>
                  <li>
                    <Link to="/book" className="hover:text-gold transition-colors flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/20 group-hover:bg-gold transition-colors"></div>
                      Book a Table
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" className="hover:text-gold transition-colors flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/20 group-hover:bg-gold transition-colors"></div>
                      Corporate Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/loyalty" className="hover:text-gold transition-colors flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/20 group-hover:bg-gold transition-colors"></div>
                      Loyalty Program
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-gold">
                  Visit Us
                </h4>
                <ul className="space-y-8 text-white/50 font-medium text-sm">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-gold" />
                    </div>
                    <span className="leading-relaxed">Plot 123, Olympus AH, Pretoria East, 0081</span>
                  </li>
                  <li className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                        <Phone size={18} className="text-gold" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gold/40 mb-1">
                          GM Modisa
                        </span>
                        <a href="tel:+27842920000" className="hover:text-gold transition-colors font-bold text-white">
                          084 292 0000
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                        <Phone size={18} className="text-gold" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gold/40 mb-1">
                          Chef Kgola
                        </span>
                        <a href="tel:+27677407650" className="hover:text-gold transition-colors font-bold text-white">
                          067 740 7650
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-gold">
                  Our Hours
                </h4>
                <div className="bg-white/5 rounded-[2rem] p-8 border border-gold/10">
                  <ul className="space-y-6 text-sm font-medium">
                    <li className="flex justify-between items-center">
                      <span className="text-gold/60 text-[10px] font-black uppercase tracking-widest">Mon - Sun</span>
                      <span className="font-bold text-white">08:00 - 21:00</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gold/60 text-[10px] font-black uppercase tracking-widest">Holidays</span>
                      <span className="font-bold text-white">09:00 - 18:00</span>
                    </li>
                  </ul>
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <Link to="/book" className="w-full bg-gold text-dark py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all">
                      Book Now <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">
                &copy; {new Date().getFullYear()} KGOMO'S RESTAURANT. ALL RIGHTS RESERVED.
              </div>
              <div className="flex gap-8 text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">
                <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        <ChatAssistant />
      </div>
    </BrowserRouter>
  );
};

export default App;
