
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MenuCategory, MenuItem, CartItem } from '../types';
import { Leaf, Download, Search, GlassWater, Beer, Martini, Wine, Check, Heart, AlertCircle, LogIn, Plus, Minus, Coffee, Zap, Droplets } from 'lucide-react';
import { db } from '../lib/db';

interface MenuPageProps {
  updateQuantity: (item: MenuItem, delta: number) => void;
  session: any;
  cart: CartItem[];
}

const MENU_ITEMS: MenuItem[] = [
  // FOOD - BREAKFAST (Original & Meal Prep)
  { id: 'b1', name: 'Breakfast Bun', description: 'Seeded bun or bagel, aioli spread topped with bacon, 1 egg choice of tomato slice or mushroom finished off with rocket.', price: 80, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?auto=format&fit=crop&q=80&w=400' },
  { id: 'b2', name: 'Breakfast Waffle', description: 'Fresh waffle topped with bacon and eggs (scrambled/fried/poached) finished off with rocket and rosa tomato.', price: 95, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1459789034005-ba29c5783491?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-b1', name: 'Yogurt Bowl', description: 'Greek yogurt topped with seasonal fruits and a touch of honey. Diabetic friendly.', price: 70, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-b2', name: 'Oatmeal Bowl', description: 'Creamy rolled oats with cinnamon and toasted nuts. High fiber.', price: 80, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-b3', name: 'Wholewheat Egg Sandwich', description: 'Double egg on toasted wholewheat bread with a light spread.', price: 80, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-b4', name: 'Bran Granola Bowl', description: 'High-fiber bran granola served with cold milk or yogurt.', price: 85, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-b5', name: 'Egg on Wholewheat Toast', description: 'Two eggs prepared to your liking on artisanal wholewheat toast.', price: 90, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-b6', name: 'Cinnamon Oats', description: 'Warm steel-cut oats with a generous dusting of cinnamon.', price: 85, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-b7', name: 'Peanut Butter Muffins', description: 'Two protein-rich peanut butter muffins served with plain yogurt.', price: 100, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-b8', name: 'Blueberry Oat Bake', description: 'Hearty baked oats with fresh blueberries and a hint of vanilla.', price: 100, category: MenuCategory.BREAKFAST, image: 'https://images.unsplash.com/photo-1506084868730-342b1f851e05?auto=format&fit=crop&q=80&w=400' },

  // FOOD - STARTERS
  { id: 'mp-s1', name: 'Creamy Tomato Soup', description: 'Velvety smooth tomato soup served with spinach pinwheels. Vegan.', price: 100, category: MenuCategory.STARTERS, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400', dietary: ['VG'] },

  // FOOD - SALADS & BOWLS
  { id: 'mp-l1', name: 'Salad Niçoise', description: 'Classic French salad with tuna, green beans, hard-boiled eggs, and olives.', price: 105, category: MenuCategory.SALADS, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-l2', name: 'Chicken Poké Bowl', description: 'Sushi rice base topped with grilled chicken, edamame, avo, and radish.', price: 120, category: MenuCategory.SALADS, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-l3', name: 'Chicken Salad Flatbread', description: 'Warm flatbread topped with shredded chicken salad and greens.', price: 105, category: MenuCategory.TOASTIES, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-l4', name: 'Tuna Salad with Toast', description: 'Creamy tuna salad served with wholewheat toast and side greens.', price: 120, category: MenuCategory.TOASTIES, image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-l5', name: 'Wild Rice & Chicken Bowl', description: 'Nutritious wild rice served with grilled chicken breast and roasted veg.', price: 130, category: MenuCategory.SALADS, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-l6', name: 'Falafel Poké Bowl', description: 'Vegan poké bowl with crispy falafel, chickpeas, and tahini dressing.', price: 110, category: MenuCategory.SALADS, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400', dietary: ['VG'] },
  { id: 'mp-l7', name: 'Quinoa Chickpea Salad', description: 'Protein-packed quinoa and chickpea salad with fresh herbs. Vegan.', price: 110, category: MenuCategory.SALADS, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400', dietary: ['VG'] },

  // FOOD - WRAPS
  { id: 'mp-w1', name: 'Edamame Falafel Wrap', description: 'Crispy edamame falafel with hummus and salsa in a wholewheat wrap.', price: 100, category: MenuCategory.WRAPS, image: 'https://images.unsplash.com/photo-1626700051175-65108f4847e0?auto=format&fit=crop&q=80&w=400', dietary: ['VG'] },
  { id: 'mp-w2', name: 'Hummus Rainbow Wrap', description: 'Hummus, red cabbage, carrots, and spinach in a colorful vegan wrap.', price: 95, category: MenuCategory.WRAPS, image: 'https://images.unsplash.com/photo-1626700051175-65108f4847e0?auto=format&fit=crop&q=80&w=400', dietary: ['VG'] },

  // FOOD - GRILLS & MAINS
  { id: 'mp-g1', name: 'Baked Potato with Chicken', description: 'Large baked potato with roasted vegetables and succulent chicken breast.', price: 120, category: MenuCategory.GRILLS, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-g2', name: 'Brown Rice Mince Bowl', description: 'Lean beef mince ragu served over a bed of nutty brown rice.', price: 120, category: MenuCategory.GRILLS, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-g3', name: 'Chicken Veggie Stew', description: 'Hearty slow-cooked chicken and vegetable stew with brown rice.', price: 90, category: MenuCategory.GRILLS, image: 'https://images.unsplash.com/photo-1547592115-39736450090d?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-g4', name: 'Beef Noodle Stir Fry', description: 'Tender beef strips with egg noodles and garden vegetables.', price: 100, category: MenuCategory.PASTA, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-g5', name: 'Shepherd’s Pie', description: 'Traditional lean mince pie topped with sweet potato mash. Served with side salad.', price: 105, category: MenuCategory.GRILLS, image: 'https://images.unsplash.com/photo-1594002410850-2f16382173f4?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-g6', name: 'Lamb Chops with Mash', description: 'Premium lamb chops served with cauliflower mash and garden peas.', price: 195, category: MenuCategory.GRILLS, image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-g7', name: 'Pork Chops', description: 'Flame-grilled pork chops with roasted mediterranean vegetables.', price: 145, category: MenuCategory.GRILLS, image: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-g8', name: 'Shrimp Pasta', description: 'Shrimp sautéed with spinach and penne in a light herb sauce.', price: 145, category: MenuCategory.PASTA, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-g9', name: 'Steak Noodle Stir Fry', description: 'Prime steak strips with egg noodles and crisp vegetables.', price: 105, category: MenuCategory.PASTA, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-g10', name: 'Pea & Coconut Curry', description: 'Aromatic vegan curry with brown rice and fresh coconut milk.', price: 105, category: MenuCategory.GRILLS, image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=400', dietary: ['VG'] },

  // FOOD - DESSERTS
  { id: 'mp-d1', name: 'Oats & Banana Cookies', description: 'Two healthy cookies made with rolled oats and ripe bananas.', price: 40, category: MenuCategory.DESSERTS, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-d2', name: 'Peanut Butter Bars', description: 'High-protein peanut butter snack bars. No added sugar.', price: 45, category: MenuCategory.DESSERTS, image: 'https://images.unsplash.com/photo-1539136788836-399993307d03?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-d3', name: 'Apple Crumble Pie', description: 'Warm apple pie with an artisanal oat crumble topping.', price: 55, category: MenuCategory.DESSERTS, image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-d4', name: 'Berry Cheesecake Bars', description: 'Mixed berry and lemon cheesecake bars. A perfect treat.', price: 60, category: MenuCategory.DESSERTS, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-d5', name: 'Malva Pudding', description: 'Traditional South African malva pudding served with creamy custard.', price: 60, category: MenuCategory.DESSERTS, image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=400' },

  // DRINKS - SOFTS & SHAKES
  { id: 'mp-hs1', name: 'Protein Shake', description: 'High-quality whey protein shake (Chocolate/Vanilla).', price: 60, category: MenuCategory.SOFTS, image: 'https://images.unsplash.com/photo-1610725664285-7c47f633a99c?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-hs2', name: 'Diabetic Shake', description: 'Low-GI nutritional shake for steady energy levels.', price: 60, category: MenuCategory.SOFTS, image: 'https://images.unsplash.com/photo-1610725664285-7c47f633a99c?auto=format&fit=crop&q=80&w=400' },
  { id: 'mp-hs3', name: 'Vegan Protein Shake', description: 'Plant-based pea protein shake. Sugar-free.', price: 65, category: MenuCategory.SOFTS, image: 'https://images.unsplash.com/photo-1610725664285-7c47f633a99c?auto=format&fit=crop&q=80&w=400', dietary: ['VG'] },

  // Original Drinks (Preserved)
  { id: 'd-c1', name: 'Flat White', description: 'Double-shot, micro-foam (Standard 250ml)', price: 39, category: MenuCategory.COFFEE, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400' },
  { id: 'd-c2', name: 'Spanish Latte', description: 'Condensed milk, espresso, steamed milk', price: 48, category: MenuCategory.COFFEE, image: 'https://images.unsplash.com/photo-1594266336428-44c14322439b?auto=format&fit=crop&q=80&w=400' },
  { id: 'd-ck1', name: 'Jacaranda Fizz', description: 'Gin, elderflower, lemon, sparkling water', price: 95, category: MenuCategory.COCKTAILS, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400' },
  { id: 'd-w1', name: 'Diemersdal Sav.', description: 'Sauvignon Blanc (Glass)', price: 75, category: MenuCategory.WINE, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=400' },
];

const FOOD_CATEGORIES = [
  MenuCategory.BREAKFAST, MenuCategory.STARTERS, MenuCategory.SALADS, 
  MenuCategory.WRAPS, MenuCategory.TOASTIES, MenuCategory.SIDES, 
  MenuCategory.BURGERS, MenuCategory.PIZZAS, MenuCategory.PASTA, 
  MenuCategory.GRILLS, MenuCategory.DESSERTS, MenuCategory.KIDS
];

const DRINK_CATEGORIES = [
  MenuCategory.COFFEE, MenuCategory.TEA_HOT, MenuCategory.COCKTAILS, 
  MenuCategory.MOCKTAILS, MenuCategory.BEERS, MenuCategory.WINE, 
  MenuCategory.SPIRITS, MenuCategory.SOFTS
];

/**
 * Helper component to highlight matching search terms in text.
 */
const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-[#d78258]/20 text-[#d78258] rounded-sm px-0.5 no-underline">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

const MenuPage: React.FC<MenuPageProps> = ({ updateQuantity, session, cart }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialView = queryParams.get('view');
  
  const [activeTab, setActiveTab] = useState<'food' | 'drinks'>(initialView === 'drinks' ? 'drinks' : 'food');
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegetarianOnly, setIsVegetarianOnly] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [authWarning, setAuthWarning] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetchSavedItems();
    } else {
      setSavedIds([]);
      setShowFavoritesOnly(false);
    }
  }, [session]);

  useEffect(() => {
    const view = queryParams.get('view');
    if (view === 'drinks') setActiveTab('drinks');
    else if (view === 'food') setActiveTab('food');
    setActiveCategory('All');
  }, [location.search]);

  const fetchSavedItems = async () => {
    try {
      const { data, error } = await db
        .from('saved_items')
        .select('menu_item_id')
        .eq('user_id', session.user.id);

      if (error) throw error;
      setSavedIds(data?.map((item: any) => item.menu_item_id) || []);
    } catch (err) {
      console.error('Error fetching saved items:', err);
    }
  };

  const getItemCount = (menuItemId: string) => {
    return cart
      .filter(item => item.menuItemId === menuItemId)
      .reduce((acc, item) => acc + item.quantity, 0);
  };

  const handleToggleLike = async (itemId: string) => {
    if (!session) {
      setAuthWarning(true);
      setTimeout(() => setAuthWarning(false), 4000);
      return;
    }
    const isSaved = savedIds.includes(itemId);
    try {
      if (isSaved) {
        await db.from('saved_items').delete().eq('user_id', session.user.id).eq('menu_item_id', itemId);
        setSavedIds(prev => prev.filter(id => id !== itemId));
      } else {
        await db.from('saved_items').insert([{ user_id: session.user.id, menu_item_id: itemId }]);
        setSavedIds(prev => [...prev, itemId]);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const filteredItems = MENU_ITEMS.filter(item => {
    const isCorrectTab = activeTab === 'food' ? FOOD_CATEGORIES.includes(item.category) : DRINK_CATEGORIES.includes(item.category);
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(query) || 
                          item.description.toLowerCase().includes(query);
    
    const matchesVegetarian = !isVegetarianOnly || item.dietary?.includes('V') || item.dietary?.includes('VG');
    const matchesFavorites = !showFavoritesOnly || savedIds.includes(item.id);
    return isCorrectTab && matchesCategory && matchesSearch && matchesVegetarian && matchesFavorites;
  });

  const categoriesToDisplay = activeTab === 'food' ? FOOD_CATEGORIES : DRINK_CATEGORIES;

  return (
    <div className="pt-32 pb-24 bg-rustic-cream/20 min-h-screen relative">
      {authWarning && (
        <div className="fixed top-24 right-4 z-[100] animate-slideUp">
           <div className="bg-[#1a0f0a] text-white px-6 py-5 rounded-[2rem] shadow-2xl border border-white/10 flex items-center gap-4 max-w-sm">
              <div className="p-3 bg-[#d78258] rounded-2xl shrink-0">
                <AlertCircle size={24} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg italic text-[#d78258]">Login Required</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2">Members can save favorites</span>
                <Link to="/auth" className="bg-white text-[#1a0f0a] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#d78258] hover:text-white transition-all w-fit">
                   <LogIn size={12} /> Login Now
                </Link>
              </div>
           </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="space-y-6 w-full md:w-auto">
            <div className="flex bg-[#1a0f0a]/5 p-1.5 rounded-3xl w-fit border border-[#1a0f0a]/10">
              <button 
                onClick={() => { setActiveTab('food'); setActiveCategory('All'); }}
                className={`px-10 py-3 rounded-[1.25rem] text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'food' ? 'bg-[#1a0f0a] text-white shadow-xl' : 'text-[#3d2b1f] hover:bg-[#1a0f0a]/5'}`}
              >
                Food
              </button>
              <button 
                onClick={() => { setActiveTab('drinks'); setActiveCategory('All'); }}
                className={`px-10 py-3 rounded-[1.25rem] text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'drinks' ? 'bg-[#1a0f0a] text-white shadow-xl' : 'text-[#3d2b1f] hover:bg-[#1a0f0a]/5'}`}
              >
                Drinks
              </button>
            </div>
            <div>
              <h1 className="text-5xl font-bold text-[#3d2b1f] italic leading-none">{activeTab === 'food' ? 'Our Cuisine' : 'Our Cellar & Bar'}</h1>
              <p className="text-[#778979] italic font-medium mt-3">Curated with artisanal passion.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a9916b]" size={18} />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`} 
                className="w-full pl-12 pr-6 py-3.5 rounded-2xl border-2 border-[#ccdcc1]/30 bg-white focus:outline-none focus:border-[#d78258] shadow-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto pb-6 mb-12 no-scrollbar gap-3 items-center">
          {session && (
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`px-7 py-3 rounded-2xl whitespace-nowrap text-sm font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                showFavoritesOnly 
                ? 'bg-[#d78258] text-white shadow-lg border-[#d78258]' 
                : 'bg-white text-[#d78258] hover:bg-orange-50 border-[#d78258]/20'
              }`}
            >
              <Heart size={14} fill={showFavoritesOnly ? "currentColor" : "none"} /> Favorites
            </button>
          )}

          {activeTab === 'food' && (
            <button
              onClick={() => setIsVegetarianOnly(!isVegetarianOnly)}
              className={`px-7 py-3 rounded-2xl whitespace-nowrap text-sm font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                isVegetarianOnly 
                ? 'bg-[#778979] text-white shadow-lg border-[#778979]' 
                : 'bg-white text-[#778979] hover:bg-green-50 border-[#778979]/20'
              }`}
            >
              <Leaf size={14} /> Veg
            </button>
          )}

          <div className="w-[2px] h-8 bg-[#ccdcc1]/30 mx-2 shrink-0"></div>

          <button
            onClick={() => setActiveCategory('All')}
            className={`px-7 py-3 rounded-2xl whitespace-nowrap text-sm font-black uppercase tracking-widest transition-all border-2 ${
              activeCategory === 'All' 
              ? 'bg-[#1a0f0a] text-white shadow-xl border-[#1a0f0a]' 
              : 'bg-white text-[#3d2b1f] hover:bg-[#ccdcc1]/20 border-[#ccdcc1]/30'
            }`}
          >
            All
          </button>

          {categoriesToDisplay.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-7 py-3 rounded-2xl whitespace-nowrap text-sm font-black uppercase tracking-widest transition-all border-2 ${
                activeCategory === cat 
                ? 'bg-[#1a0f0a] text-white shadow-xl border-[#1a0f0a]' 
                : 'bg-white text-[#3d2b1f] hover:bg-[#ccdcc1]/20 border-[#ccdcc1]/30'
              }`}
            >
              <div className="flex items-center gap-2">
                 {cat === MenuCategory.COCKTAILS && <Martini size={14} />}
                 {cat === MenuCategory.MOCKTAILS && <GlassWater size={14} />}
                 {cat === MenuCategory.BEERS && <Beer size={14} />}
                 {cat === MenuCategory.WINE && <Wine size={14} />}
                 {cat === MenuCategory.COFFEE && <Coffee size={14} />}
                 {cat === MenuCategory.TEA_HOT && <Droplets size={14} />}
                 {cat === MenuCategory.SPIRITS && <Zap size={14} />}
                 {cat}
              </div>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map(item => {
            const countInCart = getItemCount(item.id);
            const isLiked = savedIds.includes(item.id);
            return (
              <div key={item.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-[#ccdcc1]/20 flex flex-col relative transform hover:-translate-y-2">
                <div className="h-64 relative overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  <button 
                    onClick={() => handleToggleLike(item.id)}
                    className={`absolute top-6 left-6 p-3 rounded-2xl backdrop-blur-xl transition-all border-2 shadow-xl ${
                      isLiked 
                      ? 'bg-[#d78258] text-white border-white/20' 
                      : 'bg-white/80 text-[#1a0f0a] border-white/40 hover:bg-white'
                    }`}
                  >
                    <Heart size={20} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "animate-bounceIn" : ""} />
                  </button>
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-[#1a0f0a]/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white border border-white/10">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-[#3d2b1f] italic leading-tight">
                      <HighlightText text={item.name} highlight={searchQuery} />
                    </h3>
                    <div className="flex flex-col items-end">
                      <span className="text-xl font-black text-[#d78258] italic">R {item.price}</span>
                      {item.name.includes('Sav.') || item.name.includes('Forrester') || item.name.includes('Kadette') || item.name.includes('Sophie') ? (
                        <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">Per Glass</span>
                      ) : null}
                    </div>
                  </div>
                  <p className="text-[#778979] text-base mb-8 line-clamp-3 flex-grow leading-relaxed italic">
                    <HighlightText text={item.description} highlight={searchQuery} />
                  </p>
                  
                  {countInCart > 0 ? (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item, -1)}
                        className="p-4 rounded-2xl border-2 border-[#d78258] text-[#d78258] hover:bg-[#d78258] hover:text-white transition-all shadow-md active:scale-95"
                      >
                        <Minus size={20} />
                      </button>
                      <div className="flex-grow bg-[#fdfbf7] border-2 border-[#ccdcc1]/30 rounded-2xl py-4 text-center font-black text-[#3d2b1f] text-lg shadow-inner">
                        {countInCart}
                      </div>
                      <button 
                        onClick={() => updateQuantity(item, 1)}
                        className="p-4 rounded-2xl border-2 border-[#d78258] text-[#d78258] hover:bg-[#d78258] hover:text-white transition-all shadow-md active:scale-95"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => updateQuantity(item, 1)}
                      className="w-full py-5 rounded-[2rem] border-2 border-[#d78258] text-[#d78258] hover:bg-[#d78258] hover:text-white hover:shadow-2xl transition-all font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 active:scale-95"
                    >
                      Add to Bag
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[4rem] border-2 border-dashed border-[#ccdcc1]/40 mt-16 animate-slideUp">
            <div className="w-24 h-24 bg-[#fdfbf7] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
               <Search className="text-[#a9916b]" size={40} />
            </div>
            <h3 className="text-3xl font-bold text-[#3d2b1f] italic mb-4">
              {showFavoritesOnly ? "Your favorites list is empty" : "No matches found"}
            </h3>
            <p className="text-[#778979] max-w-sm mx-auto text-lg leading-relaxed italic">
              {showFavoritesOnly 
                ? "Start adding some of our artisanal creations to your favorites list!" 
                : "Try exploring other categories or clearing your search to find something special."}
            </p>
            <button 
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setIsVegetarianOnly(false);
                setShowFavoritesOnly(false);
              }}
              className="mt-12 bg-[#1a0f0a] text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-[#a9916b] transition-all shadow-2xl transform active:scale-95"
            >
              Reset View
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
