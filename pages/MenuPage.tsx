
import React, { useState } from 'react';
import { MenuCategory, MenuItem } from '../types';
import { Leaf, Flame, ShieldAlert, Download, Search, Sparkles, Sprout, ShieldCheck, GlassWater, Beer, Martini, Wine } from 'lucide-react';

const MENU_ITEMS: MenuItem[] = [
  // BREAKFAST
  { id: 'b1', name: 'Breakfast Bun', description: 'Seeded bun or bagel, aioli spread topped with bacon, 1 egg choice of tomato slice or mushroom finished off with rocket.', price: 80, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?auto=format&fit=crop&q=80&w=400' },
  { id: 'b2', name: 'Breakfast Waffle', description: 'Fresh waffle topped with bacon and eggs (scrambled/fried/poached) finished off with rocket and rosa tomato.', price: 95, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1459789034005-ba29c5783491?auto=format&fit=crop&q=80&w=400' },
  { id: 'b3', name: 'Mince on Waffle', description: 'Fresh waffle topped with mince bolognaise and eggs finished with cheddar and rocket.', price: 100, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1593308983838-838d8383e20d?auto=format&fit=crop&q=80&w=400' },
  { id: 'b4', name: 'Mexican Eggs', description: 'A spicy tomato chutney with spicy mince topped with eggs of choice finished off with avo and salsa.', price: 115, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' },
  { id: 'b5', name: 'Benedicts', description: 'English muffin or bagel topped with bacon, egg and hollandaise sauce. Swap for ham (+R15), spinach (+R10), or salmon (+R20).', price: 85, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&q=80&w=400' },
  { id: 'b6', name: 'Breakfast Toast', description: 'Whole wheat/Sour dough/Bagel, smashed avo topped with eggs of choice finished of with rosa tomato.', price: 85, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' },
  { id: 'b7', name: 'Omelette', description: 'Served with cheddar and a choice of toast.', price: 80, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1510629954389-c1e0da47d414?auto=format&fit=crop&q=80&w=400' },

  // STARTERS
  { id: 's1', name: 'Chicken Winglets', description: 'Double cooked winglets served BBQ or spicy with parmesan dip.', price: 110, category: MenuCategory.STARTERS, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=400' },
  { id: 's2', name: 'Panko Prawns', description: 'Crispy prawns served with peri mayo.', price: 110, category: MenuCategory.STARTERS, image: 'https://images.unsplash.com/photo-1632778149975-420e0e75ee08?auto=format&fit=crop&q=80&w=400' },
  { id: 's3', name: 'Macaroni Bites', description: 'Triple cooked mac and cheese bites served with sweet chilli sauce.', price: 95, category: MenuCategory.STARTERS, image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=400' },
  { id: 's4', name: 'Chilli Meat Balls', description: 'Perfectly seasoned meat balls served in chilli sauce finished with grilled cheddar.', price: 100, category: MenuCategory.STARTERS, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=400' },
  { id: 's5', name: 'Jalapeno Rolls', description: 'Perfectly seasoned double cheese jalapeno filled spring rolls served with chutney mayo sauce.', price: 95, category: MenuCategory.STARTERS, image: 'https://images.unsplash.com/photo-1606991350764-20059b85a9df?auto=format&fit=crop&q=80&w=400' },
  { id: 's6', name: 'Crumbed Aubergine Bites', description: 'Seasoned aubergine that\'s crumbed and fried golden brown topped with feta served with sweet chilli.', price: 80, category: MenuCategory.STARTERS, image: 'https://images.unsplash.com/photo-1625944225733-708bb3b62969?auto=format&fit=crop&q=80&w=400', dietary: ['V'] },
  { id: 's7', name: 'Crispy Chicken Strips', description: 'Butter milk batter strips served with peri mayo.', price: 90, category: MenuCategory.STARTERS, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400' },
  { id: 's8', name: 'Loaded Fries', description: 'Double cooked seasoned fries topped with bacon, spring onion, chorizo, cheese sauce, mozz and jalapeno till perfectly golden brown.', price: 95, category: MenuCategory.STARTERS, image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=400' },
  { id: 's9', name: 'Nachos', description: 'Traditional round chips topped with mix cheese, salsa finished with gaug.', price: 80, category: MenuCategory.STARTERS, image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=400' },

  // SALADS
  { id: 'sl1', name: 'Caesar Salad', description: 'Baby cos lettuce tossed in the traditional Caesar dressing topped with rosa tomato, croutons finished with pecorino shavings.', price: 100, category: MenuCategory.SALADS, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=400' },
  { id: 'sl2', name: 'Rump Steak Salad', description: '100g rump steak served on a bed of cos lettuce that\'s tossed in a feta dressing topped with red onion, cucumber, rose tomato and finished off with fresh greens.', price: 120, category: MenuCategory.SALADS, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400' },
  { id: 'sl3', name: 'Grilled Chicken Salad', description: 'Mixed greens tossed in honey mustard dressing topped with pickled carrots, cucumber, grilled chicken cubes, finished off with fresh greens.', price: 100, category: MenuCategory.SALADS, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400' },
  { id: 'sl4', name: 'Greek Salad', description: 'Fresh tomato, cucumber, green bell pepper, red onion, kalamata olives, topped with a block of feta seasoned with dried oregano drizzled with olive oil.', price: 85, category: MenuCategory.SALADS, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400', dietary: ['V'] },
  { id: 'sl5', name: 'Beetroot Salad', description: 'Mixed greens tossed in balsamic dressing, topped with crushed walnuts, beet root slices, crushed feta.', price: 90, category: MenuCategory.SALADS, image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=400', dietary: ['V'] },

  // BURGERS & PIZZAS remain as they were
  { id: 'bg1', name: 'Classic Smash Burger', description: '2x 100g patties smashed and well seasoned garnished with aioli, tomato relish, cheddar, dill pickles, mustard.', price: 140, category: MenuCategory.BURGERS, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400', dietary: ['H'] },
  { id: 'pz1', name: 'Mexican Fiesta', description: 'Mince, jalapeno, green peppers, onion, nacho chips finished off with Kgomo peri mayo.', price: 110, category: MenuCategory.PIZZAS, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400' },

  // --- NEW DRINKS SECTION ---

  // SIGNATURE COCKTAILS
  { id: 'ck1', name: 'Sunset Breeze', description: 'Premium rum, pineapple juice, coconut cream, and a splash of grenadine for that tropical glow.', price: 95, category: MenuCategory.COCKTAILS, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400' },
  { id: 'ck2', name: 'Golden Mojito', description: 'A passion fruit twist on the classic mojito, featuring fresh mint and golden brown sugar.', price: 90, category: MenuCategory.COCKTAILS, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400' },
  { id: 'ck3', name: 'Citrus Glow', description: 'Zesty vodka, orange liqueur, fresh lemon, and a crisp soda finish.', price: 85, category: MenuCategory.COCKTAILS, image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=400' },
  { id: 'ck4', name: 'Midnight Espresso', description: 'Double shot of artisanal espresso, vodka, and house-made coffee liqueur.', price: 105, category: MenuCategory.COCKTAILS, image: 'https://images.unsplash.com/photo-1545438102-799c3991ffb2?auto=format&fit=crop&q=80&w=400' },
  { id: 'ck5', name: 'Island Kiss', description: 'Smooth white rum, ripe mango puree, fresh lime, and garden mint.', price: 95, category: MenuCategory.COCKTAILS, image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&q=80&w=400' },
  { id: 'ck6', name: 'Spiced Paradise', description: 'Dark spiced rum, cinnamon-infused syrup, and chilled pineapple.', price: 100, category: MenuCategory.COCKTAILS, image: 'https://images.unsplash.com/photo-1455621481073-d5bc1c40e3cb?auto=format&fit=crop&q=80&w=400' },
  { id: 'ck7', name: 'Blue Horizon', description: 'Premium tequila, blue curaçao, and a sharp lemon squeeze.', price: 95, category: MenuCategory.COCKTAILS, image: 'https://images.unsplash.com/photo-1595981267035-23c0210f6316?auto=format&fit=crop&q=80&w=400' },
  { id: 'ck8', name: 'Tropical Negroni', description: 'Craft gin, Campari, and our signature passion fruit syrup.', price: 110, category: MenuCategory.COCKTAILS, image: 'https://images.unsplash.com/photo-1541344999736-83eca872f241?auto=format&fit=crop&q=80&w=400' },
  { id: 'ck9', name: 'Summer Drift', description: 'Vodka, tart cranberry juice, and fresh zesty lime.', price: 85, category: MenuCategory.COCKTAILS, image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=400' },
  { id: 'ck10', name: 'Peach Whisper', description: 'Sweet peach schnapps, premium vodka, and refreshing tonic.', price: 90, category: MenuCategory.COCKTAILS, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400' },

  // REFRESHING MOCKTAILS
  { id: 'mk1', name: 'Berry Bliss', description: 'Muddled fresh forest berries, mint, and house-made lemonade.', price: 65, category: MenuCategory.MOCKTAILS, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', dietary: ['V', 'H'] },
  { id: 'mk2', name: 'Citrus Splash', description: 'Fresh orange, lemon, and lime slices topped with soda water.', price: 60, category: MenuCategory.MOCKTAILS, image: 'https://images.unsplash.com/photo-1517043583464-4744a8121429?auto=format&fit=crop&q=80&w=400', dietary: ['V', 'H'] },
  { id: 'mk3', name: 'Pineapple Cooler', description: 'Chilled pineapple, organic coconut water, and a touch of mint.', price: 65, category: MenuCategory.MOCKTAILS, image: 'https://images.unsplash.com/photo-1497534446932-c946e7316ad1?auto=format&fit=crop&q=80&w=400', dietary: ['V', 'H'] },
  { id: 'mk4', name: 'Tropical Dream', description: 'Vibrant mango, passion fruit, and sparkling soda.', price: 65, category: MenuCategory.MOCKTAILS, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', dietary: ['V', 'H'] },
  { id: 'mk5', name: 'Virgin Mojito', description: 'Fresh lime, garden mint, and crisp sparkling water.', price: 60, category: MenuCategory.MOCKTAILS, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', dietary: ['V', 'H'] },
  { id: 'mk6', name: 'Strawberry Fizz', description: 'Muddled strawberries, fresh lemon, and chilled ginger ale.', price: 70, category: MenuCategory.MOCKTAILS, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', dietary: ['V', 'H'] },
  { id: 'mk7', name: 'Honey Lime Spark', description: 'Local honey, fresh lime, and a sparkling finish.', price: 65, category: MenuCategory.MOCKTAILS, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', dietary: ['V', 'H'] },
  { id: 'mk8', name: 'Minty Melon', description: 'Refreshing watermelon, garden mint, and a hint of lime.', price: 70, category: MenuCategory.MOCKTAILS, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', dietary: ['V', 'H'] },
  { id: 'mk9', name: 'Coco Lush', description: 'Rich coconut milk, vanilla bean syrup, and soda.', price: 75, category: MenuCategory.MOCKTAILS, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', dietary: ['V', 'H'] },
  { id: 'mk10', name: 'Raspberry Twist', description: 'Raspberry puree, sharp lemon, and refreshing tonic.', price: 70, category: MenuCategory.MOCKTAILS, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', dietary: ['V', 'H'] },

  // HOUSE SPECIALS
  { id: 'hs1', name: 'Sangria Sunset', description: 'Red wine blend, fresh orange, crisp apple, and forest berries.', price: 120, category: MenuCategory.HOUSE_SPECIALS, image: 'https://images.unsplash.com/photo-1595977437232-9a0426ebfe4c?auto=format&fit=crop&q=80&w=400' },
  { id: 'hs2', name: 'Citrus Spritz', description: 'Italian Prosecco, fresh orange, and a splash of soda.', price: 110, category: MenuCategory.HOUSE_SPECIALS, image: 'https://images.unsplash.com/photo-1543158061-0428a101d9b0?auto=format&fit=crop&q=80&w=400' },
  { id: 'hs3', name: 'Passionfruit Mule', description: 'Craft vodka, spicy ginger beer, and ripe passionfruit.', price: 95, category: MenuCategory.HOUSE_SPECIALS, image: 'https://images.unsplash.com/photo-1513267048331-5611cad62e41?auto=format&fit=crop&q=80&w=400' },
  { id: 'hs4', name: 'Rosé Blush', description: 'Dry Rosé wine, elderflower liqueur, and chilled soda.', price: 100, category: MenuCategory.HOUSE_SPECIALS, image: 'https://images.unsplash.com/photo-1558001235-5290b0799462?auto=format&fit=crop&q=80&w=400' },
  { id: 'hs5', name: 'Smoky Old Fashioned', description: 'Bourbon whiskey, aromatic bitters, and a touch of smoked oak.', price: 130, category: MenuCategory.HOUSE_SPECIALS, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400' },
  { id: 'hs6', name: 'Tropical Whiskey Sour', description: 'Whiskey, fresh pineapple juice, and zesty lemon.', price: 125, category: MenuCategory.HOUSE_SPECIALS, image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=400' },
  { id: 'hs7', name: 'Cucumber Collins', description: 'Botanical gin, fresh cucumber ribbons, and lime.', price: 115, category: MenuCategory.HOUSE_SPECIALS, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400' },
  { id: 'hs8', name: 'Spicy Paloma', description: 'Tequila, fresh grapefruit, and a hint of fresh chili.', price: 120, category: MenuCategory.HOUSE_SPECIALS, image: 'https://images.unsplash.com/photo-1559143247-8a4a25992982?auto=format&fit=crop&q=80&w=400' },
  { id: 'hs9', name: 'Vanilla Breeze', description: 'Aged rum, Madagascar vanilla syrup, and soda.', price: 105, category: MenuCategory.HOUSE_SPECIALS, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400' },
  { id: 'hs10', name: 'Family Fruit Punch', description: 'A large blend of mixed seasonal fruit juices and fresh mint.', price: 140, category: MenuCategory.HOUSE_SPECIALS, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', dietary: ['V', 'H'] },

  // STANDARD BEERS
  { id: 'br1', name: 'Classic Lager', description: 'Smooth, crisp, and exceptionally refreshing. The local favorite.', price: 45, category: MenuCategory.BEERS, image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&q=80&w=400' },
  { id: 'br2', name: 'Golden Ale', description: 'Light malt body with delicate floral hop notes.', price: 50, category: MenuCategory.BEERS, image: 'https://images.unsplash.com/photo-1550341919-88000c80655d?auto=format&fit=crop&q=80&w=400' },
  { id: 'br3', name: 'Tropical IPA', description: 'Bold fruity hop character with a signature bitter finish.', price: 55, category: MenuCategory.BEERS, image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&q=80&w=400' },
  { id: 'br4', name: 'Stout Supreme', description: 'Rich roasted malt with hints of dark coffee and chocolate.', price: 55, category: MenuCategory.BEERS, image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&q=80&w=400' },
  { id: 'br5', name: 'Light Pilsner', description: 'Easy-drinking, crisp body with subtle citrus undertones.', price: 45, category: MenuCategory.BEERS, image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&q=80&w=400' },
];

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-24 bg-rustic-cream/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-rustic-dark italic">Kgomos Menu</h1>
            <p className="text-rustic-green italic font-medium">Freshly wood-fired and traditionally prepared.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-rustic-tan" size={18} />
              <input 
                type="text" 
                placeholder="Search menu..." 
                className="w-full pl-10 pr-4 py-2 rounded-full border border-rustic-mint bg-white focus:outline-none focus:border-rustic-orange"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 text-rustic-orange font-semibold hover:underline">
              <Download size={18} /> Download PDF
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-6 mb-12 no-scrollbar gap-2">
          {['All', ...Object.values(MenuCategory)].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
                activeCategory === cat 
                ? 'bg-rustic-orange text-white shadow-lg shadow-rustic-orange/20' 
                : 'bg-white text-rustic-dark hover:bg-rustic-mint/30 border border-rustic-mint'
              }`}
            >
              <div className="flex items-center gap-2">
                 {cat === MenuCategory.COCKTAILS && <Martini size={14} />}
                 {cat === MenuCategory.MOCKTAILS && <GlassWater size={14} />}
                 {cat === MenuCategory.BEERS && <Beer size={14} />}
                 {cat === MenuCategory.HOUSE_SPECIALS && <Wine size={14} />}
                 {cat}
              </div>
            </button>
          ))}
        </div>

        {/* Interactive Build Your Own Section */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-rustic-dark rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-all border border-white/5">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-rustic-orange" size={24} />
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-rustic-orange text-white uppercase tracking-widest">Interactive</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 italic">Build Your Own Breakfast</h2>
                <p className="text-rustic-mint/70 text-sm mb-6 max-w-sm">From R10. Choose your protein, eggs, sides and toast just the way you like them.</p>
                <button className="bg-white text-rustic-dark px-6 py-2 rounded-full font-bold hover:bg-rustic-cream transition-all text-sm">
                  Start Building
                </button>
              </div>
              <div className="absolute top-0 right-0 h-full w-1/3 opacity-20 pointer-events-none group-hover:scale-110 transition-transform">
                <UtensilsIcon className="w-full h-full text-rustic-orange" />
              </div>
           </div>

           <div className="bg-rustic-dark rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-all border border-white/5">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="text-rustic-orange" size={24} />
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-rustic-orange text-white uppercase tracking-widest">Artisanal</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 italic">Build Your Own Pizza</h2>
                <p className="text-rustic-mint/70 text-sm mb-6 max-w-sm">R30 base + toppings. Fired in our artisanal wood oven for that perfect smoky crust.</p>
                <button className="bg-white text-rustic-dark px-6 py-2 rounded-full font-bold hover:bg-rustic-cream transition-all text-sm">
                  Start Crafting
                </button>
              </div>
              <div className="absolute top-0 right-0 h-full w-1/3 opacity-20 pointer-events-none group-hover:scale-110 transition-transform">
                <Flame className="w-full h-full text-rustic-orange" />
              </div>
           </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-rustic-mint/20">
              <div className="h-48 relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                {/* Dietary Icons Overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {item.dietary?.includes('V') && (
                    <div className="bg-green-500 text-white p-2 rounded-full shadow-lg border border-white/20" title="Vegetarian"><Leaf size={14} /></div>
                  )}
                  {item.dietary?.includes('VG') && (
                    <div className="bg-emerald-600 text-white p-2 rounded-full shadow-lg border border-white/20" title="Vegan"><Sprout size={14} /></div>
                  )}
                  {item.dietary?.includes('GF') && (
                    <div className="bg-amber-600 text-white p-2 rounded-full shadow-lg border border-white/20" title="Gluten Free"><ShieldAlert size={14} /></div>
                  )}
                  {item.dietary?.includes('H') && (
                    <div className="bg-rustic-orange text-white p-2 rounded-full shadow-lg border border-white/20" title="Halal"><ShieldCheck size={14} /></div>
                  )}
                </div>

                {/* Drink Tag Overlay */}
                {[MenuCategory.COCKTAILS, MenuCategory.MOCKTAILS, MenuCategory.HOUSE_SPECIALS, MenuCategory.BEERS].includes(item.category) && (
                   <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-rustic-dark border border-rustic-mint/30">
                        {item.category}
                      </span>
                   </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-rustic-dark italic">{item.name}</h3>
                  <span className="text-lg font-bold text-rustic-orange">R {item.price}</span>
                </div>
                <p className="text-rustic-green/80 text-sm mb-6 line-clamp-2">{item.description}</p>
                <button className="w-full py-2 rounded-lg border-2 border-rustic-orange text-rustic-orange font-bold hover:bg-rustic-orange hover:text-white transition-all">
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UtensilsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m12 4a2 2 0 100-4m0 4a2 2 0 110-4" />
  </svg>
);

export default MenuPage;
