import { Button } from "@/components/ui/button";
import { Gift, Tag } from "lucide-react";

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

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-agent-loyalty">
          <span className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            Gold Tier Discount (15%):
          </span>
          <span className="font-medium">-${goldDiscount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-agent-loyalty">
          <span className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            Coupon Applied:
          </span>
          <span className="font-medium">-${couponDiscount.toFixed(2)}</span>
        </div>
        <div className="border-t border-border pt-2 mt-2">
          <div className="flex justify-between text-sm font-medium text-green-600">
            <span>Total Savings:</span>
            <span>${totalSavings.toFixed(2)}</span>
          </div>
        </div>
        <div className="border-t-2 border-border pt-2 mt-2">
          <div className="flex justify-between text-lg font-bold">
            <span>Final Price:</span>
            <span className="text-primary">${finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button className="w-full" size="lg" onClick={onProceedPayment}>
        Proceed to Payment
      </Button>
    </div>
  );
};
