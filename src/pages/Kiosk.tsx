import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { conversationHistory, Message, products } from "@/data/mockData";
import { Store, Clock, Tag, Sparkles, CheckCircle2, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Kiosk() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    ...conversationHistory,
    {
      id: "kiosk-1",
      agent: "sales",
      content: "Welcome to the store, Sarah! I've pulled up your reservation details. Would you like to confirm the try-on reservation for the Bella Midnight Gown and Elegant Silver Heels?",
      timestamp: new Date(),
    },
  ]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLoyalty, setShowLoyalty] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    setShowConfirmation(true);
    setMessages((prev) => [
      ...prev,
      {
        id: "kiosk-user-1",
        agent: "user",
        content: "Yes, I'd like to confirm the reservation for 2:30 PM today.",
        timestamp: new Date(),
      },
    ]);

    setTimeout(() => {
      setShowLoyalty(true);
      setMessages((prev) => [
        ...prev,
        {
          id: "kiosk-loyalty",
          agent: "loyalty",
          content: "Wonderful! I've applied your loyalty benefits and found some exclusive savings for you. Let me show you the final details.",
          timestamp: new Date(),
        },
      ]);
    }, 1500);
  };

  const handleFinalConfirm = () => {
    setShowSuccess(true);
    setMessages((prev) => [
      ...prev,
      {
        id: "kiosk-support",
        agent: "support",
        content: "You're all set! You'll receive a notification when your items are ready. We'll follow up tomorrow to get your feedback on the in-store experience. Enjoy your shopping!",
        timestamp: new Date(),
      },
    ]);
  };

  const bellaDress = products.find(p => p.id === "bella-dress");
  const silverHeels = products.find(p => p.id === "silver-heels");
  const subtotal = (bellaDress?.price || 0) + (silverHeels?.price || 0);
  const loyaltyDiscount = 25;
  const couponDiscount = 10;
  const total = subtotal - loyaltyDiscount - couponDiscount;

  return (
    <div className="dark min-h-screen bg-background">
      <div className="mx-auto max-w-6xl">
        {/* Kiosk Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Downtown Fashion Gallery</h1>
                <p className="text-sm text-muted-foreground">In-Store Kiosk • Welcome, Sarah</p>
              </div>
            </div>
            <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm">
              <Clock className="h-4 w-4" />
              2:30 PM Today
            </Badge>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 p-8">
          {/* Chat History Panel */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 bg-gradient-primary rounded-full" />
              <span className="text-sm font-medium text-muted-foreground">Conversation History</span>
              <div className="h-1 flex-1 bg-gradient-primary rounded-full" />
            </div>
            
            <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </div>

          {/* Reservation Details Panel */}
          <div className="space-y-6">
            <Card className="shadow-glow border-accent/20">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Reservation Details</h2>
                  <Sparkles className="h-5 w-5 text-accent" />
                </div>

                <div className="space-y-4">
                  {bellaDress && (
                    <div className="flex gap-4 p-4 rounded-lg bg-secondary/50">
                      <img
                        src={bellaDress.image}
                        alt={bellaDress.name}
                        className="h-24 w-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{bellaDress.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">Size 8 • In Stock</p>
                        <p className="text-lg font-bold mt-2">${bellaDress.price}</p>
                      </div>
                    </div>
                  )}

                  {silverHeels && (
                    <div className="flex gap-4 p-4 rounded-lg bg-secondary/50">
                      <img
                        src={silverHeels.image}
                        alt={silverHeels.name}
                        className="h-24 w-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{silverHeels.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">Size 7 • In Stock</p>
                        <p className="text-lg font-bold mt-2">${silverHeels.price}</p>
                      </div>
                    </div>
                  )}
                </div>

                {showLoyalty && (
                  <div className="space-y-3 animate-fade-in pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-accent">
                      <Tag className="h-4 w-4" />
                      <span className="font-semibold">Applied Savings</span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${subtotal}</span>
                      </div>
                      <div className="flex justify-between text-agent-loyalty">
                        <span>Loyalty Points Applied</span>
                        <span className="font-semibold">-${loyaltyDiscount}</span>
                      </div>
                      <div className="flex justify-between text-agent-loyalty">
                        <span>Personalized Coupon</span>
                        <span className="font-semibold">-${couponDiscount}</span>
                      </div>
                      <div className="h-px bg-border my-2" />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Final Price</span>
                        <span className="text-accent">${total}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        You're saving ${loyaltyDiscount + couponDiscount} today!
                      </div>
                    </div>
                  </div>
                )}

                {!showConfirmation && !showSuccess && (
                  <Button onClick={handleConfirm} size="lg" className="w-full gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Confirm Reservation
                  </Button>
                )}

                {showLoyalty && !showSuccess && (
                  <Button onClick={handleFinalConfirm} size="lg" className="w-full gap-2 bg-gradient-primary">
                    <CheckCircle2 className="h-5 w-5" />
                    Finalize Booking
                  </Button>
                )}

                {showSuccess && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-center gap-3 p-6 rounded-lg bg-accent/10 text-accent">
                      <CheckCircle2 className="h-8 w-8" />
                      <span className="text-lg font-semibold">Reservation Confirmed!</span>
                    </div>
                    <Button onClick={() => navigate("/")} variant="outline" className="w-full">
                      Return to Mobile App
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-border bg-card p-6">
          <form onSubmit={(e) => {
            e.preventDefault();
            if (inputValue.trim()) {
              setMessages((prev) => [
                ...prev,
                {
                  id: `${Date.now()}-user`,
                  agent: "user",
                  content: inputValue,
                  timestamp: new Date(),
                },
              ]);
              setInputValue("");
              
              setTimeout(() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: `${Date.now()}-sales`,
                    agent: "sales",
                    content: "Thank you! I'm here to assist you with your reservation.",
                    timestamp: new Date(),
                  },
                ]);
              }, 1000);
            }
          }} className="flex gap-2 max-w-2xl mx-auto">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
