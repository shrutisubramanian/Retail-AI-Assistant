export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  stockCount?: number;
  alternatives?: string[]; // Product IDs of alternatives
}

export const products: Product[] = [
  {
    id: "bella-dress",
    name: "Bella Midnight Gown",
    price: 389,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&h=1200&fit=crop",
    description: "Elegant floor-length gown in midnight blue with delicate embellishments",
    category: "formal-dresses",
    inStock: true,
    stockCount: 3,
    alternatives: ["aurora-dress", "stella-dress"],
  },
  {
    id: "aurora-dress",
    name: "Aurora Rose Dress",
    price: 425,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1200&fit=crop",
    description: "Sophisticated rose-pink midi dress with flowing silhouette",
    category: "formal-dresses",
    inStock: true,
    stockCount: 2,
    alternatives: ["bella-dress", "stella-dress"],
  },
  {
    id: "stella-dress",
    name: "Stella Champagne Gown",
    price: 459,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1200&fit=crop",
    description: "Luxurious champagne evening gown with intricate beading",
    category: "formal-dresses",
    inStock: true,
    stockCount: 1,
    alternatives: ["bella-dress", "aurora-dress"],
  },
  {
    id: "silver-heels",
    name: "Elegant Silver Heels",
    price: 129,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=1200&fit=crop",
    description: "Classic silver heels with ankle strap - perfect formal complement",
    category: "shoes",
    inStock: true,
    stockCount: 2,
    alternatives: ["gold-heels"],
  },
  {
    id: "gold-heels",
    name: "Golden Strappy Heels",
    price: 139,
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&h=1200&fit=crop",
    description: "Stunning gold heels with elegant straps",
    category: "shoes",
    inStock: true,
    stockCount: 3,
    alternatives: ["silver-heels"],
  },
  {
    id: "luxury-handbag",
    name: "Madison Leather Handbag",
    price: 589,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1200&fit=crop",
    description: "Sophisticated Italian leather handbag in cognac brown",
    category: "accessories",
    inStock: true,
    stockCount: 4,
    alternatives: ["designer-tote"],
  },
  {
    id: "matching-wallet",
    name: "Classic Leather Wallet",
    price: 129,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=1200&fit=crop",
    description: "Matching leather wallet with RFID protection",
    category: "accessories",
    inStock: true,
    stockCount: 8,
  },
  {
    id: "designer-tote",
    name: "Designer Canvas Tote",
    price: 449,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1200&fit=crop",
    description: "Spacious designer tote with leather accents",
    category: "accessories",
    inStock: true,
    stockCount: 5,
    alternatives: ["luxury-handbag"],
  },
  {
    id: "pearl-necklace",
    name: "Elegant Pearl Necklace",
    price: 199,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1200&fit=crop",
    description: "Classic freshwater pearl necklace",
    category: "jewelry",
    inStock: true,
    stockCount: 6,
  },
  {
    id: "diamond-earrings",
    name: "Diamond Stud Earrings",
    price: 299,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=1200&fit=crop",
    description: "Timeless diamond stud earrings in white gold",
    category: "jewelry",
    inStock: false,
    stockCount: 0,
    alternatives: ["pearl-earrings"],
  },
  {
    id: "pearl-earrings",
    name: "Pearl Drop Earrings",
    price: 149,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=1200&fit=crop",
    description: "Elegant pearl drop earrings",
    category: "jewelry",
    inStock: true,
    stockCount: 4,
  },
];

export interface Message {
  id: string;
  agent: "sales" | "recommendation" | "inventory" | "loyalty" | "support" | "user" | "payment" | "fulfillment";
  content: string;
  timestamp: Date;
  products?: Product[];
  actions?: Array<{
    label: string;
    type: string;
    data?: any;
  }>;
}

export const conversationHistory: Message[] = [
  {
    id: "1",
    agent: "sales",
    content: "Welcome back, Sarah! I see you were looking at formal wear last week. How can I help today?",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: "2",
    agent: "user",
    content: "I'm looking for a formal dress for a wedding in four weeks.",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: "3",
    agent: "sales",
    content: "That sounds exciting! What color or style are you leaning towards?",
    timestamp: new Date(Date.now() - 180000),
  },
  {
    id: "4",
    agent: "user",
    content: "Something elegant, maybe in darker or jewel tones.",
    timestamp: new Date(Date.now() - 120000),
  },
];

// Timeline Event Tracking
export interface TimelineEvent {
  id: string;
  type: 'user' | 'sales' | 'recommendation' | 'inventory' | 'payment' | 'fulfillment' | 'loyalty' | 'support';
  action: string;
  timestamp: Date;
  details?: string;
}

// Customer Profiles
export interface CustomerProfile {
  id: string;
  name: string;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  points: number;
  preferredStore: string;
  purchaseHistory: {
    productId: string;
    date: Date;
    price: number;
  }[];
  preferences: {
    sizes: string[];
    colors: string[];
    brands: string[];
  };
}

