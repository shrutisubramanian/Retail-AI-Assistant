import { Product } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  onCheckAvailability?: (product: Product) => void;
}

export const ProductCard = ({ product, onSelect, onCheckAvailability }: ProductCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-elegant transition-all hover:shadow-glow animate-slide-up">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        {product.stockCount && product.stockCount <= 2 && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Low Stock
          </Badge>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-base">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price}</span>
          {product.inStock ? (
            <Badge variant="secondary" className="gap-1">
              <Package className="h-3 w-3" />
              In Stock
            </Badge>
          ) : (
            <Badge variant="outline">Out of Stock</Badge>
          )}
        </div>
        <div className="flex gap-2">
          {onSelect && (
            <Button
              onClick={() => onSelect(product)}
              variant="default"
              size="sm"
              className="flex-1 gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Select
            </Button>
          )}
          {onCheckAvailability && (
            <Button
              onClick={() => onCheckAvailability(product)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Check Availability
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
