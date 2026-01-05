import React, { useState } from 'react';
import { Users, Briefcase, Camera, MessageSquare, ArrowRight, Quote, Coffee, Home, Truck, UtensilsCrossed, CheckCircle2 } from 'lucide-react';

const Corporate: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch('https://formspree.io/f/xeeowazp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="bg-rustic-dark text-white px-4 py-1 rounded-full font-bold text-sm mb-6 inline-block uppercase tracking-wider">Events & Catering</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 italic text-rustic-dark leading-tight">Elevated Hosting, Anywhere.</h1>
            <p className="text-xl text-rustic-green leading-relaxed mb-10">
              Whether you're hosting at our sophisticated Pretoria East venue or require premium catering at your office or home, Kgomo's delivers artisanal excellence. From boardroom breakfasts to offsite corporate retreats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#inquiry" className="bg-rustic-orange text-white px-8 py-4 rounded-full font-bold hover:bg-rustic-tan transition-all shadow-lg text-center">
                Request Event Quote
              </a>
              <button className="bg-white text-rustic-dark px-8 py-4 rounded-full font-bold border border-rustic-mint hover:bg-rustic-cream transition-all flex items-center justify-center gap-2">
                <Truck size={20} /> View Offsite Menu
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" 
              alt="Professional Event Hosting" 
              className="rounded-3xl shadow-2xl border-8 border-rustic-cream" 
            />
            <div className="absolute -top-10 -right-10 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-rustic-mint hidden md:block">
              <div className="text-4xl font-black text-rustic-orange mb-1">40</div>
              <div className="text-sm font-bold text-rustic-green uppercase tracking-widest">In-House Cap</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-rustic-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <LogoHornsBackground />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 italic">Our Catering Universe</h2>
            <p className="text-rustic-mint/60 max-w-2xl mx-auto">From intimate private dinners to large-scale corporate roadshows, we bring the Kgomo's heritage to you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Briefcase />} 
              title="Office Lunches" 
              desc="Gourmet individual bowls or platters delivered fresh to your boardroom."
            />
            <ServiceCard 
              icon={<Coffee />} 
              title="Office Breakfasts" 
              desc="Artisanal pastries, fruit parfaits, and professional mobile coffee stations."
            />
            <ServiceCard 
              icon={<Home />} 
              title="Private Dining" 
              desc="A chef-led experience in the comfort of your home. Plated excellence."
            />
            <ServiceCard 
              icon={<Truck />} 
              title="Offsite Functions" 
              desc="Full-scale catering for external venues, product launches, and retreats."
            />
            <ServiceCard 
              icon={<Users />} 
              title="Team Building" 
              desc="Interactive pizza-making sessions and collaborative wood-fired dining."
            />
            <ServiceCard 
              icon={<UtensilsCrossed />} 
              title="Bespoke Events" 
              desc="Custom menus designed around your specific theme and dietary needs."
            />
          </div>
        </div>
      </section>

      {/* On-Site Packages */}
      <section className="py-24 bg-rustic-cream/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-rustic-orange font-bold uppercase tracking-widest text-xs mb-4 block">In-House Dining</span>
            <h2 className="text-4xl font-bold mb-4 text-rustic-dark italic">Venue Packages</h2>
            <p className="text-rustic-green">Exclusive use of our Pretoria East space.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CorporatePackage 
              title="The Quick Mix" 
              price="R 195 / person" 
              features={['Shared starters (Focaccia & Salads)', 'Main choice (Pizza or Burger)', 'One soft drink or coffee']}
            />
            <CorporatePackage 
              title="The Full Executive" 
              price="R 350 / person" 
              features={['Plated starters', 'Choice of premium mains', 'Dessert selection', 'Includes technical setup']}
              premium={true}
            />
            <CorporatePackage 
              title="Artisanal Buffet" 
              price="R 285 / person" 
              features={['Wood-fired roast selection', 'Gourmet side dishes', 'Freshly baked breads', 'Fruit platter']}
            />
          </div>
        </div>
      </section>

      {/* Offsite Catering Packages */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-rustic-orange font-bold uppercase tracking-widest text-xs mb-4 block">Offsite Catering</span>
            <h2 className="text-4xl font-bold mb-4 text-rustic-dark italic">Catering Solutions</h2>
            <p className="text-rustic-green">Premium food and service delivered to your location.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CateringCard 
              title="Boardroom Breakfast"
              price="R 145 / pp"
              features={['Mini croissants & muffins', 'Yogurt & granola pots', 'Fresh fruit skewers', 'Assorted juices']}
            />
            <CateringCard 
              title="The Power Lunch"
              price="R 180 / pp"
              features={['Individual gourmet bowls', 'Artisanal wraps', 'Side salad', 'Dark chocolate brownie']}
            />
            <CateringCard 
              title="Mobile Coffee Bar"
              price="R 4500 / session"
              features={['Professional Barista', 'Unlimited premium coffees', 'Assorted milk options', 'Sweet treats tray']}
            />
            <CateringCard 
              title="Private Soirée"
              price="R 550 / pp"
              features={['On-site Private Chef', '3-Course plated menu', 'Waitron service', 'Kitchen cleanup included']}
              highlight={true}
            />
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-24 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {isSuccess ? (
            <div className="bg-rustic-cream/20 p-16 rounded-[3rem] animate-fadeIn border border-rustic-mint/30">
               <div className="w-20 h-20 bg-rustic-mint text-rustic-dark rounded-full flex items-center justify-center mb-8 mx-auto shadow-xl shadow-rustic-mint/20">
                  <CheckCircle2 size={40} />
               </div>
               <h2 className="text-4xl font-bold mb-4 text-rustic-dark italic">Inquiry Received!</h2>
               <p className="text-rustic-green mb-10 text-lg">
                 Thank you for your interest in Kgomo's events. Our events coordinator will contact you with a bespoke proposal within 24 hours.
               </p>
               <button onClick={() => setIsSuccess(false)} className="text-rustic-orange font-bold underline hover:text-rustic-tan transition-all">
                 Request another quote
               </button>
            </div>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-4 text-rustic-dark italic">Let's Plan Your Event</h2>
              <p className="text-rustic-green mb-12">Tell us about your requirements and we'll get back to you with a custom quote within 24 hours.</p>
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-rustic-tan uppercase tracking-widest ml-1">Company/Name</label>
                    <input name="company" required type="text" className="w-full px-6 py-4 rounded-xl border border-rustic-mint bg-rustic-cream/10 focus:outline-none focus:border-rustic-orange" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-rustic-tan uppercase tracking-widest ml-1">Event Type</label>
                    <select name="event_type" className="w-full px-6 py-4 rounded-xl border border-rustic-mint bg-rustic-cream/10 focus:outline-none focus:border-rustic-orange appearance-none">
                       <option>On-site Function</option>
                       <option>Office Lunch Delivery</option>
                       <option>Office Breakfast/Coffee</option>
                       <option>Private Dining (At Home)</option>
                       <option>Other Offsite Catering</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-rustic-tan uppercase tracking-widest ml-1">Date</label>
                    <input name="date" required type="date" className="w-full px-6 py-4 rounded-xl border border-rustic-mint bg-rustic-cream/10 focus:outline-none focus:border-rustic-orange" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-rustic-tan uppercase tracking-widest ml-1">Guests</label>
                    <input name="guests" required type="number" className="w-full px-6 py-4 rounded-xl border border-rustic-mint bg-rustic-cream/10 focus:outline-none focus:border-rustic-orange" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-rustic-tan uppercase tracking-widest ml-1">Message</label>
                  <textarea name="details" rows={4} placeholder="Event details (location, time, specific dietary requirements)..." className="w-full px-6 py-4 rounded-xl border border-rustic-mint bg-rustic-cream/10 focus:outline-none focus:border-rustic-orange resize-none"></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full bg-rustic-orange text-white py-5 rounded-xl font-bold text-lg hover:bg-rustic-tan transition-all flex items-center justify-center gap-2 shadow-lg shadow-rustic-orange/20 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : <>Send Inquiry <ArrowRight size={20} /></>}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

const CorporatePackage = ({ title, price, features, premium }: any) => (
  <div className={`p-10 rounded-[2rem] border transition-all shadow-sm hover:shadow-xl ${premium ? 'bg-white border-rustic-orange md:scale-105 relative z-10' : 'bg-rustic-cream/10 border-rustic-mint'}`}>
    <h3 className="text-2xl font-bold mb-1 italic text-rustic-dark">{title}</h3>
    <p className="text-3xl font-black mb-8 text-rustic-orange">{price}</p>
    <ul className="space-y-4">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-start gap-3 text-rustic-green">
          <div className="w-1.5 h-1.5 rounded-full bg-rustic-orange mt-2 shrink-0"></div>
          <span className="text-sm font-medium">{f}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CateringCard = ({ title, price, features, highlight }: any) => (
  <div className={`p-8 rounded-[2rem] border transition-all h-full flex flex-col ${highlight ? 'bg-rustic-dark text-white border-rustic-orange' : 'bg-white border-rustic-mint/30'}`}>
    <h3 className={`text-xl font-bold mb-1 italic ${highlight ? 'text-rustic-orange' : 'text-rustic-dark'}`}>{title}</h3>
    <p className={`text-2xl font-black mb-6 ${highlight ? 'text-white' : 'text-rustic-orange'}`}>{price}</p>
    <ul className="space-y-3 mb-8 flex-grow">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-center gap-2">
           <div className={`w-1 h-1 rounded-full ${highlight ? 'bg-rustic-orange' : 'bg-rustic-mint'}`}></div>
           <span className={`text-xs ${highlight ? 'text-rustic-mint/80' : 'text-rustic-green'}`}>{f}</span>
        </li>
      ))}
    </ul>
    <button className={`w-full py-3 rounded-xl text-xs font-bold border transition-all ${highlight ? 'bg-rustic-orange text-white border-rustic-orange hover:bg-white hover:text-rustic-dark' : 'border-rustic-dark text-rustic-dark hover:bg-rustic-dark hover:text-white'}`}>
       Select Package
    </button>
  </div>
);

const ServiceCard = ({ icon, title, desc }: any) => (
  <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/5 hover:bg-white/10 transition-all group">
    <div className="text-rustic-orange mb-6 group-hover:scale-110 transition-transform w-fit">{React.cloneElement(icon, { size: 32 })}</div>
    <h3 className="text-xl font-bold mb-3 italic">{title}</h3>
    <p className="text-rustic-mint/60 text-sm leading-relaxed">{desc}</p>
  </div>
);

const LogoHornsBackground = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,78 C45.5,58 20,48 10,25 C25,40 45,45 50,60 C55,45 75,40 90,25 C80,48 54.5,58 50,78 Z" fill="white" />
  </svg>
);

export default Corporate;