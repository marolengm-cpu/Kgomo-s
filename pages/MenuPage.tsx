import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Heart, ShoppingBag, Info, Filter, X, 
  ChevronRight, Star, Leaf, Flame, Clock, Award,
  ArrowUpDown, Grid, List as ListIcon, HeartOff
} from 'lucide-react';
import { db } from '../lib/db';
import { MenuItem, CartItem } from '../types';

interface MenuPageProps {
  addToCart: (item: CartItem) => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ addToCart }) => {
  const [activeTab, setActiveTab] = useState<'Food' | 'Drinks'>('Food');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showVegetarian, setShowVegetarian] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [showAuthWarning, setShowAuthWarning] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await db.auth.getSession();
      setSession(data.session);
    };
    fetchSession();
  }, []);

  const fetchSavedItems = useCallback(async () => {
    if (!session?.user) return;
    try {
      const { data } = await db
        .from('saved_items')
        .select('item_id')
        .eq('user_id', session.user.id);
      if (data) {
        setSavedItems(data.map((item: any) => item.item_id));
      }
    } catch (err) {
      console.error('Error fetching saved items:', err);
    }
  }, [session]);

  useEffect(() => {
    fetchSavedItems();
  }, [fetchSavedItems]);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const { data } = await db.from('menu_items').select('*');
        if (data) setMenuItems(data);
      } catch (err) {
        console.error('Error fetching menu:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const toggleFavorite = async (itemId: string) => {
    if (!session?.user) {
      setShowAuthWarning(true);
      setTimeout(() => setShowAuthWarning(false), 3000);
      return;
    }

    const isSaved = savedItems.includes(itemId);
    try {
      if (isSaved) {
        await db.from('saved_items').delete().eq('user_id', session.user.id).eq('item_id', itemId);
        setSavedItems(prev => prev.filter(id => id !== itemId));
      } else {
        await db.from('saved_items').insert({ user_id: session.user.id, item_id: itemId });
        setSavedItems(prev => [...prev, itemId]);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const categories = activeTab === 'Food' 
    ? ['All', 'Breakfast', 'Starters', 'Wood-Fired Pizza', 'Grills & Steaks', 'Burgers', 'Kids', 'Desserts']
    : ['All', 'Hot Drinks', 'Cold Drinks', 'Milkshakes', 'Wine & Beer', 'Cocktails'];

  const filteredItems = menuItems
    .filter(item => item.type === activeTab)
    .filter(item => activeCategory === 'All' || item.category === activeCategory)
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(item => !showVegetarian || item.isVegetarian)
    .filter(item => !showFavorites || savedItems.includes(item.id))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.price - b.price;
    });

  const HighlightText = ({ text, query }: { text: string; query: string }) => {
    if (!query.trim()) return <>{text}</>;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() 
            ? <span key={i} className="bg-gold/30 text-dark font-bold rounded-sm px-0.5">{part}</span> 
            : part
        )}
      </>
    );
  };

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen relative">
      {/* Auth Warning Toast */}
      {showAuthWarning && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-slideUp">
          <div className="bg-dark text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gold/20 backdrop-blur-xl">
            <Info className="text-gold" size={20} />
            <span className="text-xs font-black uppercase tracking-widest">Login to save favorites</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-gold text-[10px] font-black tracking-[6px] uppercase mb-4 block">Our Offerings</span>
          <h1 className="text-5xl md:text-8xl font-bold text-dark mb-8 font-serif leading-tight">The Digital <em className="text-gold italic font-normal">Menu</em></h1>
          <p className="text-muted text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Explore our curated selection of wood-fired specialties, premium grills, and artisanal beverages.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-[2.5rem] p-4 md:p-6 shadow-2xl border border-gold/5 mb-16 sticky top-24 z-50 backdrop-blur-xl bg-white/90">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Tab Switcher */}
            <div className="flex bg-cream p-1.5 rounded-2xl w-full lg:w-auto">
              <button 
                onClick={() => { setActiveTab('Food'); setActiveCategory('All'); }}
                className={`flex-1 lg:px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === 'Food' ? 'bg-gold text-dark shadow-xl' : 'text-muted hover:text-dark'
                }`}
              >
                Food
              </button>
              <button 
                onClick={() => { setActiveTab('Drinks'); setActiveCategory('All'); }}
                className={`flex-1 lg:px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === 'Drinks' ? 'bg-gold text-dark shadow-xl' : 'text-muted hover:text-dark'
                }`}
              >
                Drinks
              </button>
            </div>

            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gold" size={20} />
              <input 
                type="text"
                placeholder={`Search our ${activeTab.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cream border-0 rounded-2xl pl-14 pr-6 py-4 focus:ring-2 focus:ring-gold outline-none text-dark font-medium text-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-muted hover:text-dark"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Filters & Sorting */}
            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto no-scrollbar pb-2 lg:pb-0">
              <button 
                onClick={() => setShowVegetarian(!showVegetarian)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${
                  showVegetarian ? 'bg-green text-white shadow-xl' : 'bg-cream text-muted hover:text-dark'
                }`}
              >
                <Leaf size={16} /> Veg
              </button>
              <button 
                onClick={() => setShowFavorites(!showFavorites)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${
                  showFavorites ? 'bg-rust text-white shadow-xl' : 'bg-cream text-muted hover:text-dark'
                }`}
              >
                <Heart size={16} fill={showFavorites ? "currentColor" : "none"} /> Favs
              </button>
              <div className="h-10 w-px bg-gold/10 mx-2 hidden lg:block" />
              <button 
                onClick={() => setSortBy(sortBy === 'name' ? 'price' : 'name')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-cream text-muted hover:text-dark text-[10px] font-black uppercase tracking-widest transition-all shrink-0"
              >
                <ArrowUpDown size={16} /> {sortBy === 'name' ? 'A-Z' : 'Price'}
              </button>
              <button 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-3.5 rounded-2xl bg-cream text-muted hover:text-dark transition-all shrink-0"
              >
                {viewMode === 'grid' ? <ListIcon size={20} /> : <Grid size={20} />}
              </button>
            </div>
          </div>

          {/* Categories Bar */}
          <div className="mt-8 flex items-center gap-3 overflow-x-auto no-scrollbar py-2 border-t border-gold/5 pt-8">
            <div className="flex items-center gap-2 text-gold shrink-0 mr-4">
              <Filter size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border ${
                  activeCategory === cat 
                    ? 'bg-dark text-gold border-dark shadow-xl' 
                    : 'bg-white text-muted border-gold/10 hover:border-gold/30 hover:text-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid/List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-8">
            <div className="w-20 h-20 border-4 border-gold/10 border-t-gold rounded-full animate-spin" />
            <p className="text-muted font-black uppercase tracking-[0.3em] text-[10px]">Curating your menu...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fadeIn"
            : "max-w-5xl mx-auto space-y-8 animate-fadeIn"
          }>
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className={`bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gold/5 group transition-all duration-500 hover:shadow-gold/10 hover:-translate-y-2 ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row h-auto md:h-72' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-full md:w-80 shrink-0' : 'h-72'}`}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 right-6 flex flex-col gap-3">
                    <button 
                      onClick={() => toggleFavorite(item.id)}
                      className={`p-4 rounded-2xl backdrop-blur-md transition-all shadow-xl ${
                        savedItems.includes(item.id) 
                          ? 'bg-rust text-white' 
                          : 'bg-white/80 text-dark hover:bg-white'
                      }`}
                    >
                      <Heart size={20} fill={savedItems.includes(item.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  {item.isVegetarian && (
                    <div className="absolute bottom-6 left-6 bg-green/90 backdrop-blur-md text-white p-3 rounded-2xl shadow-xl">
                      <Leaf size={18} />
                    </div>
                  )}
                </div>

                <div className="p-10 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">{item.category}</span>
                      <span className="text-2xl font-black text-dark">R {item.price.toFixed(2)}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-dark mb-4 font-serif">
                      <HighlightText text={item.name} query={searchQuery} />
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
                      <HighlightText text={item.description} query={searchQuery} />
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                      className="flex-1 bg-dark text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-gold hover:text-dark transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 group"
                    >
                      <ShoppingBag size={18} className="group-hover:translate-y-[-2px] transition-transform" /> Add to Order
                    </button>
                    <button className="p-5 bg-cream text-muted rounded-2xl hover:text-dark transition-all hover:bg-gold/10">
                      <Info size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 animate-fadeIn bg-white rounded-[3rem] border border-gold/5 shadow-2xl max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-gold/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10">
              {showFavorites ? <HeartOff size={48} className="text-gold" /> : <Search size={48} className="text-gold" />}
            </div>
            <h2 className="text-4xl font-bold text-dark mb-6 font-serif italic">No items found</h2>
            <p className="text-muted mb-12 max-w-md mx-auto font-medium">
              {showFavorites 
                ? "You haven't saved any favorites yet. Explore our menu and tap the heart icon to save items!"
                : "We couldn't find anything matching your search. Try adjusting your filters or search terms."
              }
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setShowVegetarian(false);
                setShowFavorites(false);
              }}
              className="bg-gold text-dark px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-dark hover:text-white transition-all shadow-2xl"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Bottom Info Strip */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10">
          <InfoCard icon={<Flame className="text-rust" />} title="Wood-Fired" desc="Authentic artisan ovens for that perfect smoky flavour." />
          <InfoCard icon={<Clock className="text-gold" />} title="Freshly Made" desc="Every dish is prepared to order using local ingredients." />
          <InfoCard icon={<Award className="text-green" />} title="Chef's Choice" desc="Look for the star icon for our signature specialties." />
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, desc }: any) => (
  <div className="bg-white p-10 rounded-[2.5rem] border border-gold/5 shadow-xl flex items-start gap-6 hover:border-gold/20 transition-all group">
    <div className="p-5 bg-cream rounded-2xl group-hover:scale-110 transition-transform duration-500">{icon}</div>
    <div>
      <h4 className="text-dark font-bold mb-2 font-serif text-lg">{title}</h4>
      <p className="text-muted text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

export default MenuPage;
