import { Button } from "@/components/ui/button";
import { Package, Store, Truck } from "lucide-react";
import { useState } from "react";

interface InventoryWidgetProps {
  productName: string;
  onReserve: (method: "pickup" | "ship") => void;
}

export const InventoryWidget = ({ productName, onReserve }: InventoryWidgetProps) => {
  const [selectedSlot, setSelectedSlot] = useState<string>("today-2pm");
  const [showDetails, setShowDetails] = useState(false);

  const timeSlots = [
    { value: "today-2pm", label: "Today at 2:00 PM", available: true },
    { value: "today-4pm", label: "Today at 4:00 PM", available: true },
    { value: "today-6pm", label: "Today at 6:00 PM", available: false },
    { value: "tomorrow-10am", label: "Tomorrow at 10:00 AM", available: true },
    { value: "tomorrow-2pm", label: "Tomorrow at 2:00 PM", available: true },
  ];

  return (
    <div className="rounded-xl border-2 border-agent-inventory/20 bg-gradient-to-br from-agent-inventory/5 to-transparent p-4 shadow-elegant animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-agent-inventory/10">
          <Package className="h-4 w-4 text-agent-inventory" />
        </div>
        <span className="text-sm font-semibold text-agent-inventory">Inventory & Fulfillment Agent</span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Great news! The {productName} is available:
      </p>

      <div className="space-y-3">
        {/* Online Stock */}
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3 flex-1">
              <Truck className="h-5 w-5 text-agent-inventory mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-sm">Online Stock</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-green-600 font-medium">✅ Available</span>
                  <span className="text-xs text-muted-foreground">Ship to Home (2-3 days)</span>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={() => onReserve("ship")}>
              Ship
            </Button>
          </div>
        </div>

        {/* Store Stock */}
        <div className="rounded-lg border-2 border-agent-inventory/30 bg-agent-inventory/5 p-3">
          <div className="flex items-start gap-3 mb-3">
            <Store className="h-5 w-5 text-agent-inventory mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-sm">Store Stock</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-green-600 font-medium">🏬 In 3 Nearby Stores</span>
              </div>
            </div>
          </div>

          {/* Slot Picker */}
          <div className="space-y-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md border border-border bg-background text-sm"
            >
              <span className="text-muted-foreground">
                🕒 {timeSlots.find(s => s.value === selectedSlot)?.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {showDetails ? '▲' : '▼'}
              </span>
            </button>

            {showDetails && (
              <div className="space-y-1 animate-fade-in">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.value}
                    disabled={!slot.available}
                    onClick={() => {
                      setSelectedSlot(slot.value);
                      setShowDetails(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      slot.value === selectedSlot
                        ? 'bg-agent-inventory/10 border border-agent-inventory/30'
                        : slot.available
                        ? 'bg-background border border-border hover:bg-muted/50'
                        : 'bg-muted/30 text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{slot.label}</span>
                      {!slot.available && (
                        <span className="text-xs text-destructive">Full</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button className="w-full mt-3" onClick={() => onReserve("pickup")}>
            Reserve for Pickup
          </Button>
        </div>
      </div>
    </div>
  );
};
