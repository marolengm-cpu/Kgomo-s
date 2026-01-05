
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, Utensils, Star, ShieldCheck, Heart, ArrowRight, Instagram, Bike, ExternalLink, Quote, Plus, Minus, HelpCircle, MessageSquareQuote, Briefcase, Package, Cake, Sparkles } from 'lucide-react';

const LogoHorns = ({ className = "w-8 h-8", color = "#a9916b" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,78 C45.5,58 20,48 10,25 C25,40 45,45 50,60 C55,45 75,40 90,25 C80,48 54.5,58 50,78 Z" fill={color} />
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
    },
    {
      q: "Where exactly are you located in Pretoria East?",
      a: "We are situated in the beautiful Olympus AH area, easily accessible and central to the community. You can find our exact pin on the Contact page."
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Branding Section - Logo and Slogan at the Top */}
      <section className="bg-rustic-dark pt-32 pb-16 text-center border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
          <div className="animate-bounceIn flex flex-col items-center">
            <LogoHorns className="w-24 h-24 md:w-32 md:h-32 mb-6" color="#a9916b" />
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-2 leading-none tracking-tighter font-serif">
              KGOMO'S
            </h1>
            <p className="text-rustic-orange text-lg md:text-2xl font-bold tracking-[0.45em] uppercase">
              WHERE HERITAGE MEETS TASTE.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image Section - Positioned below the branding */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=1920" 
            alt="Artisanal Wood-fired Pizza" 
            className="w-full h-full object-cover brightness-[0.5]"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl lg:text-3xl text-rustic-mint max-w-2xl mx-auto font-light leading-relaxed mb-10 drop-shadow-lg">
              Experience the soul of wood-fired artisanal dining, tailored for modern families in the heart of Pretoria East.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/order" className="bg-rustic-orange text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-rustic-tan transition-all flex items-center justify-center gap-2 shadow-xl shadow-rustic-orange/20 w-full sm:w-auto">
                <ShoppingBag size={22} /> Order Online
              </Link>
              <Link to="/book" className="bg-white text-rustic-dark px-10 py-5 rounded-full font-bold text-lg hover:bg-rustic-cream transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                <Calendar size={22} /> Book a Table
              </Link>
            </div>

            {/* Delivery Partner Quick Badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-4 animate-fadeInDelay">
               <span className="text-white/60 text-xs font-bold uppercase tracking-widest w-full mb-2">Also available on</span>
               <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-3 border border-white/20">
                  <div className="w-2 h-2 rounded-full bg-[#06C167]"></div>
                  <span className="text-white text-sm font-bold">Uber Eats</span>
               </div>
               <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-3 border border-white/20">
                  <div className="w-2 h-2 rounded-full bg-[#e21a23]"></div>
                  <span className="text-white text-sm font-bold">Mr D Food</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-rustic-dark">Crafted for Families, Built for Community</h2>
            <p className="text-rustic-green text-lg">Experience the perfect blend of artisanal food and supervised safety for your little ones.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Utensils className="text-rustic-orange" size={32} />}
              title="Wood-Fired Pizza"
              desc="Authentic artisanal dough topped with local ingredients and fired to perfection."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-rustic-orange" size={32} />}
              title="Supervised Play Area"
              desc="A safe 16m² heaven for kids (3-10 yrs) while you enjoy your dining experience."
            />
            <FeatureCard 
              icon={<Calendar className="text-rustic-orange" size={32} />}
              title="Corporate & Events"
              desc="Host your team or celebrate milestones with groups of up to 40 guests."
            />
            <FeatureCard 
              icon={<Heart className="text-rustic-orange" size={32} />}
              title="Meal Prep"
              desc="Delicious, macro-balanced meals delivered to your door every week."
            />
          </div>
        </div>
      </section>

      {/* Image Gallery Callout */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-96 md:h-auto overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1566415111163-f1118bc00938?auto=format&fit=crop&q=80&w=1000" 
            alt="Kids playing in safe area" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="bg-rustic-dark text-white p-12 md:p-24 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 italic text-rustic-orange tracking-tight">Relax while they play.</h2>
          <p className="text-lg text-rustic-mint/80 mb-8 leading-relaxed">
            Our state-of-the-art supervised play area ensures your children are safe, entertained, and engaged with weekly activity themes. It's the "me-time" you've been looking for.
          </p>
          <Link to="/kids" className="text-white font-bold flex items-center gap-2 hover:gap-4 transition-all group">
            Learn more about the Kids' Zone <ArrowRight className="group-hover:translate-x-1 transition-transform text-rustic-orange" />
          </Link>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-24 bg-rustic-cream/50 relative overflow-hidden">
        <Quote className="absolute top-10 right-10 text-rustic-dark/5 w-64 h-64" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-rustic-orange font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Testimonials</span>
            <h2 className="text-5xl font-bold text-rustic-dark italic">What Our Community Says</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ReviewCard 
              author="Lerato M."
              role="Local Resident"
              text="The best pizza in Pretoria East! The kids didn't want to leave the play area, and we finally had a conversation without interruptions. Truly a haven for parents."
            />
            <ReviewCard 
              author="Pieter V."
              role="Corporate Partner"
              text="Incredible service. We hosted a corporate lunch for 20 people and everything was seamless. Highly recommend the ribs and the executive catering packages!"
            />
            <ReviewCard 
              author="Sarah J."
              role="Meal Prep Subscriber"
              text="Love the meal prep subscription. It's saved me so much time during the week, and the macro balance is perfect for my fitness goals. Fresh and delicious every time."
            />
            <ReviewCard 
              author="Tshepo S."
              role="Weekend Regular"
              text="The vibe here is unmatched. Heritage-inspired decor with modern comfort. The artisanal dough is something special. My kids live for the LEGO activity weeks!"
            />
            <ReviewCard 
              author="Megan D."
              role="Family Diner"
              text="Safe, clean, and tasty. Those three words define Kgomo's for me. The supervised staff are wonderful with the little ones. Highly recommended for young families."
            />
            <ReviewCard 
              author="Johann B."
              role="Loyalty Member"
              text="Been a regular since Month 1. The quality never drops. The rewards program is actually generous, which is rare these days. Try the Sunset Breeze cocktail!"
            />
          </div>
          <div className="mt-16 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-rustic-orange font-bold hover:text-rustic-tan transition-colors group">
              View all 200+ Google Reviews <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* --- NEW PRICING SECTION --- */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-rustic-orange font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Plans</span>
            <h2 className="text-5xl font-bold text-rustic-dark italic mb-6 leading-tight">Transparent Pricing for Every Occasion</h2>
            <p className="text-xl text-rustic-green leading-relaxed">
              Premium experiences without the guesswork. Choose the plan that fits your life and let us handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Events Pricing */}
            <PricingCard 
              icon={<Briefcase size={36} />}
              title="Events & Functions"
              description="From intimate boardroom lunches to full corporate retreats."
              price="R 195"
              unit="per person"
              features={[
                "Tailored Artisanal Menus",
                "Full AV & Technical Support",
                "Waitron & Bar Service",
                "Up to 40 Guests On-Site"
              ]}
              link="/events"
              buttonText="Inquire Now"
              accentColor="bg-rustic-dark"
            />

            {/* Kids Area Pricing */}
            <PricingCard 
              icon={<Cake size={36} />}
              title="Kids Birthdays"
              description="Unforgettable memories in our safe, supervised haven."
              price="R 185"
              unit="per child"
              features={[
                "Supervised Play Area Access",
                "Mini Chef Pizza Session",
                "Themed Decor & Hats",
                "Party Packs Included"
              ]}
              link="/kids"
              buttonText="Plan a Party"
              accentColor="bg-rustic-orange"
              popular={true}
            />

            {/* Meal Prep Pricing */}
            <PricingCard 
              icon={<Package size={36} />}
              title="Meal Prep Sub"
              description="Macro-balanced meals delivered fresh every Monday."
              price="R 650"
              unit="per week"
              features={[
                "5, 10, or 15 Meal Plans",
                "Custom Macro Ratios",
                "Chef Kgola's Weekly Specials",
                "Pretoria East Free Delivery"
              ]}
              link="/meal-prep"
              buttonText="Subscribe"
              accentColor="bg-rustic-green"
            />

          </div>
        </div>
      </section>

      {/* New FAQ Section */}
      <section className="py-24 bg-rustic-cream/20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-rustic-orange/10 rounded-2xl text-rustic-orange">
                <HelpCircle size={32} />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-rustic-dark italic mb-4">Frequently Asked Questions</h2>
            <p className="text-rustic-green">Everything you need to know about your next visit to Kgomo's.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border-2 rounded-3xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'border-rustic-orange bg-rustic-cream/5' : 'border-rustic-mint/30 bg-white hover:border-rustic-orange/50'}`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <span className="text-lg font-bold text-rustic-dark pr-8">{faq.q}</span>
                  <div className={`shrink-0 p-2 rounded-full transition-colors ${openFaq === index ? 'bg-rustic-orange text-white' : 'bg-rustic-mint/20 text-rustic-orange'}`}>
                    {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <div className="px-6 pb-8 md:px-8 md:pb-10 text-rustic-green leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-rustic-dark rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl text-rustic-orange">
                <MessageSquareQuote size={28} />
              </div>
              <div>
                <h4 className="font-bold text-lg italic">Still have questions?</h4>
                <p className="text-rustic-mint/60 text-sm">We're here to help you plan your perfect visit.</p>
              </div>
            </div>
            <Link to="/contact" className="bg-rustic-orange text-white px-8 py-3 rounded-full font-bold hover:bg-rustic-tan transition-all whitespace-nowrap">
              Contact Us Directly
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Feed Preview */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 text-rustic-dark italic">Follow the Vibe</h2>
            <p className="text-rustic-green font-medium tracking-wide">@kgomos_pretoria on Instagram</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[
              "https://images.unsplash.com/photo-1513104890138-7c749659a591",
              "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
              "https://images.unsplash.com/photo-1559339352-11d035aa65de"
            ].map((url, i) => (
              <div key={i} className="aspect-square relative group overflow-hidden bg-rustic-cream">
                <img src={`${url}?auto=format&fit=crop&q=80&w=400`} alt="Insta" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-rustic-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="text-white" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-8 border border-rustic-mint rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 bg-white group">
    <div className="mb-6 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-rustic-dark italic">{title}</h3>
    <p className="text-rustic-green leading-relaxed text-sm">{desc}</p>
  </div>
);

const ReviewCard = ({ author, role, text }: { author: string, role: string, text: string }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-rustic-mint/30 hover:shadow-lg transition-all flex flex-col">
    <div className="flex text-rustic-orange mb-6">
      <Star size={14} fill="currentColor" />
      <Star size={14} fill="currentColor" />
      <Star size={14} fill="currentColor" />
      <Star size={14} fill="currentColor" />
      <Star size={14} fill="currentColor" />
    </div>
    <p className="text-rustic-dark mb-8 italic flex-grow leading-relaxed">"{text}"</p>
    <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
      <div className="w-10 h-10 rounded-full bg-rustic-cream flex items-center justify-center font-bold text-rustic-tan uppercase text-xs">
        {author.charAt(0)}
      </div>
      <div>
        <div className="font-bold text-rustic-dark text-sm">{author}</div>
        <div className="text-[10px] font-bold text-rustic-orange uppercase tracking-widest">{role}</div>
      </div>
    </div>
  </div>
);

const PricingCard = ({ icon, title, description, price, unit, features, link, buttonText, accentColor, popular }: any) => (
  <div className={`relative flex flex-col bg-white rounded-[3rem] p-10 border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group ${popular ? 'border-rustic-orange ring-1 ring-rustic-orange/20 shadow-xl scale-105 z-10' : 'border-rustic-mint/30'}`}>
    {popular && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rustic-orange text-white px-6 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
        <Sparkles size={12} /> Most Popular
      </div>
    )}
    
    <div className={`w-20 h-20 rounded-3xl ${accentColor} text-white flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform`}>
      {icon}
    </div>
    
    <h3 className="text-2xl font-bold text-rustic-dark italic mb-3">{title}</h3>
    <p className="text-sm text-rustic-green mb-8 leading-relaxed">
      {description}
    </p>
    
    <div className="mb-10">
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black text-rustic-dark tracking-tighter">{price}</span>
        <span className="text-rustic-tan font-bold text-sm">{unit}</span>
      </div>
      <div className="text-[10px] font-bold text-rustic-orange uppercase tracking-[0.2em] mt-2 italic">Starting from</div>
    </div>
    
    <ul className="space-y-4 mb-12 flex-grow">
      {features.map((feature: string, i: number) => (
        <li key={i} className="flex items-center gap-3">
          <ShieldCheck size={18} className="text-rustic-orange shrink-0" />
          <span className="text-sm text-rustic-green font-medium">{feature}</span>
        </li>
      ))}
    </ul>
    
    <Link 
      to={link} 
      className={`w-full py-5 rounded-2xl text-center font-bold transition-all flex items-center justify-center gap-2 ${popular ? 'bg-rustic-orange text-white hover:bg-rustic-tan shadow-lg shadow-rustic-orange/20' : 'border-2 border-rustic-dark text-rustic-dark hover:bg-rustic-dark hover:text-white'}`}
    >
      {buttonText} <ArrowRight size={18} />
    </Link>
  </div>
);

export default Home;
