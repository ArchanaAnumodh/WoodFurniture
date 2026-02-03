import { Link, useLocation } from "wouter";
import { cn } from "../lib/utils";
import { ShoppingCart, User, Menu, Search, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import SearchDialog from "./SearchDialog";
import { getCart } from "../utils/cart";
import { getWishlist } from "../utils/wishlist";

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateCounts = () => {
    const cart = getCart();
    const wishlist = getWishlist();

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    setCartCount(totalQty);
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCounts(); // initial load

    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);

    return () => {
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("wishlistUpdated", updateCounts);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Customization", href: "/customization" },
    { name: "Repair", href: "/repair" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="font-serif text-2xl font-bold text-primary">
              WoodCraft.
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-8 items-center">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === link.href
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">

              {/* Search */}
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full px-1.5">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User */}
              <Link href="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-6 mt-10">
                    {navLinks.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-medium"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium"
                    >
                      Login / Signup
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
