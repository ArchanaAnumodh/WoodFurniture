import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRoute } from "wouter";
import { useState } from "react";
import { Minus, Plus, Heart, Share2, Star } from "lucide-react";
import chairImage from "@assets/generated_images/elegant_wooden_dining_chair.png";

export default function ProductDetails() {
  const [, params] = useRoute("/products/:id");
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in a real app this would be fetched based on ID
  const product = {
    id: params?.id,
    name: "The Artisan Dining Chair",
    price: 249.00,
    description: "Experience the perfect blend of mid-century modern design and artisan craftsmanship. Hand-carved from solid American walnut, this dining chair features a curved backrest for optimal support and a seat upholstered in premium textured fabric. Each piece is finished with natural oils to highlight the wood's unique grain patterns.",
    features: [
      "Solid American Walnut frame",
      "Ergonomic curved backrest",
      "Premium stain-resistant fabric",
      "Hand-finished with natural oils",
      "No assembly required"
    ],
    dimensions: "20\"W x 22\"D x 32\"H",
    images: [
      chairImage,
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&q=80&w=1000"
    ]
  };

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary/20 rounded-xl overflow-hidden">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-primary/50'} transition-all`}
                >
                  <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <Badge variant="outline" className="rounded-full px-3 py-1 border-primary/20 text-primary">In Stock</Badge>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <span className="text-sm text-muted-foreground">(24 reviews)</span>
            </div>
            
            <p className="text-2xl font-medium mb-8">${product.price.toFixed(2)}</p>
            
            <div className="prose prose-stone text-muted-foreground mb-8">
              <p>{product.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-medium mb-3">Dimensions</h3>
              <p className="text-muted-foreground bg-secondary/30 inline-block px-4 py-2 rounded-lg">{product.dimensions}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border rounded-full w-fit">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-1 rounded-full text-base">Add to Cart - ${(product.price * quantity).toFixed(2)}</Button>
              <Button variant="outline" size="icon" className="rounded-full aspect-square">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="border-t pt-8 mt-auto">
              <h3 className="font-serif text-lg mb-4">Product Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
