import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Smartphone, Monitor, ArrowRight, Sparkles, ShoppingBag, MessageSquare, Crown } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="relative px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <Badge variant="secondary" className="gap-2 px-4 py-2">
              <Sparkles className="h-4 w-4" />
              Interactive Prototype Demo
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Omnichannel Shopping
              <span className="block text-accent mt-2">Experience Prototype</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore Sarah's journey as she discovers the perfect formal dress through our AI-powered Sales Agent and Worker Agents, seamlessly transitioning from mobile chat to in-store kiosk.
            </p>
          </div>
        </div>
      </div>

      {/* Journey Cards */}
      <div className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Mobile Chat Card */}
            <Card className="shadow-elegant hover:shadow-glow transition-all group cursor-pointer" onClick={() => navigate("/mobile")}>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary">
                    <Smartphone className="h-7 w-7 text-white" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold">Mobile Chat Experience</h2>
                  <p className="text-muted-foreground">
                    Start Sarah's journey on the mobile app. Interact with the Sales Agent, receive personalized recommendations, and check local inventory.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="h-4 w-4 text-agent-sales" />
                    <span className="text-muted-foreground">Sales Agent welcome & context</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ShoppingBag className="h-4 w-4 text-agent-recommendation" />
                    <span className="text-muted-foreground">Product recommendations & upsell</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-agent-inventory" />
                    <span className="text-muted-foreground">Real-time inventory check</span>
                  </div>
                </div>

                <Button className="w-full gap-2 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  Start Mobile Experience
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* VIP Journey Card */}
            <Card className="shadow-glow hover:shadow-glow border-2 border-agent-loyalty/30 bg-gradient-to-br from-agent-loyalty/10 to-card transition-all group cursor-pointer" onClick={() => navigate("/vip")}>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary">
                    <Crown className="h-7 w-7 text-white" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">VIP Customer Journey</h2>
                    <Badge variant="secondary" className="text-xs">Featured</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Follow Mark, a Gold Tier member, through a seamless agent-orchestrated experience with specialized Worker Agents handling each step.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Crown className="h-4 w-4 text-agent-loyalty" />
                    <span className="text-muted-foreground">Gold Tier benefits & orchestration</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ShoppingBag className="h-4 w-4 text-agent-recommendation" />
                    <span className="text-muted-foreground">Recommendation → Inventory → Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-agent-sales" />
                    <span className="text-muted-foreground">Post-purchase support & feedback</span>
                  </div>
                </div>

                <Button className="w-full gap-2 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  Start VIP Experience
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Kiosk Card */}
            <Card className="shadow-elegant hover:shadow-glow transition-all group cursor-pointer" onClick={() => navigate("/kiosk")}>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary">
                    <Monitor className="h-7 w-7 text-white" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold">In-Store Kiosk</h2>
                  <p className="text-muted-foreground">
                    Experience the seamless channel switch. View full conversation history and complete the reservation with loyalty benefits applied.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="h-4 w-4 text-agent-sales" />
                    <span className="text-muted-foreground">Persistent conversation history</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-agent-loyalty" />
                    <span className="text-muted-foreground">Loyalty points & coupon application</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ShoppingBag className="h-4 w-4 text-agent-inventory" />
                    <span className="text-muted-foreground">Reservation confirmation</span>
                  </div>
                </div>

                <Button className="w-full gap-2 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  View Kiosk Interface
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Overview */}
          <div className="mt-16 text-center space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Key Features Demonstrated</h3>
              <p className="text-muted-foreground">This prototype showcases the power of agentic AI in retail</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="shadow-elegant">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-agent-sales/10">
                    <MessageSquare className="h-6 w-6 text-agent-sales" />
                  </div>
                  <h4 className="font-semibold">Contextual Sales</h4>
                  <p className="text-sm text-muted-foreground">AI remembers customer preferences and browsing history</p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-agent-recommendation/10">
                    <ShoppingBag className="h-6 w-6 text-agent-recommendation" />
                  </div>
                  <h4 className="font-semibold">Smart Recommendations</h4>
                  <p className="text-sm text-muted-foreground">Curated product suggestions with upselling opportunities</p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-agent-inventory/10">
                    <Sparkles className="h-6 w-6 text-agent-inventory" />
                  </div>
                  <h4 className="font-semibold">Omnichannel Flow</h4>
                  <p className="text-sm text-muted-foreground">Seamless transition between mobile and in-store</p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-agent-loyalty/10">
                    <Sparkles className="h-6 w-6 text-agent-loyalty" />
                  </div>
                  <h4 className="font-semibold">Loyalty Integration</h4>
                  <p className="text-sm text-muted-foreground">Automatic discount and points application</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
