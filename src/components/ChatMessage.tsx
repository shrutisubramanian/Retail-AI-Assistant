import { Message } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { User, Bot, ShoppingBag, Package, Gift, Headphones } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

const agentConfig = {
  sales: {
    name: "Sales Agent",
    icon: Bot,
    color: "agent-sales",
  },
  recommendation: {
    name: "Recommendation Agent",
    icon: ShoppingBag,
    color: "agent-recommendation",
  },
  inventory: {
    name: "Inventory Agent",
    icon: Package,
    color: "agent-inventory",
  },
  loyalty: {
    name: "Loyalty & Offers Agent",
    icon: Gift,
    color: "agent-loyalty",
  },
  support: {
    name: "Support Agent",
    icon: Headphones,
    color: "agent-sales",
  },
  user: {
    name: "You",
    icon: User,
    color: "muted",
  },
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const config = agentConfig[message.agent];
  const Icon = config.icon;
  const isUser = message.agent === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isUser && "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-muted" : `bg-${config.color}/10`
        )}
      >
        <Icon className={cn("h-4 w-4", isUser ? "text-muted-foreground" : `text-${config.color}`)} />
      </div>
      <div className={cn("flex-1 space-y-2", isUser && "flex flex-col items-end")}>
        <div className={cn("flex items-center gap-2", isUser && "flex-row-reverse")}>
          <span className="text-xs font-medium text-muted-foreground">
            {config.name}
          </span>
          {!isUser && (
            <span className="text-xs text-muted-foreground">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border"
          )}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
      </div>
    </div>
  );
};
