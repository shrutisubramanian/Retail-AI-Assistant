import { useState, useEffect } from "react";
import { CreditCard, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentProcessorProps {
  amount: number;
  onSuccess: () => void;
}

export const PaymentProcessor = ({ amount, onSuccess }: PaymentProcessorProps) => {
  const [status, setStatus] = useState<"processing" | "success" | "failed">("processing");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate payment processing with progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setStatus("success");
      setTimeout(onSuccess, 1500);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
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
          <div className="space-y-4">
            <div className="relative h-12 w-12 mx-auto">
              <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Processing payment...</p>
              <p className="text-lg font-bold text-primary">${amount.toFixed(2)}</p>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Securing your transaction...</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-3">
            <div className="relative h-16 w-16 mx-auto">
              <div className="absolute inset-0 h-16 w-16 rounded-full bg-green-500/10 animate-ping" />
              <div className="relative h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600 animate-scale-in" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-base font-bold text-green-600">Payment Successful!</p>
              <p className="text-xs text-muted-foreground">Order #VIP2024-10192045 confirmed</p>
            </div>
          </div>
        )}

        {status === "failed" && (
          <div className="space-y-3">
            <div className="h-12 w-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <p className="text-sm font-medium text-destructive">Payment Failed</p>
            <p className="text-xs text-muted-foreground">Please try again or use a different payment method</p>
            <Button variant="outline" className="mt-2">
              Retry Payment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
