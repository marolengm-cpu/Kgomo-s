
import React from 'react';
import { Award, Users, Globe, Recycle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-24 bg-white">
      {/* Story Section */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-rustic-orange font-bold uppercase tracking-widest text-sm mb-4 inline-block">Since 2024</span>
          <h1 className="text-6xl font-bold mb-8 italic text-rustic-dark">Where Family Values Meet Premium Dining</h1>
          <p className="text-xl text-rustic-green leading-relaxed mb-12">
            Kgomo's was born from a simple observation: modern families in Pretoria East deserved a space where they could enjoy world-class food without compromising on their children's happiness or safety.
          </p>
          <img 
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200" 
            alt="Kgomo's Restaurant Interior" 
            className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl border-4 border-rustic-cream" 
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-rustic-cream/20 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-rustic-dark italic">Meet the Visionaries</h2>
            <p className="text-rustic-green">The hearts and minds behind Kgomo's.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <TeamMember 
              name="Modisa Maroleng" 
              role="General Manager" 
              desc="With 15 years in luxury hospitality, Modisa ensures every guest feels like royalty from the moment they walk in."
              img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500"
            />
            <TeamMember 
              name="Kgola Ledwaba" 
              role="Executive Chef" 
              desc="An artisanal food specialist obsessed with the perfect wood-fired crust and locally sourced ingredients."
              img="https://images.unsplash.com/photo-1583394828560-198044266e51?auto=format&fit=crop&q=80&w=400&h=500"
            />
          </div>
        </div>
      </section>

      {/* ESG Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-rustic-dark italic">Our Commitment to Pretoria</h2>
              <p className="text-lg text-rustic-green mb-8 leading-relaxed">
                Kgomo's is more than a restaurant; we are a hub for growth. Through our Work-Integrated Learning (WIL) program, we provide local youth with vocational training and stable employment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ESGItem icon={<Users />} title="Youth Employment" desc="40% of our staff are youth entering the workforce." />
                <ESGItem icon={<Globe />} title="Local Sourcing" desc="90% of our ingredients come from within 50km." />
                <ESGItem icon={<Award />} title="WIL Program" desc="Hands-on culinary training for local students." />
                <ESGItem icon={<Recycle />} title="Carbon Reduction" desc="Optimized energy wood ovens and zero plastic." />
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600" 
                alt="Kitchen Action" 
                className="rounded-3xl shadow-xl border-8 border-white" 
              />
              <div className="absolute -bottom-10 -left-10 bg-rustic-dark text-white p-8 rounded-2xl hidden md:block max-w-xs shadow-2xl">
                <p className="italic text-lg text-rustic-mint">"We don't just serve food, we serve the future of our community."</p>
                <p className="mt-4 font-bold text-rustic-orange">— Modisa Maroleng</p>
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
    <div className="mb-6 relative inline-block">
      <img src={img} alt={name} className="w-64 h-80 object-cover rounded-3xl shadow-lg grayscale group-hover:grayscale-0 transition-all duration-500 border-4 border-white" />
      <div className="absolute -bottom-4 -right-4 bg-rustic-orange text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">{role}</div>
    </div>
    <h3 className="text-2xl font-bold mb-2 text-rustic-dark">{name}</h3>
    <p className="text-rustic-green leading-relaxed max-w-sm mx-auto text-sm">{desc}</p>
  </div>
);

const ESGItem = ({ icon, title, desc }: any) => (
  <div className="flex gap-4">
    <div className="shrink-0 text-rustic-orange">{icon}</div>
    <div>
      <h4 className="font-bold mb-1 text-rustic-dark">{title}</h4>
      <p className="text-xs text-rustic-green font-medium">{desc}</p>
    </div>
  </div>
);

export default About;
