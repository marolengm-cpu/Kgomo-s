export enum MenuCategory {
  // Food
  BREAKFAST = 'Breakfast',
  STARTERS = 'Starters',
  SALADS = 'Salads',
  WRAPS = 'Wraps',
  TOASTIES = 'Toasties',
  SIDES = 'Sides',
  BURGERS = 'Burgers',
  PIZZAS = 'Pizzas',
  PASTA = 'Pasta',
  GRILLS = 'Grills',
  DESSERTS = 'Desserts',
  KIDS = 'Kids',
  // Drinks
  COFFEE = 'Coffee',
  TEA_HOT = 'Tea/Hot',
  COCKTAILS = 'Cocktails',
  MOCKTAILS = 'Mocktails',
  BEERS = 'Beers & Cider',
  WINE = 'Wine & Sparkling',
  SPIRITS = 'Spirits',
  SOFTS = 'Soft Drinks'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  dietary?: ('V' | 'VG' | 'GF' | 'H')[]; // Vegetarian, Vegan, Gluten Free, Halal
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export interface ReservationData {
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface MealPrepPlan {
  id: string;
  name: string;
  mealsPerWeek: 5 | 10 | 15;
  price: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export enum LoyaltyTier {
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum'
}