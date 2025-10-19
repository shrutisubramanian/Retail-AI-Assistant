import { ArrowLeft, MoreVertical, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MobileChatHeader = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-sm">Style Assistant</h1>
              <Crown className="h-3.5 w-3.5 text-yellow-500" />
            </div>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Context chips */}
      <div className="px-4 pb-3 flex gap-2 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs whitespace-nowrap">
          <Crown className="h-3 w-3 text-yellow-500" />
          <span className="text-yellow-700 dark:text-yellow-400 font-medium">Gold Tier</span>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-muted text-xs text-muted-foreground whitespace-nowrap">
          Recently viewed: Accessories
        </div>
      </div>
    </header>
  );
};
