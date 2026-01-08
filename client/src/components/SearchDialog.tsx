import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Search } from "lucide-react";
import chairImage from "@assets/generated_images/elegant_wooden_dining_chair.png";
import tableImage from "@assets/generated_images/solid_oak_dining_table.png";

const ALL_PRODUCTS = [
  { id: 1, name: "The Artisan Dining Chair", price: 249.00, category: "Chairs", image: chairImage },
  { id: 2, name: "Solid Oak Dining Table", price: 899.00, category: "Tables", image: tableImage },
  { id: 3, name: "Minimalist Lounge Chair", price: 329.00, category: "Chairs", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000" },
  { id: 4, name: "Walnut Coffee Table", price: 449.00, category: "Tables", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=1000" },
  { id: 5, name: "Modern Bar Stool", price: 189.00, category: "Chairs", image: "https://images.unsplash.com/photo-1503602642458-2321114458cc?auto=format&fit=crop&q=80&w=1000" },
  { id: 6, name: "Round Side Table", price: 220.00, category: "Tables", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1000" },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");

  const filteredProducts = query.length > 0
    ? ALL_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Search Products</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chairs, tables..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
        
        <div className="mt-4 max-h-[300px] overflow-y-auto">
          {query.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Start typing to search...
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No products found for "{query}"
            </p>
          ) : (
            <div className="space-y-2">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={() => { onOpenChange(false); setQuery(""); }}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-secondary/30 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <p className="font-medium text-sm">${product.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