export const customers: CustomerProfile[] = [
  {
    id: "sarah-001",
    name: "Sarah Johnson",
    loyaltyTier: "Silver",
    points: 1250,
    preferredStore: "Downtown Fashion Gallery",
    purchaseHistory: [
      { productId: "aurora-dress", date: new Date("2024-08-15"), price: 425 },
      { productId: "silver-heels", date: new Date("2024-09-20"), price: 129 },
    ],
    preferences: {
      sizes: ["8", "M"],
      colors: ["blue", "black", "rose"],
      brands: ["Bella", "Aurora"],
    },
  },
  {
    id: "mark-002",
    name: "Mark Stevens",
    loyaltyTier: "Gold",
    points: 3840,
    preferredStore: "Downtown Fashion Gallery",
    purchaseHistory: [
      { productId: "luxury-handbag", date: new Date("2024-07-10"), price: 589 },
      { productId: "designer-tote", date: new Date("2024-06-05"), price: 449 },
    ],
    preferences: {
      sizes: [],
      colors: ["brown", "black", "cognac"],
      brands: ["Madison", "Designer"],
    },
  },
];

// Scenario Definitions
export interface Scenario {
  id: string;
  name: string;
  description: string;
  customer: CustomerProfile;
  initialMessages: Message[];
  expectedFlow: string[];
}

export const scenarios: Record<string, Scenario> = {
  "mobile-to-kiosk": {
    id: "mobile-to-kiosk",
    name: "Mobile to In-Store Transition",
    description: "Sarah browses on mobile, then completes at kiosk",
    customer: customers[0],
    initialMessages: conversationHistory,
    expectedFlow: ["sales", "recommendation", "inventory", "fulfillment"],
  },
  "vip-journey": {
    id: "vip-journey",
    name: "VIP Customer Journey",
    description: "Mark (Gold Tier) gets personalized service with upsells",
    customer: customers[1],
    initialMessages: [
      {
        id: "vip-1",
        agent: "sales",
        content: "Hi Mark! 👋 As a Gold Tier member, I'm here to help. I noticed you've been browsing our accessories collection. Need help finding a last-minute gift for your wife?",
        timestamp: new Date(Date.now() - 120000),
      },
    ],
    expectedFlow: ["sales", "recommendation", "inventory", "loyalty", "payment", "support"],
  },
  "payment-failure": {
    id: "payment-failure",
    name: "Payment Failure Recovery",
    description: "Handle declined payment with alternative methods",
    customer: customers[0],
    initialMessages: [
      {
        id: "pf-1",
        agent: "sales",
        content: "Hi Sarah! Let's complete your purchase for the Bella Midnight Gown.",
        timestamp: new Date(Date.now() - 60000),
      },
    ],
    expectedFlow: ["sales", "payment", "payment", "support"],
  },
  "out-of-stock": {
    id: "out-of-stock",
    name: "Out of Stock Alternative",
    description: "Recommend alternatives when item unavailable",
    customer: customers[0],
    initialMessages: [
      {
        id: "oos-1",
        agent: "sales",
        content: "Hi Sarah! I see you're interested in our Diamond Stud Earrings.",
        timestamp: new Date(Date.now() - 60000),
      },
    ],
    expectedFlow: ["sales", "inventory", "recommendation", "inventory"],
  },
  "bundle-recommendation": {
    id: "bundle-recommendation",
    name: "Personalized Bundle",
    description: "AI suggests complementary products for bundle",
    customer: customers[0],
    initialMessages: [
      {
        id: "bundle-1",
        agent: "sales",
        content: "Welcome Sarah! I have some exciting bundle recommendations for your upcoming wedding.",
        timestamp: new Date(Date.now() - 60000),
      },
    ],
    expectedFlow: ["sales", "recommendation", "loyalty", "inventory"],
  },
};

// Payment Methods
export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'wallet' | 'gift-card';
  last4?: string;
  brand?: string;
  upiId?: string;
  balance?: number;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "card-1",
    type: "card",
    last4: "4242",
    brand: "Visa",
  },
  {
    id: "card-2",
    type: "card",
    last4: "8888",
    brand: "Mastercard",
  },
  {
    id: "upi-1",
    type: "upi",
    upiId: "sarah@paytm",
  },
  {
    id: "gift-1",
    type: "gift-card",
    balance: 100,
  },
];

// Store Locations
export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  distance: string;
  pickupSlots: string[];
}

export const storeLocations: StoreLocation[] = [
  {
    id: "store-1",
    name: "Downtown Fashion Gallery",
    address: "123 Main Street, Downtown",
    distance: "0.8 miles",
    pickupSlots: ["12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"],
  },
  {
    id: "store-2",
    name: "Westside Shopping Center",
    address: "456 West Avenue",
    distance: "2.3 miles",
    pickupSlots: ["1:00 PM", "3:00 PM", "5:00 PM"],
  },
];

// Promotions & Coupons
export interface Promotion {
  id: string;
  code: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minPurchase?: number;
  applicableCategories?: string[];
}

