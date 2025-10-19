import { Button } from "@/components/ui/button";
import { Headphones, MapPin, Star } from "lucide-react";

interface PostPurchaseCardProps {
  trackingId: string;
  pickupLocation?: string;
}

export const PostPurchaseCard = ({ trackingId, pickupLocation }: PostPurchaseCardProps) => {
  return (
    <div className="rounded-xl border-2 border-agent-sales/20 bg-gradient-to-br from-agent-sales/5 to-transparent p-4 shadow-elegant animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-agent-sales/10">
          <Headphones className="h-4 w-4 text-agent-sales" />
        </div>
        <span className="text-sm font-semibold text-agent-sales">Post-Purchase Support</span>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg bg-card border border-border p-3">
          <div className="text-xs text-muted-foreground mb-1">Order Confirmation</div>
          <div className="font-mono text-sm font-medium">#{trackingId}</div>
        </div>

        {pickupLocation && (
          <div className="rounded-lg bg-card border border-border p-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-agent-inventory mt-0.5" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Pickup Location</div>
                <div className="text-sm font-medium">{pickupLocation}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  You'll receive a notification when your order is ready for pickup
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">
            How was your shopping experience today?
          </p>
          <Button variant="outline" className="w-full gap-2">
            <Star className="h-4 w-4" />
            Share Feedback
          </Button>
        </div>
      </div>
    </div>
  );
};
