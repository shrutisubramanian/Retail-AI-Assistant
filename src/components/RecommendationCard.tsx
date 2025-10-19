import { Product } from "@/data/mockData";
import { Sparkles } from "lucide-react";

interface RecommendationCardProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

export const RecommendationCard = ({ products, onSelect }: RecommendationCardProps) => {
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
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer rounded-lg border border-border bg-card p-3 transition-all hover:shadow-glow"
            onClick={() => onSelect(product)}
          >
            <div className="flex gap-3">
              <img
                src={product.image}
                alt={product.name}
                className="h-20 w-20 rounded-md object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{product.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{product.description}</p>
                <p className="text-lg font-bold mt-2">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
