import { Button } from "@/components/ui/button";
import { Gift, Tag, ChevronDown } from "lucide-react";
import { useState } from "react";

interface CheckoutSummaryProps {
  subtotal: number;
  goldDiscount: number;
  couponDiscount: number;
  onProceedPayment: () => void;
}

export const CheckoutSummary = ({ 
  subtotal, 
  goldDiscount, 
  couponDiscount, 
  onProceedPayment 
}: CheckoutSummaryProps) => {
  const [showBreakdown, setShowBreakdown] = useState(true);
  const totalSavings = goldDiscount + couponDiscount;
  const finalPrice = subtotal - totalSavings;

  return (
    <div className="rounded-xl border-2 border-agent-loyalty/20 bg-gradient-to-br from-agent-loyalty/5 to-transparent p-4 shadow-elegant animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-agent-loyalty/10">
          <Gift className="h-4 w-4 text-agent-loyalty" />
        </div>
        <span className="text-sm font-semibold text-agent-loyalty">Loyalty & Offers Agent</span>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Your Gold Tier benefits have been applied:
      </p>

      {/* Summary header - always visible */}
      <div className="rounded-lg bg-card border-2 border-primary/20 p-3 mb-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Final Price</span>
          <span className="text-2xl font-bold text-primary">${finalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-muted-foreground">You saved ${totalSavings.toFixed(2)}</span>
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="text-xs text-primary flex items-center gap-1"
          >
            {showBreakdown ? 'Hide' : 'Show'} details
            <ChevronDown className={`h-3 w-3 transition-transform ${showBreakdown ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Collapsible breakdown */}
      {showBreakdown && (
        <div className="space-y-2 mb-4 animate-fade-in">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              Gold Tier (15%)
            </span>
            <span className="font-medium">-${goldDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              Coupon Code
            </span>
            <span className="font-medium">-${couponDiscount.toFixed(2)}</span>
          </div>
        </div>
      )}

      <Button className="w-full" size="lg" onClick={onProceedPayment}>
        Proceed to Payment
      </Button>
    </div>
  );
};
