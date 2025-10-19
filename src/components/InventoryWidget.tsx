import { Button } from "@/components/ui/button";
import { Package, Store, Truck } from "lucide-react";
import { useState } from "react";

interface InventoryWidgetProps {
  productName: string;
  onReserve: (method: "pickup" | "ship") => void;
}

export const InventoryWidget = ({ productName, onReserve }: InventoryWidgetProps) => {
  const [selectedSlot, setSelectedSlot] = useState<string>("today-2pm");

  return (
    <div className="rounded-xl border-2 border-agent-inventory/20 bg-gradient-to-br from-agent-inventory/5 to-transparent p-4 shadow-elegant animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-agent-inventory/10">
          <Package className="h-4 w-4 text-agent-inventory" />
        </div>
        <span className="text-sm font-semibold text-agent-inventory">Inventory & Fulfillment</span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Great news! The {productName} is available through multiple fulfillment options:
      </p>

      <div className="space-y-3">
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-agent-inventory mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-sm">Ship to Home</div>
              <div className="text-xs text-muted-foreground mt-1">In Stock - Delivery in 2-3 days</div>
            </div>
            <Button size="sm" variant="outline" onClick={() => onReserve("ship")}>
              Select
            </Button>
          </div>
        </div>

        <div className="rounded-lg border-2 border-agent-inventory/30 bg-agent-inventory/5 p-3">
          <div className="flex items-start gap-3">
            <Store className="h-5 w-5 text-agent-inventory mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-sm">Click & Collect</div>
              <div className="text-xs text-muted-foreground mt-1">Available at 3/5 nearby stores</div>
              <div className="mt-3 space-y-2">
                <label className="text-xs font-medium">Select pickup time:</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="today-2pm">Today at 2:00 PM</option>
                  <option value="today-4pm">Today at 4:00 PM</option>
                  <option value="tomorrow-10am">Tomorrow at 10:00 AM</option>
                  <option value="tomorrow-2pm">Tomorrow at 2:00 PM</option>
                </select>
              </div>
            </div>
          </div>
          <Button className="w-full mt-3" onClick={() => onReserve("pickup")}>
            Reserve for Pickup
          </Button>
        </div>
      </div>
    </div>
  );
};
