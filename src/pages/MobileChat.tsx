import { useState, useEffect } from "react";
import { MobileChatHeader } from "@/components/MobileChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import DemoControlPanel from "@/components/DemoControlPanel";
import AgentTimeline from "@/components/AgentTimeline";
import ChannelSwitcher from "@/components/ChannelSwitcher";
import { conversationHistory, Message, products, Product, TimelineEvent } from "@/data/mockData";
import { Send, Sparkles, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Channel = 'mobile' | 'kiosk' | 'whatsapp' | 'web';

export default function MobileChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(conversationHistory);
  const [showProducts, setShowProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [showInventoryCheck, setShowInventoryCheck] = useState(false);
  
  // Demo Control States
  const [currentScenario, setCurrentScenario] = useState("mobile-to-kiosk");
  const [isPaused, setIsPaused] = useState(false);
  const [activeAgents, setActiveAgents] = useState<string[]>(["sales"]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    {
      id: "1",
      type: "user",
      action: "Customer initiates conversation",
      timestamp: new Date(Date.now() - 300000),
      details: "Sarah opens mobile app and starts browsing"
    },
    {
      id: "2",
      type: "sales",
      action: "Sales Agent welcomes customer",
      timestamp: new Date(Date.now() - 295000),
      details: "Recognizes returning customer and past browsing history"
    }
  ]);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showChannelSwitcher, setShowChannelSwitcher] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<Channel>('mobile');

  const addTimelineEvent = (event: Omit<TimelineEvent, 'id' | 'timestamp'>) => {
    const newEvent: TimelineEvent = {
      ...event,
      id: `${Date.now()}`,
      timestamp: new Date()
    };
    setTimelineEvents(prev => [...prev, newEvent]);
  };

  const updateActiveAgents = (agents: string[]) => {
    setActiveAgents(agents);
  };

  const handleInitialResponse = () => {
    if (messages.length === 4 && !isPaused) {
      setTimeout(() => {
        updateActiveAgents(["sales", "recommendation"]);
        setMessages((prev) => [
          ...prev,
          {
            id: "5",
            agent: "recommendation",
            content: "Perfect! I've curated three stunning formal dresses that would be ideal for a wedding. Each piece has been selected to complement formal occasions beautifully.",
            timestamp: new Date(),
          },
        ]);
        addTimelineEvent({
          type: "recommendation",
          action: "Recommendation Agent activated",
          details: "Analyzing customer preferences and suggesting formal dresses"
        });
        setShowProducts(true);
      }, 1000);
    }
  };

  const handleProductSelect = (product: Product) => {
    if (isPaused) return;
    
    setSelectedProduct(product);
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        agent: "user",
        content: `I love the ${product.name}! Can you check if it's available at my local store?`,
        timestamp: new Date(),
      },
    ]);
    
    addTimelineEvent({
      type: "user",
      action: "Customer selects product",
      details: `Selected ${product.name} for $${product.price}`
    });
    
    setShowProducts(false);
    updateActiveAgents(["sales", "recommendation"]);

    setTimeout(() => {
      if (product.id === "bella-dress") {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-rec`,
            agent: "recommendation",
            content: "Excellent choice! The Bella Midnight Gown is absolutely stunning. These elegant silver heels pair perfectly with it. Would you like me to add them to your selection?",
            timestamp: new Date(),
          },
        ]);
        
        addTimelineEvent({
          type: "recommendation",
          action: "Upsell suggestion generated",
          details: "Recommended complementary silver heels"
        });
      }
    }, 1000);
  };

  const handleAddShoes = () => {
    if (isPaused) return;
    
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        agent: "user",
        content: "Yes, please add the heels!",
        timestamp: new Date(),
      },
    ]);

    addTimelineEvent({
      type: "user",
      action: "Customer accepts upsell",
      details: "Added Elegant Silver Heels to selection"
    });

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-rec`,
          agent: "recommendation",
          content: "Great! I've added the Elegant Silver Heels to your selection. Let me check the availability at your preferred store.",
          timestamp: new Date(),
        },
      ]);

      updateActiveAgents(["sales", "inventory"]);

      setTimeout(() => {
        setShowInventoryCheck(true);
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-inv`,
            agent: "inventory",
            content: "Good news, Sarah! Both items are available at your local Downtown Fashion Gallery store:\n\n• Bella Midnight Gown - 3 in stock (Size 6, 8, 10)\n• Elegant Silver Heels - 2 pairs available (Size 7, 8)\n\nWould you like to reserve these items for an in-store try-on?",
            timestamp: new Date(),
          },
        ]);
        
        addTimelineEvent({
          type: "inventory",
          action: "Inventory Agent checks stock",
          details: "Verified availability at Downtown Fashion Gallery"
        });
      }, 1500);
    }, 1000);
  };

  const handleReserve = () => {
    if (isPaused) return;
    
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        agent: "user",
        content: "Yes, I'd like to reserve them for try-on today.",
        timestamp: new Date(),
      },
    ]);

    addTimelineEvent({
      type: "user",
      action: "Customer requests reservation",
      details: "Wants to try on items in-store today"
    });

    updateActiveAgents(["sales", "inventory", "fulfillment"]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-inv`,
          agent: "inventory",
          content: "Perfect! I've created a reservation for you. Head to the in-store kiosk to complete your reservation and select your preferred time slot.",
          timestamp: new Date(),
        },
      ]);

      addTimelineEvent({
        type: "fulfillment",
        action: "Reservation created",
        details: "Items reserved for in-store pickup"
      });

      setTimeout(() => {
        setShowChannelSwitcher(true);
        // Auto-navigate after showing channel switcher
        setTimeout(() => {
          navigate("/kiosk");
        }, 3000);
      }, 1500);
    }, 1000);
  };

  const handleScenarioChange = (scenario: string) => {
    setCurrentScenario(scenario);
    // Reset conversation for new scenario
    setMessages(conversationHistory);
    setShowProducts(false);
    setSelectedProduct(null);
    setShowInventoryCheck(false);
    setActiveAgents(["sales"]);
    setTimelineEvents([
      {
        id: "1",
        type: "user",
        action: "Customer initiates conversation",
        timestamp: new Date(),
        details: "Started new scenario"
      }
    ]);
  };

  const handleReset = () => {
    setMessages(conversationHistory);
    setShowProducts(false);
    setSelectedProduct(null);
    setShowInventoryCheck(false);
    setActiveAgents(["sales"]);
    setShowChannelSwitcher(false);
    setTimelineEvents([
      {
        id: "1",
        type: "user",
        action: "Customer initiates conversation",
        timestamp: new Date(),
        details: "Conversation reset"
      }
    ]);
  };

  const handleChannelChange = (channel: Channel) => {
    setCurrentChannel(channel);
    addTimelineEvent({
      type: "sales",
      action: "Channel switch",
      details: `Customer switched from mobile to ${channel}`
    });
    
    if (channel === 'kiosk') {
      navigate("/kiosk");
    }
  };

  // Auto-trigger initial recommendation
  if (messages.length === 4 && !showProducts && !isPaused) {
    handleInitialResponse();
  }

  return (
    <div className="relative flex h-screen flex-col bg-gradient-subtle">
      <MobileChatHeader />
      
      {/* Toggle Buttons */}
      <div className="absolute top-20 right-4 z-40 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowTimeline(!showTimeline)}
          className="gap-2"
        >
          {showTimeline ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          Timeline
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {showProducts && !isPaused && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-agent-recommendation" />
              <span className="font-medium">Recommended for you</span>
            </div>
            <div className="grid gap-4">
              {products.filter(p => p.category === "formal-dresses").map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleProductSelect}
                />
              ))}
            </div>
          </div>
        )}

        {selectedProduct?.id === "bella-dress" && !showInventoryCheck && messages.some(m => m.content.includes("silver heels")) && !isPaused && (
          <div className="flex justify-center animate-fade-in">
            <Button onClick={handleAddShoes} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Add Silver Heels to Selection
            </Button>
          </div>
        )}

        {showInventoryCheck && !showChannelSwitcher && !isPaused && (
          <div className="flex justify-center animate-fade-in">
            <Button onClick={handleReserve} size="lg" className="gap-2">
              Reserve for In-Store Try-On
            </Button>
          </div>
        )}

        {showChannelSwitcher && (
          <div className="animate-fade-in space-y-4">
            <Badge variant="secondary" className="w-full justify-center py-2">
              Ready to complete at in-store kiosk
            </Badge>
            <ChannelSwitcher
              currentChannel={currentChannel}
              onChannelChange={handleChannelChange}
              showTransition={true}
            />
          </div>
        )}

        {/* Timeline View */}
        {showTimeline && (
          <div className="animate-fade-in">
            <AgentTimeline events={timelineEvents} showDetails={true} />
          </div>
        )}
      </div>

      <div className="border-t border-border bg-card p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            disabled={isPaused}
          />
          <Button size="icon" disabled={!inputValue.trim() || isPaused}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Demo Control Panel */}
      <DemoControlPanel
        currentScenario={currentScenario}
        onScenarioChange={handleScenarioChange}
        onReset={handleReset}
        isPaused={isPaused}
        onPauseToggle={() => setIsPaused(!isPaused)}
        activeAgents={activeAgents}
      />
    </div>
  );
}