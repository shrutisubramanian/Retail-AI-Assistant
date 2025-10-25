import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Gift,
  QrCode,
  Clock,
  Shirt,
  Diamond,
  Sparkles,
  ArrowLeft,
  User,
} from "lucide-react";

/* ---------------------------------- */
/* --- INLINED CHAT MESSAGE LOGIC --- */
/* ---------------------------------- */

// Define the Message type (inlined from mockData)
type Message = {
  id: string;
  agent: "user" | "sales";
  content: string;
  timestamp: Date;
};

// Inlined ChatMessage Component
const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.agent === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-xl text-sm shadow-md ${
          isUser
            ? "bg-purple-600 text-white rounded-br-none"
            : "bg-gray-700 text-white rounded-tl-none"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

/* ---------------------------------- */
/* -------- INLINED MOCK DATA ------- */
/* ---------------------------------- */

// Inlined Conversation History
const conversationHistory: Message[] = [
  { id: "c1", agent: "user", content: "Where are the changing rooms?", timestamp: new Date() },
  { id: "c2", agent: "sales", content: "The changing rooms are on the second floor, next to the footwear section.", timestamp: new Date() },
  { id: "c3", agent: "user", content: "Can I check my loyalty points?", timestamp: new Date() },
  { id: "c4", agent: "sales", content: "Absolutely! Please scan your loyalty card at the reader below the screen.", timestamp: new Date() },
];

// Inlined Product Data
const promoProducts: { [key: string]: any[] } = {
    summer50: [
      // Dresses and Rompers (Summer Collection)
      { id: 'd1', name: 'Floral Maxi Dress', description: 'Lightweight viscose, perfect for summer. Available in S-L.', price: 2999, image: 'https://placehold.co/400x400/FFA07A/360010?text=Floral+Maxi' },
      { id: 'd2', name: 'Linen Blend Romper', description: 'Comfortable linen blend with adjustable straps. M, L only.', price: 1850, image: 'https://placehold.co/400x400/87CEFA/003366?text=Linen+Romper' },
      { id: 'd3', name: 'Striped Sun Dress', description: 'Classic cotton sun dress with belt tie. S-XL.', price: 2200, image: 'https://placehold.co/400x400/F08080/440000?text=Striped+Dress' },
      { id: 'd4', name: 'Travel Jersey Jumpsuit', description: 'Soft jersey material, great for travel. One size fits most.', price: 3400, image: 'https://placehold.co/400x400/98FB98/004400?text=Jersey+Jumpsuit' },
      { id: 'd5', name: 'Puff Sleeve Mini', description: 'On-trend mini dress with dramatic puff sleeves. S, M.', price: 2899, image: 'https://placehold.co/400x400/D8BFD8/440044?text=Puff+Sleeve' },
      { id: 'd6', name: 'A-Line Skirt', description: 'High-waisted A-line skirt in various colors.', price: 1500, image: 'https://placehold.co/400x400/FFB6C1/665500?text=A-Line+Skirt' },
      { id: 'd7', name: 'Utility Overalls', description: 'Durable cotton overalls with deep pockets. Khaki color.', price: 3900, image: 'https://placehold.co/400x400/BDB76B/333333?text=Overalls' },
      { id: 'd8', name: 'Halter Top', description: 'Ribbed knit halter neck top. Cropped length.', price: 1199, image: 'https://placehold.co/400x400/F0E68C/333333?text=Halter+Top' },
    ],
    access30: [
      // Jewellery and Scarves (Accessories Collection)
      { id: 'j1', name: 'Silver Hoop Earrings', description: 'Sterling silver, lightweight and classic.', price: 950, image: 'https://placehold.co/400x400/E0FFFF/333366?text=Hoop+Earrings' },
      { id: 'j2', name: 'Silk Pattern Scarf', description: '100% silk, large square format. Multiple prints available.', price: 1600, image: 'https://placehold.co/400x400/ADFF2F/004400?text=Silk+Scarf' },
      { id: 'j3', name: 'Layered Gold Necklace', description: 'Gold-plated triple layer delicate necklace.', price: 1250, image: 'https://placehold.co/400x400/FFE4B5/663333?text=Gold+Necklace' },
      { id: 'j4', name: 'Cashmere Beanie', description: 'Soft cashmere blend beanie hat.', price: 2100, image: 'https://placehold.co/400x400/BA55D3/440044?text=Winter+Beanie' },
      { id: 'j5', name: 'Leather Belt', description: 'Classic black leather belt with brushed steel buckle.', price: 2400, image: 'https://placehold.co/400x400/696969/FFFFFF?text=Leather+Belt' },
      { id: 'j6', name: 'Aviator Sunglasses', description: 'Polarized lenses with metal frame. UV400 protection.', price: 1890, image: 'https://placehold.co/400x400/4682B4/FFFFFF?text=Sunglasses' },
    ],
    newin: [
      // Premium Collection
      { id: 'p1', name: 'Italian Leather Bag', description: 'Premium Italian leather, limited edition shoulder bag.', price: 7500, image: 'https://placehold.co/400x400/8B4513/FFFFF0?text=Leather+Bag' },
      { id: 'p2', name: 'Tailored Wool Blazer', description: 'Tailored wool blend blazer, in charcoal grey.', price: 6800, image: 'https://placehold.co/400x400/6A5ACD/E6E6FA?text=Wool+Blazer' },
      { id: 'p3', name: 'Cashmere Crew Sweater', description: 'Luxuriously soft crew-neck cashmere sweater.', price: 5500, image: 'https://placehold.co/400x400/F0FFF0/333333?text=Cashmere+Sweater' },
      { id: 'p4', name: 'Suede Loafers', description: 'Hand-stitched suede loafers, available in sizes 6-10.', price: 4200, image: 'https://placehold.co/400x400/DAA520/333333?text=Suede+Loafers' },
      { id: 'p5', name: 'Automatic Steel Watch', description: 'Stainless steel automatic watch with sapphire crystal.', price: 12000, image: 'https://placehold.co/400x400/483D8B/F0FFF0?text=Statement+Watch' },
      { id: 'p6', name: 'Classic Trench Coat', description: 'Classic water-resistant cotton trench coat.', price: 9500, image: 'https://placehold.co/400x400/B0C4DE/333333?text=Trench+Coat' },
      { id: 'p7', name: 'Silk Pyjama Set', description: '100% silk pyjama set, incredibly soft.', price: 5900, image: 'https://placehold.co/400x400/FF69B4/FFFFFF?text=Silk+Pyjamas' },
      { id: 'p8', name: 'Selvedge Denim', description: 'Japanese selvedge denim, slim fit.', price: 4800, image: 'https://placehold.co/400x400/4682B4/000000?text=Premium+Denim' },
    ],
  };


/* ---------------------------------- */
/* ---------- MAIN COMPONENT -------- */
/* ---------------------------------- */

/* ---------- promo config ---------- */
const promoTiles = [
  {
    id: "summer50",
    title: "SUMMER 50 %",
    desc: "Dresses & Rompers",
    color: "from-pink-500 to-rose-500",
    icon: Shirt,
  },
  {
    id: "access30",
    title: "30 % OFF",
    desc: "Jewellery & Scarves",
    color: "from-purple-500 to-indigo-500",
    icon: Diamond,
  },
  {
    id: "newin",
    title: "NEW IN",
    desc: "Premium Collection",
    color: "from-cyan-400 to-blue-500",
    icon: Diamond,
  },
];

export default function Kiosk() {
  const [search, setSearch] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [activePromo, setActivePromo] = useState<string | null>(null);
  
  // Use inlined data
  const [messages] = useState<Message[]>([
    ...conversationHistory,
    { id: "k1", agent: "sales", content: "Hi Sarah! Tap a promotion or ask me anything.", timestamp: new Date() },
  ]);

  /* ---- filter promo + products ---- */
  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    if (!term) return promoTiles;
    return promoTiles.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.desc.toLowerCase().includes(term)
    );
  }, [search]);

  // Use inlined data
  const promoItems = activePromo ? promoProducts[activePromo] ?? [] : [];

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white flex flex-col overflow-hidden">
      {/* ---- top bezel ---- */}
      <header className="h-18 bg-black/50 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center gap-4">
        <Sparkles className="text-pink-500" size={28} />
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cosa stai cercando?  —  search promos, products…"
            className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-2xl h-12"
          />
        </div>
        <Badge variant="secondary" className="gap-2 px-3 py-2 text-base bg-white/10 text-white hover:bg-white/20">
          <Clock size={16} /> 2:30 PM
        </Badge>
      </header>

      {/* ---- main grid ---- */}
      {/* We use grid-cols-3 for the main view, but conditionally change span later */}
      <main className="flex-1 px-6 py-8 grid grid-cols-3 gap-6 overflow-hidden">
        
        {/* left : promos / products (This is the primary area for the fix) */}
        {/* FIX: Use col-span-3 when a promo is active to take full width */}
        <section className={`${activePromo ? 'col-span-3' : 'col-span-2'} flex flex-col h-full space-y-6 overflow-hidden`}>
          
          {!activePromo ? (
            /* promo grid (Default view) */
            <div className="flex flex-col space-y-6 h-full overflow-y-auto pr-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Gift className="text-pink-500" /> Active Promotions
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <Card
                    key={p.id}
                    onClick={() => setActivePromo(p.id)}
                    className="bg-white/5 border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer group"
                  >
                    <div className={`h-24 bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                      <p.icon className="h-10 w-10 text-white/90" />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-xl font-bold">{p.title}</div>
                      <div className="text-sm text-gray-300">{p.desc}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* quick actions */}
              <div className="grid grid-cols-2 gap-4 mt-auto pt-6">
                <Button className="h-16 px-6 text-lg gap-3 bg-cyan-500 hover:bg-cyan-600">
                  <MapPin size={24} /> Mall Map
                </Button>
                <Button variant="outline" className="h-16 px-6 text-lg gap-3 border-white/20 text-white hover:bg-white/10">
                  <Gift size={24} /> Loyalty Card
                </Button>
              </div>
            </div>
          ) : (
            /* inside promo : product list (Scrollable, full-width view) */
            <>
              <div className="flex items-center gap-4 mb-4 flex-shrink-0">
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => setActivePromo(null)}
                  className="gap-2 text-white/80 hover:bg-white/10"
                >
                  <ArrowLeft size={24} /> Back to Promotions
                </Button>
                <h2 className="text-3xl font-bold text-pink-500">
                  {promoTiles.find((t) => t.id === activePromo)?.title}
                </h2>
              </div>

              {/* FIX: Added h-full and overflow-y-auto for scrolling */}
              <div className="flex-1 overflow-y-auto pr-4"> 
                {/* FIX: Changed to grid-cols-4 for more options visible */}
                <div className="grid grid-cols-4 gap-4">
                  {promoItems.map((prod) => (
                    <Card
                      key={prod.id}
                      className="bg-white/5 border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        // Added aspect ratio class for consistent sizing
                        className="h-48 w-full object-cover aspect-square" 
                      />
                      <CardContent className="p-4">
                        <div className="font-semibold text-lg">{prod.name}</div>
                        <div className="text-sm text-gray-300 h-10 overflow-hidden">{prod.description}</div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xl font-bold text-pink-500">₹ {prod.price}</span>
                          <Button size="sm" className="bg-pink-600 hover:bg-pink-700">Add</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {/* Placeholder cards to demonstrate the scrollability of a large collection. Using different images here too.*/}
                  {Array(10).fill(0).map((_, i) => (
                    <Card key={`placeholder-${i}`} className="bg-white/5 border-dashed border-white/10 border-2 rounded-2xl overflow-hidden">
                        <img
                            src={`https://placehold.co/400x400/${(i * 10).toString(16).padStart(3, '0')}FFF/${(i * 10).toString(16).padStart(3, '0')}000?text=Placeholder+${i+1}`}
                            alt={`Placeholder Item ${i + 1}`}
                            className="h-48 w-full object-cover aspect-square opacity-60"
                        />
                        <CardContent className="p-4">
                             <p className="text-center text-sm font-medium text-gray-400">Placeholder Item {i + 1}</p>
                        </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>

        {/* right : chat + qr (Only visible if promo is NOT active) */}
        {/* CONDITIONAL RENDER: This whole section only renders when NOT in the full-width promo view */}
        {!activePromo && (
          <section className="space-y-6 col-span-1 flex flex-col h-full">
            <Card className="bg-white/5 border-white/10 rounded-2xl flex-1 flex flex-col overflow-hidden">
              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                  <h3 className="font-semibold text-white">Live Assistant</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowChat((s) => !s)}
                    className="text-pink-500 hover:bg-white/10"
                  >
                    {showChat ? "Hide" : "Show"}
                  </Button>
                </div>

                {/* FIX: Ensure chat messages are scrollable */}
                {showChat ? (
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {messages.map((msg) => (
                      <ChatMessage key={msg.id} message={msg} />
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    Tap “Show” to start chatting
                  </div>
                )}
              </CardContent>
            </Card>

            {/* QR footer */}
            <Card className="bg-white/5 border-white/10 rounded-2xl flex-shrink-0">
              <CardContent className="p-4 flex items-center gap-4">
                {/* REPLACING QRCodeSVG with a simple SVG placeholder to resolve the external package error */}
                <div className="w-20 h-20 bg-white/90 rounded-lg flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-700" />
                </div>
                <div>
                  <div className="font-semibold text-white">Continue on phone</div>
                  <div className="text-sm text-gray-400">Scan → pay & collect</div>
                </div>
                <QrCode className="ml-auto text-pink-500" size={24} />
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      {/* ---- footer glow ---- */}
      <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 flex-shrink-0" />
    </div>
  );
}
