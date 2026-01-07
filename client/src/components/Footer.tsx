import { Link } from "wouter";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-primary mb-4 block">
              WoodCraft.
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Handcrafted furniture designed to bring warmth and elegance to your home. 
              Sustainably sourced and artisan made.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products?category=chairs" className="hover:text-primary transition-colors">Chairs</Link></li>
              <li><Link href="/products?category=tables" className="hover:text-primary transition-colors">Tables</Link></li>
              <li><Link href="/customization" className="hover:text-primary transition-colors">Custom Orders</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/repair" className="hover:text-primary transition-colors">Repair Service</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
            <p className="text-xs text-muted-foreground">
              Subscribe to our newsletter for new collection updates.
            </p>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; 2024 WoodCraft Furniture. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
