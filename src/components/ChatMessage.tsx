import { cn } from "@/lib/utils";
import { User, Bot, ShoppingBag, Package, Gift, Headphones, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Message } from "@/data/mockData";

interface ChatMessageProps {
  message: Message;
}

const agentConfig = {
  sales: { name: "Sales Agent", icon: Bot, color: "text-agent-sales" },
  recommendation: { name: "Recommendation Agent", icon: ShoppingBag, color: "text-agent-recommendation" },
  inventory: { name: "Inventory Agent", icon: Package, color: "text-agent-inventory" },
  loyalty: { name: "Loyalty Agent", icon: Gift, color: "text-agent-loyalty" },
  support: { name: "Support Agent", icon: Headphones, color: "text-agent-sales" },
  payment: { name: "Payment Agent", icon: CreditCard, color: "text-agent-payment" },
  fulfillment: { name: "Fulfillment Agent", icon: Truck, color: "text-agent-inventory" },
  user: { name: "You", icon: User, color: "muted" },
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const config = agentConfig[message.agent];
  const Icon = config.icon;
  const isUser = message.agent === "user";
  const channel = localStorage.getItem("channel") || "web";

  return (
    <div className={cn("flex gap-3 animate-fade-in", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-muted" : `bg-${config.color.replace("text-","")}/10`
        )}
      >
        <Icon className={cn("h-4 w-4", isUser ? "text-muted-foreground" : config.color)} />
      </div>

      <div className={cn("flex-1 space-y-2", isUser && "flex flex-col items-end")}>
        {/* header: name + time + channel pill */}
        <div className={cn("flex items-center gap-2", isUser && "flex-row-reverse")}>
          <span className="text-xs font-medium text-muted-foreground">{config.name}</span>
          {!isUser && (
            <>
              <span className="text-xs text-muted-foreground">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {channel}
              </span>
            </>
          )}
        </div>

        {/* message bubble */}
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-sm max-w-[75%]",
            isUser ? "bg-primary text-primary-foreground" : "bg-card border border-border"
          )}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        {/* action buttons */}
        {message.actions && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.actions.map((a, i) => (
              <Button key={i} size="sm" variant="outline" className="gap-2">
                {a.label}
              </Button>
            ))}
          </div>
        )}

        {/* product carousel */}
        {message.products && (
          <div className="flex gap-3 overflow-x-auto py-2">
            {message.products.map((p) => (
              <Card key={p.id} className="w-60 shrink-0 shadow-sm">
                <CardContent className="p-3 space-y-2">
                  <img src={p.image} alt={p.name} className="rounded-md object-cover h-32 w-full" />
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">${p.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};