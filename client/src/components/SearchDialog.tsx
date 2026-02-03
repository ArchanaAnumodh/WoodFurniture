import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Search } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  // 🔥 Fetch products from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Search fetch error:", err));
  }, []);

  // 🔍 Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

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
                  {/* ✅ IMAGE FROM DJANGO BACKEND */}
                  <div className="w-12 h-12 bg-secondary/30 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                        src={
                          product.images?.[0]?.image ||
                          "https://via.placeholder.com/100x100?text=No+Image"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />

                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>

                  <p className="font-medium text-sm">₹{product.price}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
