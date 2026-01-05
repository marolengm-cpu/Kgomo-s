
import React from 'react';
import { Shield, Sparkles, Cake, Star, UserCheck, Timer } from 'lucide-react';

const Kids: React.FC = () => {
  return (
    <div className="pt-24 pb-24 bg-white overflow-hidden">
      {/* Hero */}
      <section className="container mx-auto px-4 md:px-6 mb-24 relative">
        <div className="bg-rustic-mint/30 rounded-[3rem] p-12 md:p-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="bg-white text-rustic-green px-4 py-1 rounded-full font-bold text-sm mb-6 inline-block uppercase tracking-wider">Parent Approved</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 italic text-rustic-dark">The Ultimate Kids' Zone</h1>
            <p className="text-xl text-rustic-green leading-relaxed mb-8">
              A 16m² world of supervised wonder. Let your little explorers play while you savor your meal in peace.
            </p>
            <div className="flex gap-4">
              <button className="bg-rustic-orange text-white px-8 py-4 rounded-full font-bold hover:bg-rustic-tan transition-all shadow-lg">
                Book a Birthday
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <img 
              src="https://images.unsplash.com/photo-1566415111163-f1118bc00938?auto=format&fit=crop&q=80&w=600" 
              alt="Safe Kids Play Area" 
              className="rounded-3xl shadow-2xl rotate-3 border-8 border-white" 
            />
            <div className="absolute -top-6 -right-6 bg-rustic-dark p-6 rounded-2xl shadow-xl flex flex-col items-center">
              <span className="text-4xl font-bold text-rustic-orange">3-10</span>
              <span className="text-xs font-bold text-rustic-mint uppercase tracking-widest">Ages</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-rustic-cream/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-rustic-dark italic">Safety & Fun Combined</h2>
            <p className="text-rustic-green">Our play area is designed for exploration and managed for total peace of mind.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature icon={<UserCheck size={32} />} title="Professional Childcare" desc="Our supervisors are trained in pediatric first aid and child engagement." />
            <Feature icon={<Shield size={32} />} title="Safety First" desc="Sanitized equipment, soft edges, and high-visibility glass partitions." />
            <Feature icon={<Timer size={32} />} title="Timed Access" desc="Play slots managed to ensure the zone never gets overcrowded." />
          </div>
        </div>
      </section>

      {/* Birthday Packages */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-rustic-dark italic">Unforgettable Birthday Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Package 
            name="The Mini Chef" 
            price="R 185 / child" 
            features={['Mini pizza making session', 'Supervised play (2 hours)', 'Custom birthday hat', 'Fruit juice boxes']} 
            color="bg-rustic-mint/20"
          />
          <Package 
            name="The Ultimate Explorer" 
            price="R 250 / child" 
            features={['Build-your-own pizza', 'Supervised play (Unlimited)', 'Theme decor included', 'Party packs & Ice cream']} 
            color="bg-rustic-dark text-white"
          />
        </div>
      </section>

      {/* Activity Themes */}
      <section className="bg-rustic-orange py-16 text-white">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 italic">Weekly Activity Themes</h2>
            <p className="text-rustic-mint">Art, Science, Storytelling and more!</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 w-full md:w-auto no-scrollbar">
            {['Lego Week', 'Face Painting', 'Puppet Shows', 'Clay Modeling'].map(t => (
              <div key={t} className="bg-white/10 px-6 py-3 rounded-xl whitespace-nowrap font-bold backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all cursor-default">
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Feature = ({ icon, title, desc }: any) => (
  <div className="bg-white p-10 rounded-3xl shadow-sm border border-rustic-mint/30 hover:shadow-lg transition-all group">
    <div className="mb-6 text-rustic-orange group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-rustic-dark">{title}</h3>
    <p className="text-rustic-green text-sm">{desc}</p>
  </div>
);

const Package = ({ name, price, features, color }: any) => (
  <div className={`p-10 rounded-[2rem] ${color} border border-rustic-mint/20 flex flex-col shadow-sm hover:shadow-xl transition-all`}>
    <h3 className="text-2xl font-bold mb-2 italic">{name}</h3>
    <p className="text-3xl font-black mb-8 text-rustic-orange">{price}</p>
    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-center gap-3">
          <Sparkles size={16} className="text-rustic-tan" />
          <span className="text-sm font-medium opacity-90">{f}</span>
        </li>
      ))}
    </ul>
    <button className={`py-4 rounded-xl font-bold border-2 transition-all ${color.includes('dark') ? 'bg-white text-rustic-dark border-white hover:bg-rustic-mint' : 'border-rustic-dark text-rustic-dark hover:bg-rustic-dark hover:text-white'}`}>
      Select Package
    </button>
  </div>
);

export default Kids;
