import React from 'react';
import { Award, Users, Globe, Recycle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      {/* Story Section */}
      <section className="container mx-auto px-4 md:px-6 mb-32">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[#D4AF37] font-black uppercase tracking-[0.4em] text-xs mb-6 inline-block">Established 2024</span>
          <h1 className="text-7xl font-bold mb-10 italic text-[#3d2b1f] leading-tight">Where Family Values Meet Premium Dining</h1>
          <p className="text-2xl text-[#778979] leading-relaxed mb-16 max-w-4xl mx-auto">
            Kgomo's was born from a simple observation: modern families in Pretoria East deserved a space where they could enjoy world-class food without compromising on their children's happiness or safety.
          </p>
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1400" 
              alt="Kgomo's Restaurant Interior" 
              className="w-full h-[600px] object-cover rounded-[4rem] shadow-2xl border-4 border-[#fdfbf7] transition-all duration-700 group-hover:scale-[1.02]" 
            />
            <div className="absolute inset-0 rounded-[4rem] ring-1 ring-black/5"></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-[#fdfbf7] py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-bold mb-6 text-[#3d2b1f] italic">Meet the Visionaries</h2>
            <p className="text-xl text-[#778979] font-medium italic">The hearts and minds behind Kgomo's.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-5xl mx-auto">
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
      <section className="py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-5xl font-bold mb-10 text-[#3d2b1f] italic leading-tight">Our Commitment to Pretoria</h2>
              <p className="text-xl text-[#778979] mb-12 leading-relaxed">
                Kgomo's is more than a restaurant; we are a hub for growth. Through our Work-Integrated Learning (WIL) program, we provide local youth with vocational training and stable employment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <ESGItem icon={<Users />} title="Youth Employment" desc="40% of our staff are youth entering the workforce." />
                <ESGItem icon={<Globe />} title="Local Sourcing" desc="90% of our ingredients come from within 50km." />
                <ESGItem icon={<Award />} title="WIL Program" desc="Hands-on culinary training for local students." />
                <ESGItem icon={<Recycle />} title="Carbon Reduction" desc="Optimized energy wood ovens and zero plastic." />
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=700" 
                alt="Kitchen Action" 
                className="rounded-[3rem] shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-700" 
              />
              <div className="absolute -bottom-12 -left-12 bg-[#3d2b1f] text-white p-12 rounded-[2.5rem] hidden md:block max-w-sm shadow-2xl">
                <p className="italic text-xl text-[#ccdcc1] leading-relaxed">"We don't just serve food, we serve the future of our community."</p>
                <p className="mt-6 font-black text-[#D4AF37] uppercase tracking-widest text-sm">— Modisa Maroleng</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const TeamMember = ({ name, role, desc, img }: any) => (
  <div className="text-center group">
    <div className="mb-10 relative inline-block">
      <img src={img} alt={name} className="w-72 h-96 object-cover rounded-[3rem] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 border-4 border-white transform group-hover:-translate-y-2" />
      <div className="absolute -bottom-6 -right-6 bg-[#D4AF37] text-[#1a0f0a] px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl border-2 border-white">{role}</div>
    </div>
    <h3 className="text-3xl font-bold mb-4 text-[#3d2b1f] italic">{name}</h3>
    <p className="text-[#778979] leading-relaxed max-w-sm mx-auto font-medium">{desc}</p>
  </div>
);

const ESGItem = ({ icon, title, desc }: any) => (
  <div className="flex gap-5 group">
    <div className="shrink-0 text-[#D4AF37] bg-[#fdfbf7] p-4 rounded-2xl group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-500">{React.cloneElement(icon, { size: 28 })}</div>
    <div>
      <h4 className="font-bold mb-2 text-[#3d2b1f] text-lg italic">{title}</h4>
      <p className="text-sm text-[#778979] font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default About;