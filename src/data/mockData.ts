export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  stockCount?: number;
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
];

export interface Message {
  id: string;
  agent: "sales" | "recommendation" | "inventory" | "loyalty" | "support" | "user";
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
