import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Truck, ShieldCheck, PenTool } from "lucide-react";
import ProductCard from "../components/ProductCard";
import heroImage from "../assets/generated_images/cozy_modern_living_room_with_wooden_furniture.png";



export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load products", err);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Modern living room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-white">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl md:text-7xl mb-6">
              Crafted for <br />
              <span className="italic text-secondary">Comfort</span> & Style.
            </h1>
            <p className="text-lg mb-8">
              Discover our collection of handcrafted chairs and tables.
            </p>
            <div className="flex gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-black rounded-full px-8">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/customization">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Custom Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between mb-12">
            <div>
              <h2 className="font-serif text-4xl text-primary">New Arrivals</h2>
              <p className="text-muted-foreground">
                Fresh from our workshop to your home.
              </p>
            </div>
            <Link href="/products" className="flex items-center gap-1 text-primary">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading products…</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <PenTool className="h-8 w-8 mb-4" />
            <h3 className="text-xl mb-2">Custom Craftsmanship</h3>
            <p>Every piece is handcrafted by skilled artisans.</p>
          </div>
          <div>
            <ShieldCheck className="h-8 w-8 mb-4" />
            <h3 className="text-xl mb-2">Lifetime Warranty</h3>
            <p>We stand behind the quality of our furniture.</p>
          </div>
          <div>
            <Truck className="h-8 w-8 mb-4" />
            <h3 className="text-xl mb-2">White Glove Delivery</h3>
            <p>Delivered and assembled exactly where you want.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
