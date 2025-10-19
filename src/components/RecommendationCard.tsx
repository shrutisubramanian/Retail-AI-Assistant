import { Product } from "@/data/mockData";
import { Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface RecommendationCardProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

export const RecommendationCard = ({ products, onSelect }: RecommendationCardProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="rounded-xl border-2 border-agent-recommendation/20 bg-gradient-to-br from-agent-recommendation/5 to-transparent p-4 shadow-elegant animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-agent-recommendation/10">
          <Sparkles className="h-4 w-4 text-agent-recommendation" />
        </div>
        <span className="text-sm font-semibold text-agent-recommendation">Recommendation Agent</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Based on your preferences and browsing history, I've curated these perfect gift options:
      </p>
      
      {/* Swipeable carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-full"
              >
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm flex-1">{product.name}</h4>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full whitespace-nowrap ml-2">Popular Gift</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold">${product.price}</p>
                      <Button 
                        size="sm" 
                        onClick={() => onSelect(product)}
                        className="gap-1"
                      >
                        Select
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-1.5 mt-3">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === selectedIndex 
                  ? 'w-6 bg-agent-recommendation' 
                  : 'w-1.5 bg-muted-foreground/30'
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
