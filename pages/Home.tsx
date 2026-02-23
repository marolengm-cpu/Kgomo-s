import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, Utensils, Star, ShieldCheck, Heart, ArrowRight, Instagram, ExternalLink, Plus, Minus, HelpCircle, MessageSquareQuote, Briefcase, Package, Cake, Sparkles } from 'lucide-react';

const LogoHorns = ({ className = "w-8 h-8", color = "#D4AF37" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M 50 85 C 45 70 30 60 10 50 C 30 65 45 75 50 85 C 55 75 70 65 90 50 C 70 60 55 70 50 85 Z" 
      fill={color} 
      className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
    />
    <path 
      d="M 50 82 C 48 70 35 62 15 55 C 32 68 46 76 50 82 C 54 76 68 68 85 55 C 65 62 52 70 50 82 Z" 
      fill="white" 
      fillOpacity="0.15"
    />
  </svg>
);

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is the kids' play area really supervised?",
      a: "Yes! We have dedicated, trained staff in our 16m² Kids' Zone during all operating hours. They ensure children aged 3-10 are safe and engaged with our weekly activity themes while parents dine."
    },
    {
      q: "Do you accommodate dietary requirements?",
      a: "Absolutely. Our menu features a wide range of Vegetarian (V), Vegan (VG), Gluten-Free (GF), and Halaal-friendly (H) options. Check our digital menu for the specific icons."
    },
    {
      q: "Can I host a large group or corporate event?",
      a: "We would love to have you. Our venue can accommodate groups of up to 40 guests for birthdays, anniversaries, or corporate team-building lunches. We also offer tailored menu packages."
    },
    {
      q: "How does the Meal Prep subscription work?",
      a: "It's simple: you select your plan (5, 10, or 15 meals), customize your macros and portion sizes, and we deliver fresh, chef-prepared meals to your door every Monday. You can pause or cancel anytime."
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Branding - Upscale Chocolate & Gold Identity */}
      <section className="bg-[#2a1d15] pt-48 pb-24 text-center relative overflow-hidden bg-[radial-gradient(circle_at_center,_#4a3728_0%,_#1a0f0a_100%)]">
        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center">
           <LogoHorns className="w-full h-full scale-150" color="#ffffff" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
          <div className="animate-bounceIn flex flex-col items-center">
            <LogoHorns className="w-40 h-40 mb-10" color="#D4AF37" />
            <h1 className="text-8xl md:text-[10rem] font-bold text-[#D4AF37] mb-6 leading-none tracking-tighter italic drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
              KGOMO'S
            </h1>
            <div className="flex flex-col items-center">
               <div className="h-0.5 w-16 bg-[#D4AF37]/30 mb-6"></div>
               <p className="text-white/80 text-sm md:text-xl font-medium tracking-[0.5em] uppercase mb-4">
                 WHERE HERITAGE MEETS TASTE
               </p>
               <div className="h-0.5 w-16 bg-[#D4AF37]/30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Visual */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=1920" 
            alt="Artisanal Wood-fired Pizza" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center animate-slideUp">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl text-white font-bold italic mb-8 drop-shadow-2xl">Crafting Heritage Since 2024.</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/order" className="bg-[#D4AF37] text-rustic-dark px-12 py-5 rounded-full font-bold text-xl hover:bg-white transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#D4AF37]/20 w-full sm:w-auto">
                <ShoppingBag size={24} /> Order Online
              </Link>
              <Link to="/book" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                <Calendar size={24} /> Book Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<Utensils />} title="Wood-Fired Pizza" desc="Authentic artisanal dough topped with premium local ingredients." />
            <FeatureCard icon={<ShieldCheck />} title="Kids' Zone" desc="Supervised 16m² play area so you can dine in total peace." />
            <FeatureCard icon={<Calendar />} title="Bespoke Events" desc="Corporate or private functions for up to 40 guests." />
            <FeatureCard icon={<Heart />} title="Meal Prep" desc="Macro-balanced meals delivered fresh every Monday." />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-rustic-cream relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-rustic-orange font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Kind Words</span>
            <h2 className="text-5xl font-bold text-rustic-dark italic">From Our Family To Yours</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ReviewCard author="Lerato M." text="The best pizza in Pretoria East! Finally a place where we can dine properly while the kids are safe and happy." />
            <ReviewCard author="Sarah J." text="Meal prep has changed my life. Fresh, high protein, and tastes better than my own cooking!" />
            <ReviewCard author="Pieter V." text="Top-tier corporate venue. The service is seamless and the ribs are exceptional." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-rustic-dark italic">Your Questions, Answered</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-2 rounded-3xl border-rustic-mint/30 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left hover:bg-rustic-cream/50 transition-colors"
                >
                  <span className="text-lg font-bold text-rustic-dark">{faq.q}</span>
                  <div className={`p-2 rounded-full ${openFaq === index ? 'bg-rustic-orange text-white' : 'bg-rustic-mint/20 text-rustic-orange'}`}>
                    {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-8 text-rustic-green leading-relaxed animate-fadeIn">
                    {faq.a}
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

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="p-10 border-2 border-rustic-mint/20 rounded-[3rem] hover:shadow-2xl transition-all hover:-translate-y-2 bg-white group">
    <div className="mb-8 text-[#D4AF37] group-hover:scale-110 transition-transform">{React.cloneElement(icon, { size: 40 })}</div>
    <h3 className="text-2xl font-bold mb-4 text-rustic-dark italic">{title}</h3>
    <p className="text-rustic-green leading-relaxed text-sm font-medium">{desc}</p>
  </div>
);

const ReviewCard = ({ author, text }: any) => (
  <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-rustic-mint/30 hover:shadow-xl transition-all">
    <div className="flex text-[#D4AF37] mb-6">
      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
    </div>
    <p className="text-rustic-dark mb-8 italic">"{text}"</p>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-rustic-cream flex items-center justify-center font-bold text-rustic-tan uppercase text-sm">
        {author.charAt(0)}
      </div>
      <div className="font-bold text-rustic-dark">{author}</div>
    </div>
  </div>
);

export default Home;