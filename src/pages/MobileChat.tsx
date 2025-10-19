import { useState } from "react";
import { MobileChatHeader } from "@/components/MobileChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { conversationHistory, Message, products, Product } from "@/data/mockData";
import { Send, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MobileChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(conversationHistory);
  const [showProducts, setShowProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [showInventoryCheck, setShowInventoryCheck] = useState(false);

  const handleInitialResponse = () => {
    if (messages.length === 4) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: "5",
            agent: "recommendation",
            content: "Perfect! I've curated three stunning formal dresses that would be ideal for a wedding. Each piece has been selected to complement formal occasions beautifully.",
            timestamp: new Date(),
          },
        ]);
        setShowProducts(true);
      }, 1000);
    }
  };

  const handleProductSelect = (product: Product) => {
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
    setShowProducts(false);

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
      }
    }, 1000);
  };

  const handleAddShoes = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        agent: "user",
        content: "Yes, please add the heels!",
        timestamp: new Date(),
      },
    ]);

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
      }, 1500);
    }, 1000);
  };

  const handleReserve = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        agent: "user",
        content: "Yes, I'd like to reserve them for try-on today.",
        timestamp: new Date(),
      },
    ]);

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

      setTimeout(() => {
        navigate("/kiosk");
      }, 2000);
    }, 1000);
  };

  // Auto-trigger initial recommendation
  if (messages.length === 4 && !showProducts) {
    handleInitialResponse();
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-subtle">
      <MobileChatHeader />
      
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {showProducts && (
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

        {selectedProduct?.id === "bella-dress" && !showInventoryCheck && messages.some(m => m.content.includes("silver heels")) && (
          <div className="flex justify-center animate-fade-in">
            <Button onClick={handleAddShoes} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Add Silver Heels to Selection
            </Button>
          </div>
        )}

        {showInventoryCheck && (
          <div className="flex justify-center animate-fade-in">
            <Button onClick={handleReserve} size="lg" className="gap-2">
              Reserve for In-Store Try-On
            </Button>
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
          />
          <Button size="icon" disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