export const promotions: Promotion[] = [
  {
    id: "promo-1",
    code: "WEDDING10",
    description: "10% off formal wear",
    discount: 10,
    type: "percentage",
    applicableCategories: ["formal-dresses"],
  },
  {
    id: "promo-2",
    code: "VIP25",
    description: "$25 off purchases over $200",
    discount: 25,
    type: "fixed",
    minPurchase: 200,
  },
  {
    id: "promo-3",
    code: "BUNDLE15",
    description: "15% off when buying 3+ items",
    discount: 15,
    type: "percentage",
    minPurchase: 300,
  },
];

export const promoProducts: Record<string, Product[]> = {
  summer50: products.filter((p) => p.category === "formal-dresses"),
  access30: products.filter((p) => p.category === "accessories" || p.category === "jewelry"),
  newin: products.slice(0, 3),
};


export const extraProducts: Product[] = [
  { id: "sneakers-w", name: "White Platform Sneakers", price: 89, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=1200&fit=crop", description: "Chunky sole, retro vibe", category: "shoes", inStock: true, stockCount: 12 },
  { id: "heels-r", name: "Red Stiletto Heels", price: 149, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=1200&fit=crop", description: "Classic 9 cm heel", category: "shoes", inStock: true, stockCount: 5 },
  { id: "boots-c", name: "Chelsea Leather Boots", price: 199, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&h=1200&fit=crop", description: "Tan leather, elastic side", category: "shoes", inStock: true, stockCount: 7 },
  { id: "bag-tote", name: "Canvas Shopper Tote", price: 59, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1200&fit=crop", description: "Eco canvas, large capacity", category: "accessories", inStock: true, stockCount: 20 },
  { id: "bag-cross", name: "Cross-body Mini Bag", price: 79, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1200&fit=crop", description: "Vegan leather, gold chain", category: "accessories", inStock: true, stockCount: 15 },
  { id: "sun-hat", name: "Straw Sun Hat", price: 49, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&h=1200&fit=crop", description: "Wide brim, holiday essential", category: "accessories", inStock: true, stockCount: 10 },
  { id: "belt-w", name: "Woven Leather Belt", price: 69, image: "https://images.unsplash.com/photo-1627123424574-b8f28f52b65f?w=800&h=1200&fit=crop", description: "Reversible tan/black", category: "accessories", inStock: true, stockCount: 8 },
  { id: "watch-m", name: "Minimalist Watch", price: 129, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=1200&fit=crop", description: "Mesh strap, 38 mm", category: "accessories", inStock: true, stockCount: 6 },
  { id: "ear-cuff", name: "Gold Ear Cuff", price: 39, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1200&fit=crop", description: "No piercing required", category: "jewelry", inStock: true, stockCount: 25 },
  { id: "neck-p", name: "Pearl Choker", price: 89, image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=1200&fit=crop", description: "Fresh-water pearls, 40 cm", category: "jewelry", inStock: true, stockCount: 12 },
  { id: "ring-s", name: "Silver Stack Rings", price: 59, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1200&fit=crop", description: "Set of 3 thin bands", category: "jewelry", inStock: true, stockCount: 18 },
  { id: "brace-t", name: "Tennis Bracelet", price: 149, image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a6?w=800&h=1200&fit=crop", description: "Cubic zirconia, silver", category: "jewelry", inStock: true, stockCount: 9 },
  { id: "sneakers-b", name: "Black High-Top Sneakers", price: 109, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1200&fit=crop", description: "Leather upper, lug sole", category: "shoes", inStock: true, stockCount: 11 },
  { id: "loaf-p", name: "Penny Loafers", price: 119, image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=1200&fit=crop", description: "Polished leather, classic", category: "shoes", inStock: true, stockCount: 6 },
  { id: "bag-back", name: "Nylon Backpack", price: 99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1200&fit=crop", description: "Water-resistant, laptop slot", category: "accessories", inStock: true, stockCount: 14 },
  { id: "scarf-s", name: "Silk Scarf 90 cm", price: 69, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&h=1200&fit=crop", description: "Hand-rolled edges", category: "accessories", inStock: true, stockCount: 16 },
  { id: "hair-c", name: "Crystal Hair Clip", price: 29, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1200&fit=crop", description: "Rhinestone cluster", category: "accessories", inStock: true, stockCount: 30 },
  { id: "anklet-g", name: "Gold Anklet", price: 49, image: "https://images.unsplash.com/photo-1618382442787-ed5620bf8eef?w=800&h=1200&fit=crop", description: "Thin chain, 25 cm", category: "jewelry", inStock: true, stockCount: 22 },
  { id: "brooch-v", name: "Vintage Brooch", price: 79, image: "https://images.unsplash.com/photo-1588444650209-aa4d70d217b8?w=800&h=1200&fit=crop", description: "Art-deco crystal", category: "jewelry", inStock: true, stockCount: 7 },
  { id: "watch-c", name: "Chain Watch", price: 169, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&h=1200&fit=crop", description: "Gold-tone, 28 mm", category: "accessories", inStock: true, stockCount: 5 },
];

/* ---------- merge into products if you want ---------- */
export const allProducts = [...products, ...extraProducts];