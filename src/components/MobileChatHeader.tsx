import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MobileChatHeader = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-sm px-4 py-3">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="font-semibold text-sm">Style Assistant</h1>
          <p className="text-xs text-muted-foreground">Always here to help</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <MoreVertical className="h-5 w-5" />
      </Button>
    </header>
  );
};
