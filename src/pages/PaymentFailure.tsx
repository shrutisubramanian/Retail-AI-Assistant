import { useState } from "react";
import { MobileChatHeader } from "@/components/MobileChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DemoControlPanel from "@/components/DemoControlPanel";
import { Message, products, paymentMethods } from "@/data/mockData";
import { CreditCard, Smartphone, Gift, AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentFailure() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'initial' | 'payment1' | 'failed' | 'retry' | 'success'>('initial');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      agent: "sales",
      content: "Hi Sarah! Let's complete your purchase for the Bella Midnight Gown and Elegant Silver Heels. Your total is $518.",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [activeAgents, setActiveAgents] = useState<string[]>(["sales", "payment"]);
  const [isPaused, setIsPaused] = useState(false);

  const bellaDress = products.find(p => p.id === "bella-dress");
  const silverHeels = products.find(p => p.id === "silver-heels");
  const total = (bellaDress?.price || 0) + (silverHeels?.price || 0);

  const handleInitialPayment = () => {
    if (currentStep === 'initial') {
      setMessages(prev => [
        ...prev,
        {
          id: "2",
          agent: "user",
          content: "Let me pay with my Visa card ending in 4242.",
          timestamp: new Date(),
        },
      ]);
      setSelectedPaymentMethod("card-1");
      setCurrentStep('payment1');
      setActiveAgents(["payment"]);

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: "3",
            agent: "payment",
            content: "Processing your payment with Visa ****4242...",
            timestamp: new Date(),
          },
        ]);

        setTimeout(() => {
          setCurrentStep('failed');
          setActiveAgents(["payment", "sales"]);
          setMessages(prev => [
            ...prev,
            {
              id: "4",
              agent: "payment",
              content: "I'm sorry, but your payment was declined. This can happen due to insufficient funds, daily limits, or card issuer restrictions. Don't worry - I can help you complete this purchase with an alternative payment method.",
              timestamp: new Date(),
            },
          ]);
        }, 2000);
      }, 1000);
    }
  };

  const handleRetryPayment = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    const method = paymentMethods.find(m => m.id === methodId);
    
    setMessages(prev => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        agent: "user",
        content: method?.type === 'upi' 
          ? `Let me try with UPI: ${method.upiId}` 
          : method?.type === 'card'
          ? `Use my ${method.brand} card ending in ${method.last4}`
          : "Use my gift card",
        timestamp: new Date(),
      },
    ]);

    setCurrentStep('retry');
    setActiveAgents(["payment"]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `${Date.now()}-payment`,
          agent: "payment",
          content: "Processing your payment...",
          timestamp: new Date(),
        },
      ]);

      setTimeout(() => {
        setCurrentStep('success');
        setActiveAgents(["payment", "support"]);
        setMessages(prev => [
          ...prev,
          {
            id: `${Date.now()}-success`,
            agent: "payment",
            content: "Payment successful! Your order is confirmed.",
            timestamp: new Date(),
          },
          {
            id: `${Date.now()}-support`,
            agent: "support",
            content: "Thank you for your purchase, Sarah! You'll receive a confirmation email shortly. Your items will be ready for pickup today at 2:30 PM at Downtown Fashion Gallery. We'll send you a notification when they're ready!",
            timestamp: new Date(),
          },
        ]);
      }, 2000);
    }, 1000);
  };

  const handleReset = () => {
    setCurrentStep('initial');
    setMessages([
      {
        id: "1",
        agent: "sales",
        content: "Hi Sarah! Let's complete your purchase for the Bella Midnight Gown and Elegant Silver Heels. Your total is $518.",
        timestamp: new Date(),
      },
    ]);
    setSelectedPaymentMethod(null);
    setActiveAgents(["sales", "payment"]);
  };

  // Auto-start payment flow
  if (currentStep === 'initial' && messages.length === 1) {
    setTimeout(() => handleInitialPayment(), 1500);
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-subtle">
      <MobileChatHeader />
      
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Order Summary */}
        {(currentStep === 'initial' || currentStep === 'payment1') && (
          <Card className="shadow-elegant animate-fade-in">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{bellaDress?.name}</span>
                  <span>${bellaDress?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>{silverHeels?.name}</span>
                  <span>${silverHeels?.price}</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Failed - Alternative Options */}
        {currentStep === 'failed' && (
          <Card className="shadow-glow border-destructive/50 animate-fade-in">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Payment Declined</h3>
                  <p className="text-sm text-muted-foreground">
                    Visa ****4242 was declined
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">Try another payment method:</p>
                
                {paymentMethods.filter(m => m.id !== 'card-1').map((method) => (
                  <Button
                    key={method.id}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto p-4"
                    onClick={() => handleRetryPayment(method.id)}
                  >
                    {method.type === 'card' && (
                      <>
                        <CreditCard className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-medium">{method.brand} ****{method.last4}</div>
                          <div className="text-xs text-muted-foreground">Credit Card</div>
                        </div>
                      </>
                    )}
                    {method.type === 'upi' && (
                      <>
                        <Smartphone className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-medium">{method.upiId}</div>
                          <div className="text-xs text-muted-foreground">UPI Payment</div>
                        </div>
                      </>
                    )}
                    {method.type === 'gift-card' && (
                      <>
                        <Gift className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-medium">Gift Card</div>
                          <div className="text-xs text-muted-foreground">Balance: ${method.balance}</div>
                        </div>
                      </>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Processing */}
        {currentStep === 'retry' && (
          <Card className="shadow-glow border-accent/50 animate-fade-in">
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-accent/10 rounded-full">
                  <CreditCard className="h-8 w-8 text-accent animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Processing Payment</h3>
                <p className="text-sm text-muted-foreground">Please wait...</p>
              </div>
              <div className="flex justify-center gap-1">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Success */}
        {currentStep === 'success' && (
          <Card className="shadow-glow border-green-500/50 animate-fade-in">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-center gap-3 text-green-600">
                <CheckCircle2 className="h-8 w-8" />
                <div className="text-center">
                  <h3 className="text-xl font-bold">Payment Successful!</h3>
                  <p className="text-sm text-muted-foreground">Order #2024-10192045</p>
                </div>
              </div>

              <div className="space-y-2 text-sm bg-secondary/50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span>Amount Paid</span>
                  <span className="font-semibold">${total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="font-medium">
                    {paymentMethods.find(m => m.id === selectedPaymentMethod)?.type === 'upi' 
                      ? 'UPI' 
                      : paymentMethods.find(m => m.id === selectedPaymentMethod)?.brand || 'Gift Card'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup Location</span>
                  <span className="font-medium">Downtown Fashion Gallery</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup Time</span>
                  <span className="font-medium">Today, 2:30 PM</span>
                </div>
              </div>

              <Button 
                onClick={() => navigate("/")} 
                className="w-full"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <DemoControlPanel
        currentScenario="payment-failure"
        onScenarioChange={(scenario) => {
          if (scenario === 'mobile-to-kiosk') navigate('/mobile');
          if (scenario === 'vip-journey') navigate('/vip');
          if (scenario === 'out-of-stock') navigate('/out-of-stock');
        }}
        onReset={handleReset}
        isPaused={isPaused}
        onPauseToggle={() => setIsPaused(!isPaused)}
        activeAgents={activeAgents}
      />
    </div>
  );
}