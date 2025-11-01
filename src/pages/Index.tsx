import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  Monitor,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  MessageSquare,
  Crown,
  CreditCard,
  PackageX,
  Gift,
  QrCode,
  Mic,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /* ------- omnichannel deep-link ------- */
  useEffect(() => {
    const sid = searchParams.get("sessionId");
    if (sid) localStorage.setItem("sessionId", sid); // simple store for now
    const ch = searchParams.get("channel") || "web";
    localStorage.setItem("channel", ch);
  }, [searchParams]);

  const scenarios = [
    {
      id: "voice-assistant",
      title: "Voice Shopping Assistant",
      description:
        "Speak naturally to browse products, check prices, and complete purchases with voice commands.",
      icon: Mic,
      route: "/voice-assistant",
      color: "bg-purple-500",
      featured: true,
      features: [
        { icon: Mic, text: "Natural voice recognition", color: "text-purple-600" },
        { icon: ShoppingBag, text: "Instant product search & pricing", color: "text-agent-recommendation" },
        { icon: CreditCard, text: "Voice-activated checkout", color: "text-agent-payment" },
      ],
    },
    {
      id: "mobile-to-kiosk",
      title: "Mobile Chat Experience",
      description:
        "Start Sarah's journey on mobile, scan QR at kiosk → conversation continues instantly.",
      icon: Smartphone,
      route: "/mobile",
      color: "bg-blue-500",
      features: [
        { icon: MessageSquare, text: "Sales Agent welcome & context", color: "text-agent-sales" },
        { icon: ShoppingBag, text: "Product recommendations & upsell", color: "text-agent-recommendation" },
        { icon: Sparkles, text: "Real-time inventory check", color: "text-agent-inventory" },
      ],
    },
    {
      id: "vip-journey",
      title: "VIP Customer Journey",
      description: "Gold-tier orchestration: recommendation → inventory → payment → support.",
      icon: Crown,
      route: "/vip",
      color: "bg-gradient-primary",
      featured: true,
      features: [
        { icon: Crown, text: "Gold Tier benefits & orchestration", color: "text-agent-loyalty" },
        { icon: ShoppingBag, text: "End-to-end Worker-Agent flow", color: "text-agent-recommendation" },
        { icon: Sparkles, text: "Post-purchase support & feedback", color: "text-agent-sales" },
      ],
    },
    {
      id: "kiosk",
      title: "In-Store Kiosk",
      description: "Scan QR, see full history, apply loyalty, reserve slot.",
      icon: Monitor,
      route: "/kiosk",
      color: "bg-orange-500",
      features: [
        { icon: QrCode, text: "Seamless QR hand-off", color: "text-agent-sales" },
        { icon: Gift, text: "Loyalty points & coupon auto-applied", color: "text-agent-loyalty" },
        { icon: PackageX, text: "Reserve pickup slot", color: "text-agent-inventory" },
      ],
    },
    {
      id: "payment-failure",
      title: "Payment Failure Recovery",
      description: "Declined card → Agent offers 1-tap retry with alternative methods.",
      icon: CreditCard,
      route: "/payment-failure",
      color: "bg-yellow-500",
      badge: "Edge Case",
      features: [
        { icon: CreditCard, text: "Simulate decline & retry", color: "text-yellow-600" },
        { icon: Sparkles, text: "Alternative payment suggestions", color: "text-agent-payment" },
        { icon: MessageSquare, text: "Graceful recovery flow", color: "text-agent-sales" },
      ],
    },
    {
      id: "out-of-stock",
      title: "Out of Stock Alternative",
      description: "Inventory + Recommendation Agents surface 3 in-stock alternatives.",
      icon: PackageX,
      route: "/out-of-stock",
      color: "bg-red-500",
      badge: "Edge Case",
      features: [
        { icon: PackageX, text: "Real-time stock check", color: "text-agent-inventory" },
        { icon: ShoppingBag, text: "Smart alternative carousel", color: "text-agent-recommendation" },
        { icon: Sparkles, text: "Instant fulfillment options", color: "text-agent-inventory" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* ------- Hero ------- */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="relative px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <Badge variant="secondary" className="gap-2 px-4 py-2">
              <Sparkles className="h-4 w-4" />
              Agentic AI Demo — Omnichannel
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Conversational Sales Agent
              <span className="block text-accent mt-2">Across Every Channel</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scan, switch, and shop. One session lives across mobile, kiosk, WhatsApp, and web.
            </p>
          </div>
        </div>
      </div>
      {/* ------- Scenario Cards ------- */}
      <div className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((s) => (
              <Card
                key={s.id}
                className={`shadow-elegant hover:shadow-glow transition-all group cursor-pointer ${
                  s.featured ? "md:col-span-2 lg:col-span-1 shadow-glow border-2 border-agent-loyalty/30 bg-gradient-to-br from-agent-loyalty/10 to-card" : ""
                }`}
                onClick={() => navigate(s.route)}
              >
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.color}`}>
                      <s.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      {s.badge && <Badge variant="secondary">{s.badge}</Badge>}
                      {s.featured && <Badge variant="secondary">Featured</Badge>}
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-xl font-bold">{s.title}</h2>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  </div>

                  <div className="space-y-2">
                    {s.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <f.icon className={`h-4 w-4 ${f.color}`} />
                        <span className="text-muted-foreground">{f.text}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full gap-2 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    Start Experience
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;