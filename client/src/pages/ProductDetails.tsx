import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useRoute } from "wouter";
import { Minus, Plus, Heart, Star, ArrowLeft } from "lucide-react";
import { toggleWishlist, isInWishlist } from "../utils/wishlist";
import { addToCart } from "../utils/cart";

type ProductImage = {
  image: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  dimensions: string;
  images: string[]; 
};

export default function ProductDetails() {
  const [match, params] = useRoute<{ id: string }>("/products/:id");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [wishlisted, setWishlisted] = useState(false);

 useEffect(() => {
  if (!match || !params?.id) return;

  setLoading(true);

  fetch(`http://127.0.0.1:8000/api/products/${params.id}/`)
    .then(res => res.json())
    .then(data => {
      const fixed = {
        ...data,
        images: data.images?.map((img: any) =>
          img.image.startsWith("http")
            ? img.image
            : `${import.meta.env.VITE_API_BASE_URL}${img.image}`
        ) || [],
      };

  setProduct(fixed);
  setMainImage(fixed.images?.[0] ?? null);
  setLoading(false);
})


    .catch(() => setLoading(false));
}, [match, params?.id]);


  useEffect(() => {
    if (product) {
      setWishlisted(isInWishlist(product.id));
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] ||"",
      },
      quantity
    );

    alert("Added to cart 🛒");
  };

  const handleWishlist = () => {
    if (!product) return;

    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] ||"",
      
    });

    setWishlisted(isInWishlist(product.id));
  };

  if (loading) {
    return <Layout><div className="p-20 text-center">Loading…</div></Layout>;
  }

  if (!product) {
    return <Layout><div className="p-20 text-center">Product not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              {mainImage && (
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}


            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setMainImage(img)}>
                      <img src={img} />
                    </button>
                  ))}

              </div>
            )}
          </div>

          <div className="flex flex-col">
            <Badge variant="outline" className="mb-2 rounded-full px-3 py-1">In Stock</Badge>

            <h1 className="font-serif text-4xl md:text-5xl mb-4">{product.name}</h1>

            <div className="flex text-yellow-500 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>

            <p className="text-2xl font-medium mb-8">₹{product.price.toFixed(2)}</p>
            <p className="mb-6 text-muted-foreground">{product.description}</p>
            <p className="mb-8 text-muted-foreground"><strong>Dimensions:</strong> {product.dimensions}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border rounded-full">
                <Button size="icon" variant="ghost" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus /></Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button size="icon" variant="ghost" onClick={() => setQuantity(q => q + 1)}><Plus /></Button>
              </div>

              <Button size="lg" className="flex-1 rounded-full" onClick={handleAddToCart}>
                Add to Cart – ₹{product.price.toFixed(2)}
              </Button>

              <Button
                size="icon"
                variant="outline"
                className={`rounded-full ${wishlisted ? "text-red-500 border-red-500" : ""}`}
                onClick={handleWishlist}
              >
                <Heart className={`h-5 w-5 ${wishlisted ? "fill-red-500" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
