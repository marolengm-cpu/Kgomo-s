import React from 'react';
import { Award, Users, Globe, Recycle, Star, Heart, ShieldCheck, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      {/* Story Section */}
      <section className="container mx-auto px-4 md:px-6 mb-40">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-gold text-[10px] font-bold uppercase tracking-[6px] mb-6 inline-block">A Legacy of Flavour</span>
          <h1 className="text-5xl md:text-8xl font-bold mb-10 text-dark font-serif leading-tight">Where Heritage Meets <em className="text-gold italic font-normal">Premium Dining</em></h1>
          <p className="text-xl md:text-2xl text-muted leading-relaxed mb-20 max-w-4xl mx-auto font-medium">
            Kgomo's was born from a simple observation: modern families in Pretoria East deserved a space where they could enjoy world-class food without compromising on their children's happiness or safety.
          </p>
          <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl border border-gold/10">
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1400" 
              alt="Kgomo's Restaurant Interior" 
              className="w-full h-[600px] object-cover transition-all duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent"></div>
            <div className="absolute bottom-12 left-12 text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gold/20 backdrop-blur-md rounded-full flex items-center justify-center text-gold">
                  <Star size={24} />
                </div>
                <span className="text-white font-serif italic text-2xl">Established 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-dark py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full -translate-x-1/2 -translate-y-1/2 blur-[120px]"></div>
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full translate-x-1/2 translate-y-1/2 blur-[120px]"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-24">
            <span className="text-gold text-[10px] font-bold uppercase tracking-[4px] mb-4 block">Our Leadership</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white font-serif italic">Meet the Visionaries</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <TeamMember 
              name="Modisa Maroleng" 
              role="General Manager" 
              desc="With 15 years in luxury hospitality, Modisa ensures every guest feels like royalty from the moment they walk in."
              img="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500"
            />
            <TeamMember 
              name="Kgola Ledwaba" 
              role="Executive Chef" 
              desc="An artisanal food specialist obsessed with the perfect wood-fired crust and locally sourced ingredients."
              img="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=400&h=500"
            />
          </div>
        </div>
      </section>

      {/* ESG Section */}
      <section className="py-40 bg-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <span className="text-gold text-[10px] font-bold uppercase tracking-[4px] mb-6 block">Community Impact</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-10 text-dark font-serif italic leading-tight">Our Commitment to Pretoria</h2>
              <p className="text-lg text-muted mb-12 leading-relaxed font-medium">
                Kgomo's is more than a restaurant; we are a hub for growth. Through our Work-Integrated Learning (WIL) program, we provide local youth with vocational training and stable employment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <ESGItem icon={<Users />} title="Youth Employment" desc="40% of our staff are youth entering the workforce." />
                <ESGItem icon={<Globe />} title="Local Sourcing" desc="90% of our ingredients come from within 50km." />
                <ESGItem icon={<Award />} title="WIL Program" desc="Hands-on culinary training for local students." />
                <ESGItem icon={<Recycle />} title="Carbon Reduction" desc="Optimized energy wood ovens and zero plastic." />
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=700" 
                  alt="Kitchen Action" 
                  className="rounded-[2.5rem] shadow-2xl border border-gold/10" 
                />
              </div>
              <div className="absolute -bottom-12 -left-12 bg-dark text-white p-12 rounded-[2rem] z-20 hidden md:block max-w-sm shadow-2xl border border-gold/20">
                <p className="italic text-xl text-white/80 leading-relaxed font-serif">"We don't just serve food, we serve the future of our community."</p>
                <p className="mt-8 font-black text-gold uppercase tracking-[3px] text-[10px]">— Modisa Maroleng</p>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-gold opacity-30 rounded-tr-[3rem]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <span className="text-gold text-[10px] font-bold uppercase tracking-[4px] mb-4 block">Our Values</span>
            <h2 className="text-4xl md:text-6xl font-bold text-dark font-serif italic">The Pillars of Kgomo's</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <ValueCard 
              icon={<Heart className="text-gold" size={32} />} 
              title="Hospitality" 
              desc="We treat every guest like family, ensuring a warm and welcoming experience."
            />
            <ValueCard 
              icon={<ShieldCheck className="text-gold" size={32} />} 
              title="Quality" 
              desc="Only the finest, locally sourced ingredients make it to your plate."
            />
            <ValueCard 
              icon={<Zap className="text-gold" size={32} />} 
              title="Innovation" 
              desc="Blending traditional techniques with modern culinary creativity."
            />
            <ValueCard 
              icon={<Users className="text-gold" size={32} />} 
              title="Community" 
              desc="Investing in the future of Pretoria through youth development."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const TeamMember = ({ name, role, desc, img }: any) => (
  <div className="text-center group">
    <div className="mb-12 relative inline-block">
      <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
        <img src={img} alt={name} className="w-80 h-[450px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105" />
        <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-all duration-700"></div>
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gold text-dark px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[4px] shadow-2xl border border-white/10 whitespace-nowrap z-20 transition-transform group-hover:-translate-y-2">{role}</div>
    </div>
    <h3 className="text-3xl font-bold mb-4 text-white font-serif italic">{name}</h3>
    <p className="text-white/60 leading-relaxed max-w-sm mx-auto font-medium text-sm">{desc}</p>
  </div>
);

const ESGItem = ({ icon, title, desc }: any) => (
  <div className="flex gap-6 group">
    <div className="shrink-0 text-gold bg-white w-14 h-14 rounded-2xl border border-gold/10 flex items-center justify-center group-hover:bg-gold group-hover:text-dark transition-all duration-500 shadow-sm">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <h4 className="font-bold mb-2 text-dark text-lg font-serif italic">{title}</h4>
      <p className="text-sm text-muted font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ValueCard = ({ icon, title, desc }: any) => (
  <div className="bg-cream p-10 rounded-[2.5rem] border border-gold/5 hover:border-gold/20 transition-all group hover:-translate-y-2">
    <div className="mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
    <h4 className="text-xl font-bold text-dark font-serif mb-4">{title}</h4>
    <p className="text-sm text-muted leading-relaxed font-medium">{desc}</p>
  </div>
);

export default About;
