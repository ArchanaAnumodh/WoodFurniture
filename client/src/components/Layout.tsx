import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background selection:bg-accent/30">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
