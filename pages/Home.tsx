import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Calendar, Utensils, ShieldCheck, 
  Heart, ArrowRight, Star, Plus, Minus, 
  ChevronRight, Play, Award, Users
} from 'lucide-react';
import { LogoHorns } from '../App';

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is the kids' play area really supervised?",
      a: "Yes! We have dedicated, trained staff in our Kids' Zone during all operating hours. They ensure children are safe and engaged while parents dine."
    },
    {
      q: "Do you accommodate dietary requirements?",
      a: "Absolutely. Our menu features a wide range of Vegetarian, Vegan, Gluten-Free, and Halaal-friendly options. Check our digital menu for specific icons."
    },
    {
      q: "Can I host a large group or corporate event?",
      a: "We would love to have you. Our venue can accommodate groups for birthdays, anniversaries, or corporate team-building lunches. We also offer tailored menu packages."
    },
    {
      q: "How does the Meal Prep subscription work?",
      a: "It's simple: select your plan, customize your macros, and we deliver fresh, chef-prepared meals to your door every Monday. You can pause or cancel anytime."
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&auto=format&fit=crop')] bg-cover bg-center opacity-30 animate-heroZoom"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/20 to-dark/80"></div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto animate-slideUp">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gold/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-gold/20 animate-pulse">
              <LogoHorns className="w-12 h-12" />
            </div>
          </div>
          <p className="text-gold text-[10px] md:text-xs font-black tracking-[8px] uppercase mb-8">Olympus AH · Pretoria East · Est. 2025</p>
          <h1 className="text-white text-6xl md:text-9xl font-bold leading-[0.85] mb-8 font-serif">
            Where Heritage<br /><em className="text-gold italic font-normal">Meets Taste</em>
          </h1>
          <p className="text-white/60 text-xs md:text-sm font-black tracking-[4px] uppercase mb-12 max-w-2xl mx-auto leading-relaxed">
            Wood-Fired Artistry · Local Heritage · Premium Dining Experience
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/menu" className="bg-gold text-dark px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 shadow-2xl shadow-gold/20 group">
              <ShoppingBag size={18} /> Explore Menu <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/book" className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-dark transition-all flex items-center justify-center gap-3 group">
              <Calendar size={18} /> Book a Table <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40 text-[10px] font-black tracking-[4px] uppercase">
          <span className="animate-bounce">Scroll</span>
          <div className="w-px h-16 bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gold animate-[scrollLine_2.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <div className="bg-dark grid grid-cols-2 lg:grid-cols-4 border-y border-white/5">
        <FeatureItem icon="🔥" title="Wood-Fired" desc="Authentic 550°C artisan crusts" />
        <FeatureItem icon="👨‍👩‍👧" title="Family First" desc="Supervised kids' play zone" />
        <FeatureItem icon="🥗" title="Meal Prep" desc="Diabetic & gym nutrition plans" />
        <FeatureItem icon="🎉" title="Bespoke Events" desc="Corporate & private hosting" />
      </div>

      {/* ABOUT SECTION */}
      <section className="py-32 px-4 md:px-6 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gold/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop" 
              alt="Kgomo's Interior" 
              className="w-full h-[500px] md:h-[700px] object-cover rounded-[3rem] shadow-2xl relative z-10 border border-gold/10"
            />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 md:w-56 md:h-56 bg-dark rounded-[3rem] flex flex-col items-center justify-center text-gold shadow-2xl border border-gold/20 z-20 animate-float">
              <span className="text-4xl md:text-6xl font-bold font-serif mb-2">246</span>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-center leading-tight text-white/60">m² Licensed<br />Venue</span>
            </div>
          </div>
          
          <div className="relative">
            <span className="text-gold text-[10px] font-black tracking-[6px] uppercase mb-6 block">Our Legacy</span>
            <h2 className="text-5xl md:text-7xl font-bold text-dark leading-[1.1] mb-10 font-serif">
              A Legacy of Flavour.<br /><em className="text-gold italic font-normal">A Haven for Family.</em>
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8 font-medium">
              Kgomo's is Pretoria East's premier family dining destination. Nestled in the tranquil Olympus AH, we offer a sophisticated yet approachable escape where artisanal craftsmanship meets the warmth of home.
            </p>
            <p className="text-muted text-lg leading-relaxed mb-12 font-medium">
              Our culinary philosophy is simple: respect the ingredient, master the flame. Under the guidance of Chef Kgola Ledwaba, we bring you a menu that celebrates local heritage through modern techniques and wood-fired excellence.
            </p>
            
            <div className="grid grid-cols-3 gap-12 border-t border-gold/20 pt-12">
              <StatItem num="120+" label="Artisan Dishes" />
              <StatItem num="4.8★" label="Guest Rating" />
              <StatItem num="200+" label="Weekly Guests" />
            </div>
          </div>
        </div>
      </section>

      {/* MENU CATEGORIES PREVIEW */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-gold text-[10px] font-black tracking-[6px] uppercase mb-4 block">Our Menu</span>
              <h2 className="text-5xl md:text-6xl font-bold text-dark font-serif leading-tight">Something for <em className="text-gold italic font-normal">Everyone</em></h2>
            </div>
            <Link to="/menu" className="text-gold font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:text-dark transition-colors group">
              View Full Menu <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CategoryCard img="https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=700&auto=format&fit=crop" name="Starters & Snacks" count="8 options" />
            <CategoryCard img="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700&auto=format&fit=crop" name="Wood-Fired Pizza" count="14 varieties" />
            <CategoryCard img="https://images.unsplash.com/photo-1558030006-450675393462?w=700&auto=format&fit=crop" name="Grills & Steaks" count="6 premium cuts" />
            <CategoryCard img="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop" name="Premium Burgers" count="5 stacked builds" />
            <CategoryCard img="https://images.unsplash.com/photo-1547592180-85f173990554?w=700&auto=format&fit=crop" name="Meal Prep Plans" count="Diabetic · Gym · Wellness" />
            <CategoryCard img="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=700&auto=format&fit=crop" name="Desserts" count="6 sweet endings" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 bg-dark text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold rounded-full blur-[150px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-gold text-[10px] font-black tracking-[6px] uppercase mb-6 block">Kind Words</span>
            <h2 className="text-5xl md:text-6xl font-bold font-serif italic">From Our Family To Yours</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ReviewCard author="Lerato M." text="The best pizza in Pretoria East! Finally a place where we can dine properly while the kids are safe and happy." />
            <ReviewCard author="Sarah J." text="Meal prep has changed my life. Fresh, high protein, and tastes better than my own cooking!" />
            <ReviewCard author="Pieter V." text="Top-tier corporate venue. The service is seamless and the ribs are exceptional." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-cream">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <span className="text-gold text-[10px] font-black tracking-[6px] uppercase mb-6 block">Common Queries</span>
            <h2 className="text-5xl font-bold text-dark font-serif italic">Your Questions, Answered</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-[2rem] overflow-hidden bg-white shadow-xl border border-gold/5 group">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left hover:bg-gold/5 transition-all"
                >
                  <span className="text-xl font-bold text-dark font-serif">{faq.q}</span>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${openFaq === index ? 'bg-gold text-dark rotate-180' : 'bg-gold/10 text-gold'}`}>
                    <ChevronRight size={20} className="rotate-90" />
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-8 text-muted leading-relaxed font-medium animate-fadeIn">
                    <div className="pt-4 border-t border-gold/10">
                      {faq.a}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }: any) => (
  <div className="p-10 flex items-center gap-6 border-r border-white/5 last:border-r-0 hover:bg-white/5 transition-all group">
    <span className="text-4xl group-hover:scale-110 transition-transform duration-500">{icon}</span>
    <div>
      <h4 className="text-gold text-[10px] font-black uppercase tracking-[0.3em] mb-2">{title}</h4>
      <p className="text-white/40 text-[10px] font-medium leading-tight uppercase tracking-widest">{desc}</p>
    </div>
  </div>
);

const StatItem = ({ num, label }: any) => (
  <div className="text-center group">
    <div className="text-4xl md:text-5xl font-bold text-gold font-serif mb-2 group-hover:scale-110 transition-transform duration-500">{num}</div>
    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">{label}</div>
  </div>
);

const CategoryCard = ({ img, name, count }: any) => (
  <Link to="/menu" className="group relative overflow-hidden rounded-[2.5rem] block shadow-2xl">
    <img src={img} alt={name} className="w-full h-96 object-cover transition-transform duration-1000 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent flex flex-col justify-end p-10">
      <h3 className="text-white text-3xl font-bold font-serif mb-2">{name}</h3>
      <p className="text-gold text-[10px] font-black uppercase tracking-[0.3em]">{count}</p>
    </div>
    <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0">
      <ArrowRight size={20} />
    </div>
  </Link>
);

const ReviewCard = ({ author, text }: any) => (
  <div className="bg-white/5 backdrop-blur-md p-12 rounded-[2.5rem] border border-white/10 hover:border-gold/30 transition-all group hover:-translate-y-2">
    <div className="flex text-gold mb-8 gap-1">
      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" className="group-hover:scale-110 transition-transform" />)}
    </div>
    <p className="text-white/80 mb-10 italic font-serif text-xl leading-relaxed">"{text}"</p>
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center font-black text-gold uppercase text-sm border border-gold/20">
        {author.charAt(0)}
      </div>
      <div>
        <div className="font-black text-white text-[10px] uppercase tracking-[0.3em] mb-1">{author}</div>
        <div className="text-[8px] font-black text-gold uppercase tracking-widest">Verified Guest</div>
      </div>
    </div>
  </div>
);

export default Home;
