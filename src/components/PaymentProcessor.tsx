import { useState, useEffect } from "react";
import { CreditCard, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentProcessorProps {
  amount: number;
  onSuccess: () => void;
}

export const PaymentProcessor = ({ amount, onSuccess }: PaymentProcessorProps) => {
  const [status, setStatus] = useState<"processing" | "success" | "failed">("processing");

  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(() => {
      setStatus("success");
      setTimeout(onSuccess, 1500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onSuccess]);

  return (
    <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-4 shadow-elegant animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <CreditCard className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm font-semibold text-primary">Payment Agent</span>
      </div>

      <div className="text-center py-6">
        {status === "processing" && (
          <div className="space-y-3">
            <div className="h-12 w-12 mx-auto rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <p className="text-sm font-medium">Processing payment of ${amount.toFixed(2)}...</p>
            <p className="text-xs text-muted-foreground">Please wait while we secure your transaction</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-3 animate-scale-in">
            <div className="h-12 w-12 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm font-medium text-green-600">Payment Successful!</p>
            <p className="text-xs text-muted-foreground">Your order has been confirmed</p>
          </div>
        )}

        {status === "failed" && (
          <div className="space-y-3">
            <div className="h-12 w-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <p className="text-sm font-medium text-destructive">Payment Failed</p>
            <p className="text-xs text-muted-foreground">Please check your payment method and try again</p>
            <Button variant="outline" className="mt-2">
              Retry Payment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
