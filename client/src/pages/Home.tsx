import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Truck, ShieldCheck, PenTool } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import heroImage from "@assets/generated_images/cozy_modern_living_room_with_wooden_furniture.png";
import chairImage from "@assets/generated_images/elegant_wooden_dining_chair.png";
import tableImage from "@assets/generated_images/solid_oak_dining_table.png";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "The Artisan Dining Chair",
    price: 249.00,
    category: "Chairs",
    image: chairImage,
    isNew: true,
  },
  {
    id: 2,
    name: "Solid Oak Dining Table",
    price: 899.00,
    category: "Tables",
    image: tableImage,
    isNew: true,
  },
  {
    id: 3,
    name: "Minimalist Lounge Chair",
    price: 329.00,
    category: "Chairs",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 4,
    name: "Walnut Coffee Table",
    price: 449.00,
    category: "Tables",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=1000",
  }
];

export default function Home() {
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
          <div className="max-w-2xl animate-in slide-in-from-bottom-10 fade-in duration-1000">
            <h1 className="font-serif text-5xl md:text-7xl font-medium leading-tight mb-6">
              Crafted for <br/> <span className="italic text-secondary">Comfort</span> & Style.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg leading-relaxed font-light">
              Discover our collection of handcrafted chairs and tables, designed to bring warmth and elegance to your modern home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 text-base">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/customization">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full px-8 text-base">
                  Custom Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/products?category=chairs" className="group relative h-[400px] overflow-hidden rounded-2xl block">
              <img 
                src="https://images.unsplash.com/photo-1503602642458-2321114458cc?auto=format&fit=crop&q=80&w=1000" 
                alt="Chairs" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-serif text-3xl mb-2">Chairs</h3>
                <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                  View Collection <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
            <Link href="/products?category=tables" className="group relative h-[400px] overflow-hidden rounded-2xl block">
              <img 
                src="https://images.unsplash.com/photo-1577140917170-285929db55cc?auto=format&fit=crop&q=80&w=1000" 
                alt="Tables" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-serif text-3xl mb-2">Tables</h3>
                <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                  View Collection <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-2">New Arrivals</h2>
              <p className="text-muted-foreground">Fresh from our workshop to your home.</p>
            </div>
            <Link href="/products" className="text-primary font-medium hover:underline underline-offset-4 flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="p-3 bg-white/10 rounded-full mb-6 text-accent">
                <PenTool className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">Custom Craftsmanship</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Every piece is handcrafted by skilled artisans. Customize dimensions and finishes to fit your space perfectly.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="p-3 bg-white/10 rounded-full mb-6 text-accent">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">Lifetime Warranty</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                We stand behind the quality of our furniture. Enjoy peace of mind with our comprehensive structural warranty.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="p-3 bg-white/10 rounded-full mb-6 text-accent">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">White Glove Delivery</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                We don't just ship boxes. Our team delivers, assembles, and places your furniture exactly where you want it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">Create Your Dream Home</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Start your journey with WoodCraft today. Browse our collection or request a custom piece designed just for you.
          </p>
          <Link href="/signup">
             <Button size="lg" className="px-10 rounded-full">Join WoodCraft</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
