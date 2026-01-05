import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, MapPin, Phone, Instagram, Facebook, Star, Calendar, Utensils, ShieldCheck } from 'lucide-react';
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
import { CartItem } from './types';

export const LogoHorns = ({ className = "w-8 h-8", color = "#a9916b" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,78 C45.5,58 20,48 10,25 C25,40 45,45 50,60 C55,45 75,40 90,25 C80,48 54.5,58 50,78 Z" fill={color} />
  </svg>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.menuItemId === item.menuItemId);
      if (existing) {
        return prev.map(i => i.menuItemId === item.menuItemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Book', path: '/book' },
    { name: 'Meal Prep', path: '/meal-prep' },
    { name: 'Kids', path: '/kids' },
    { name: 'Events', path: '/events' },
    { name: 'Loyalty', path: '/loyalty' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
          <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <LogoHorns className="w-10 h-10 group-hover:scale-110 transition-transform" color={isScrolled ? "#a9916b" : "#e3d6ab"} />
              <div className="flex flex-col">
                <span className={`text-xl font-bold tracking-tighter leading-none font-serif ${isScrolled ? 'text-rustic-dark' : 'text-white'}`}>KGOMO'S</span>
                <span className={`text-[7px] tracking-[0.25em] font-semibold hidden sm:block ${isScrolled ? 'text-rustic-tan' : 'text-rustic-mint'}`}>WHERE HERITAGE MEETS TASTE</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} className={`text-sm font-medium hover:text-rustic-orange transition-colors ${isScrolled ? 'text-rustic-dark' : 'text-white'}`}>
                  {link.name}
                </Link>
              ))}
              <Link to="/order" className="bg-rustic-orange text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-rustic-tan transition-all flex items-center gap-2 shadow-sm">
                <ShoppingBag size={18} />
                Order Online
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-4 lg:hidden">
              <Link to="/order" className="relative p-2">
                <ShoppingBag className={isScrolled ? 'text-rustic-dark' : 'text-white'} size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rustic-orange text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 ${isScrolled ? 'text-rustic-dark' : 'text-white'}`}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Overlay Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t">
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map(link => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className="text-lg font-medium border-b border-gray-100 pb-2 text-rustic-dark"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  to="/order" 
                  className="bg-rustic-orange text-white py-3 rounded-lg text-center font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Order Now
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow pt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/book" element={<Reservations />} />
            <Route path="/meal-prep" element={<MealPrep />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/events" element={<Corporate />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order" element={<Ordering cart={cart} addToCart={addToCart} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-rustic-dark text-white py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <LogoHorns className="w-12 h-12" color="#a9916b" />
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold font-serif leading-none tracking-tight">KGOMO'S</h3>
                    <span className="text-[7px] tracking-[0.25em] text-rustic-tan font-semibold">WHERE HERITAGE MEETS TASTE</span>
                  </div>
                </div>
                <p className="text-rustic-mint/80 leading-relaxed mb-6">
                  Premium-casual family dining in Pretoria East. Artisanal wood-fired pizzas, full-service dining, and a dedicated supervised play area for the kids.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-rustic-orange transition-all"><Instagram size={20} /></a>
                  <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-rustic-orange transition-all"><Facebook size={20} /></a>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 text-rustic-orange">Quick Links</h4>
                <ul className="space-y-4 text-rustic-mint/70">
                  <li><Link to="/menu" className="hover:text-white transition-colors">Digital Menu</Link></li>
                  <li><Link to="/book" className="hover:text-white transition-colors">Book a Table</Link></li>
                  <li><Link to="/meal-prep" className="hover:text-white transition-colors">Meal Prep Service</Link></li>
                  <li><Link to="/loyalty" className="hover:text-white transition-colors">Loyalty Program</Link></li>
                  <li><Link to="/events" className="hover:text-white transition-colors">Corporate Events</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 text-rustic-orange">Visit Us</h4>
                <ul className="space-y-4 text-rustic-mint/70">
                  <li className="flex items-start gap-3">
                    <MapPin size={20} className="shrink-0 text-rustic-orange" />
                    <span>Olympus AH, Pretoria East, 0081</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={20} className="shrink-0 text-rustic-orange" />
                    <a href="tel:+27123456789" className="hover:text-white transition-colors">+27 12 345 6789</a>
                  </li>
                  <li className="pt-2">
                    <p className="font-semibold text-white mb-1">Operating Hours:</p>
                    <p>Mon - Sun: 08:00 - 21:00</p>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 text-rustic-orange">Newsletter</h4>
                <p className="text-rustic-mint/70 mb-4 text-sm">Join our mailing list for a 10% discount on your next visit.</p>
                <form action="https://formspree.io/f/xeeowazp" method="POST" className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Enter your email" 
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-rustic-orange placeholder-rustic-mint/40"
                  />
                  <button type="submit" className="bg-rustic-orange text-white py-2 rounded-lg font-semibold hover:bg-rustic-tan transition-all">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-white/10 text-center text-rustic-mint/40 text-sm">
              <p>&copy; {new Date().getFullYear()} Kgomo's Restaurant. All rights reserved. POPIA Compliant.</p>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;