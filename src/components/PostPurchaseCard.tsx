import { Button } from "@/components/ui/button";
import { Headphones, MapPin, Star, CheckCircle2, Package } from "lucide-react";
import { useState } from "react";

interface PostPurchaseCardProps {
  trackingId: string;
  pickupLocation?: string;
}

export const PostPurchaseCard = ({ trackingId, pickupLocation }: PostPurchaseCardProps) => {
  const [showTimeline, setShowTimeline] = useState(true);

  const timelineSteps = [
    { label: "Order Placed", time: "Just now", completed: true },
    { label: "Payment Confirmed", time: "Just now", completed: true },
    { label: "Being Prepared", time: "In progress", completed: false },
    { label: "Ready for Pickup", time: "Today, 2:00 PM", completed: false },
  ];

  return (
    <div className="rounded-xl border-2 border-agent-sales/20 bg-gradient-to-br from-agent-sales/5 to-transparent p-4 shadow-elegant animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-agent-sales/10">
          <Headphones className="h-4 w-4 text-agent-sales" />
        </div>
        <span className="text-sm font-semibold text-agent-sales">Post-Purchase Support Agent</span>
      </div>

      <div className="space-y-4">
        {/* Order ID Card */}
        <div className="rounded-lg bg-gradient-to-br from-primary/5 to-transparent border-2 border-primary/20 p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Order ID</div>
              <div className="font-mono text-base font-bold text-primary">#{trackingId}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        {/* Pickup Location */}
        {pickupLocation && (
          <div className="rounded-lg bg-card border border-border p-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-agent-inventory mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Pickup Location</div>
                <div className="text-sm font-medium">{pickupLocation}</div>
              </div>
            </div>
          </div>
        )}

        {/* Order Timeline */}
        <div className="rounded-lg bg-card border border-border p-3">
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Order Timeline</span>
            </div>
            <span className="text-xs text-muted-foreground">{showTimeline ? '▲' : '▼'}</span>
          </button>

          {showTimeline && (
            <div className="space-y-3 animate-fade-in">
              {timelineSteps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div 
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        step.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'bg-background border-muted-foreground/30'
                      }`}
                    >
                      {step.completed && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                    {index < timelineSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ${step.completed ? 'bg-green-500' : 'bg-muted-foreground/20'}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className={`text-sm font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notification Banner */}
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
          <p className="text-xs text-muted-foreground">
            📱 You'll receive a notification when your order is ready for pickup
          </p>
        </div>

        {/* Feedback Section */}
        <div className="pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">
            How was your shopping experience today?
          </p>
          <Button variant="outline" className="w-full gap-2">
            <Star className="h-4 w-4" />
            Leave Feedback
          </Button>
        </div>
      </div>
    </div>
  );
};
