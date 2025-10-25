import { useState } from "react";
import { MobileChatHeader } from "@/components/MobileChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DemoControlPanel from "@/components/DemoControlPanel";
import { Message, products, Product } from "@/data/mockData";
import { PackageX, Sparkles, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OutOfStock() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'initial' | 'checking' | 'out-of-stock' | 'alternatives' | 'selected'>('initial');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      agent: "sales",
      content: "Hi Sarah! I see you're interested in our Diamond Stud Earrings. They're a beautiful choice!",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [selectedAlternative, setSelectedAlternative] = useState<Product | null>(null);
  const [activeAgents, setActiveAgents] = useState<string[]>(["sales"]);
  const [isPaused, setIsPaused] = useState(false);

  const diamondEarrings = products.find(p => p.id === "diamond-earrings");
  const alternatives = products.filter(p => 
    diamondEarrings?.alternatives?.includes(p.id) || p.category === "jewelry"
  ).filter(p => p.inStock);

  const handleCheckStock = () => {
    if (currentStep === 'initial') {
      setMessages(prev => [
        ...prev,
        {
          id: "2",
          agent: "user",
          content: "Can you check if these are available at my local store?",
          timestamp: new Date(),
        },
      ]);
      
      setCurrentStep('checking');
      setActiveAgents(["sales", "inventory"]);

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: "3",
            agent: "inventory",
            content: "Let me check our inventory across all locations...",
            timestamp: new Date(),
          },
        ]);

        setTimeout(() => {
          setCurrentStep('out-of-stock');
          setActiveAgents(["inventory", "recommendation"]);
          setMessages(prev => [
            ...prev,
            {
              id: "4",
              agent: "inventory",
              content: "I'm sorry, but the Diamond Stud Earrings are currently out of stock at all our locations. However, I'm working with our Recommendation Agent to find you some beautiful alternatives that match your style!",
              timestamp: new Date(),
            },
          ]);

          setTimeout(() => {
            setCurrentStep('alternatives');
            setMessages(prev => [
              ...prev,
              {
                id: "5",
                agent: "recommendation",
                content: "Based on your interest in elegant diamond jewelry, I've found these stunning alternatives that are in stock and available for immediate purchase or pickup:",
                timestamp: new Date(),
              },
            ]);
          }, 1500);
        }, 2000);
      }, 1000);
    }
  };

  const handleSelectAlternative = (product: Product) => {
    setSelectedAlternative(product);
    setMessages(prev => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        agent: "user",
        content: `The ${product.name} looks perfect! I'll take it.`,
        timestamp: new Date(),
      },
    ]);

    setActiveAgents(["sales", "inventory"]);
    setCurrentStep('selected');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `${Date.now()}-inventory`,
          agent: "inventory",
          content: `Excellent choice! The ${product.name} is in stock at your local Downtown Fashion Gallery store. We have ${product.stockCount} available. Would you like to reserve it for in-store pickup or have it shipped to you?`,
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  const handleFulfillment = (method: 'pickup' | 'ship') => {
    setMessages(prev => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        agent: "user",
        content: method === 'pickup' ? "I'll pick it up today." : "Please ship it to me.",
        timestamp: new Date(),
      },
    ]);

    setActiveAgents(["sales", "fulfillment"]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `${Date.now()}-fulfillment`,
          agent: "inventory",
          content: method === 'pickup'
            ? `Perfect! I've reserved the ${selectedAlternative?.name} for you. It will be ready for pickup at Downtown Fashion Gallery today after 2:00 PM. You'll receive a notification when it's ready!`
            : `Great! I've arranged shipping for the ${selectedAlternative?.name}. You'll receive it within 2-3 business days. Tracking information will be sent to your email shortly.`,
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  const handleReset = () => {
    setCurrentStep('initial');
    setMessages([
      {
        id: "1",
        agent: "sales",
        content: "Hi Sarah! I see you're interested in our Diamond Stud Earrings. They're a beautiful choice!",
        timestamp: new Date(),
      },
    ]);
    setSelectedAlternative(null);
    setActiveAgents(["sales"]);
  };

  // Auto-start stock check
  if (currentStep === 'initial' && messages.length === 1) {
    setTimeout(() => handleCheckStock(), 1500);
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-subtle">
      <MobileChatHeader />
      
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Checking Inventory */}
        {currentStep === 'checking' && (
          <Card className="shadow-glow border-accent/50 animate-fade-in">
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-accent/10 rounded-full">
                  <PackageX className="h-8 w-8 text-accent animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Checking Inventory</h3>
                <p className="text-sm text-muted-foreground">Searching across all locations...</p>
              </div>
              <div className="flex justify-center gap-1">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Out of Stock Notice */}
        {currentStep === 'out-of-stock' && (
          <Card className="shadow-elegant border-orange-500/50 animate-fade-in">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-orange-600">
                <PackageX className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Currently Out of Stock</h3>
                  <p className="text-sm text-muted-foreground">
                    {diamondEarrings?.name}
                  </p>
                </div>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg text-sm">
                <p className="text-muted-foreground">
                  Don't worry! We're finding you similar items that are available right now.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Alternative Products */}
        {currentStep === 'alternatives' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-agent-recommendation" />
              <span className="font-medium text-muted-foreground">Available Alternatives</span>
            </div>
            <div className="grid gap-4">
              {alternatives.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleSelectAlternative}
                />
              ))}
            </div>
          </div>
        )}

        {/* Fulfillment Options */}
        {currentStep === 'selected' && selectedAlternative && (
          <Card className="shadow-glow animate-fade-in">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">Item Available</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedAlternative.name}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">Choose fulfillment option:</p>
                
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto p-4"
                  onClick={() => handleFulfillment('pickup')}
                >
                  <div className="text-left">
                    <div className="font-medium">Pick up in store</div>
                    <div className="text-xs text-muted-foreground">
                      Ready today at Downtown Fashion Gallery
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto p-4"
                  onClick={() => handleFulfillment('ship')}
                >
                  <div className="text-left">
                    <div className="font-medium">Ship to me</div>
                    <div className="text-xs text-muted-foreground">
                      Delivery in 2-3 business days
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <DemoControlPanel
        currentScenario="out-of-stock"
        onScenarioChange={(scenario) => {
          if (scenario === 'mobile-to-kiosk') navigate('/mobile');
          if (scenario === 'vip-journey') navigate('/vip');
          if (scenario === 'payment-failure') navigate('/payment-failure');
        }}
        onReset={handleReset}
        isPaused={isPaused}
        onPauseToggle={() => setIsPaused(!isPaused)}
        activeAgents={activeAgents}
      />
    </div>
  );
}