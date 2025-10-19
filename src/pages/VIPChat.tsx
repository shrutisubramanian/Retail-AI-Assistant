import { useState } from "react";
import { MobileChatHeader } from "@/components/MobileChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { RecommendationCard } from "@/components/RecommendationCard";
import { InventoryWidget } from "@/components/InventoryWidget";
import { CheckoutSummary } from "@/components/CheckoutSummary";
import { PaymentProcessor } from "@/components/PaymentProcessor";
import { PostPurchaseCard } from "@/components/PostPurchaseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message, products, Product } from "@/data/mockData";
import { Send } from "lucide-react";

type FlowStep = "initial" | "recommendation" | "inventory" | "checkout" | "payment" | "complete";

export default function VIPChat() {
  const [currentStep, setCurrentStep] = useState<FlowStep>("initial");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      agent: "sales",
      content: "Welcome back, Mark! As a valued Gold Tier member, I'm here to help you find the perfect gift. I noticed you've been browsing our accessories collection. What's the occasion?",
      timestamp: new Date(Date.now() - 120000),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleInitialResponse = () => {
    if (messages.length === 1) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: "2",
            agent: "user",
            content: "I need a last-minute gift for my wife - something elegant. I'd like to pick it up today if possible.",
            timestamp: new Date(),
          },
        ]);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: "3",
              agent: "sales",
              content: "Perfect! Let me route this to our Recommendation Agent who specializes in curating gift selections based on your preferences and past purchases.",
              timestamp: new Date(),
            },
          ]);
          setCurrentStep("recommendation");
        }, 1500);
      }, 1000);
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProducts([product]);
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        agent: "user",
        content: `The ${product.name} looks perfect! Can you check if it's available for pickup today?`,
        timestamp: new Date(),
      },
    ]);
    setCurrentStep("inventory");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-sales`,
          agent: "sales",
          content: "Great choice! I'm now coordinating with our Inventory and Fulfillment Agents to check real-time availability and reserve a pickup slot for you.",
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  const handleReserve = (method: "pickup" | "ship") => {
    if (method === "pickup") {
      // Add matching wallet as upsell
      const wallet = products.find(p => p.id === "matching-wallet");
      if (wallet) {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-user`,
            agent: "user",
            content: "Reserve it for pickup at 2 PM today.",
            timestamp: new Date(),
          },
        ]);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-rec`,
              agent: "recommendation",
              content: `Excellent! I've reserved your pickup slot. By the way, this ${wallet.name} pairs beautifully with the handbag. Would you like to add it to make it a complete gift set?`,
              timestamp: new Date(),
            },
          ]);
          setSelectedProducts(prev => [...prev, wallet]);
        }, 1000);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-user2`,
              agent: "user",
              content: "Yes, add the wallet too!",
              timestamp: new Date(),
            },
          ]);

          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: `${Date.now()}-sales2`,
                agent: "sales",
                content: "Perfect! I'm now transferring you to our Loyalty and Offers Agent to calculate your Gold Tier benefits and apply any available promotions.",
                timestamp: new Date(),
              },
            ]);
            setCurrentStep("checkout");
          }, 1000);
        }, 2000);
      }
    }
  };

  const handleProceedPayment = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        agent: "user",
        content: "Proceed with payment.",
        timestamp: new Date(),
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-sales`,
          agent: "sales",
          content: "Excellent! Our Payment Agent is now securely processing your transaction.",
          timestamp: new Date(),
        },
      ]);
      setCurrentStep("payment");
    }, 1000);
  };

  const handlePaymentSuccess = () => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-sales`,
          agent: "sales",
          content: "Thank you, Mark! Your order is confirmed. I'm now connecting you with our Post-Purchase Support Agent who will handle your pickup logistics and follow-up.",
          timestamp: new Date(),
        },
      ]);
      setCurrentStep("complete");
    }, 500);
  };

  // Auto-trigger initial flow
  if (messages.length === 1 && currentStep === "initial") {
    handleInitialResponse();
  }

  const subtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const goldDiscount = subtotal * 0.15;
  const couponDiscount = 25;

  return (
    <div className="flex h-screen flex-col bg-gradient-subtle">
      <MobileChatHeader />
      
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {currentStep === "recommendation" && (
          <RecommendationCard
            products={products.filter(p => p.category === "accessories")}
            onSelect={handleProductSelect}
          />
        )}

        {currentStep === "inventory" && selectedProducts[0] && (
          <InventoryWidget
            productName={selectedProducts[0].name}
            onReserve={handleReserve}
          />
        )}

        {currentStep === "checkout" && selectedProducts.length > 0 && (
          <CheckoutSummary
            subtotal={subtotal}
            goldDiscount={goldDiscount}
            couponDiscount={couponDiscount}
            onProceedPayment={handleProceedPayment}
          />
        )}

        {currentStep === "payment" && (
          <PaymentProcessor
            amount={subtotal - goldDiscount - couponDiscount}
            onSuccess={handlePaymentSuccess}
          />
        )}

        {currentStep === "complete" && (
          <PostPurchaseCard
            trackingId="VIP2024-10192045"
            pickupLocation="Downtown Fashion Gallery - 2:00 PM Today"
          />
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
