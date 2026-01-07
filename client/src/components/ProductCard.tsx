import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <Card className="h-full border-none shadow-none bg-transparent overflow-hidden transition-all duration-300 hover:shadow-lg rounded-xl">
        <CardContent className="p-0 relative aspect-square bg-secondary/20 overflow-hidden rounded-xl">
          {product.isNew && (
            <Badge className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground hover:bg-primary/90">
              New Arrival
            </Badge>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
             <Button size="sm" className="bg-white text-black hover:bg-white/90 shadow-md">
                View Details
             </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start px-1 pt-4 pb-0">
          <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category}</span>
          <h3 className="font-serif font-medium text-lg leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="mt-1 font-medium text-foreground">${product.price.toFixed(2)}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
