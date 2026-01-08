import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button"; // Added import
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import chairImage from "@assets/generated_images/elegant_wooden_dining_chair.png";
import tableImage from "@assets/generated_images/solid_oak_dining_table.png";

const PRODUCTS = [
  { id: 1, name: "The Artisan Dining Chair", price: 249.00, category: "Chairs", image: chairImage, isNew: true },
  { id: 2, name: "Solid Oak Dining Table", price: 899.00, category: "Tables", image: tableImage, isNew: true },
  { id: 3, name: "Minimalist Lounge Chair", price: 329.00, category: "Chairs", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000" },
  { id: 4, name: "Walnut Coffee Table", price: 449.00, category: "Tables", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=1000" },
  { id: 5, name: "Modern Bar Stool", price: 189.00, category: "Chairs", image: "https://images.unsplash.com/photo-1503602642458-2321114458cc?auto=format&fit=crop&q=80&w=1000" },
  { id: 6, name: "Round Side Table", price: 220.00, category: "Tables", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1000" },
];

export default function ProductList() {
  return (
    <Layout>
      <div className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-primary">Shop Collection</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            Explore our curated selection of handcrafted furniture, designed to stand the test of time.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
            <div>
              <h3 className="font-serif text-lg font-medium mb-4">Categories</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="cat-chairs" defaultChecked />
                  <Label htmlFor="cat-chairs" className="text-base font-normal cursor-pointer">Chairs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cat-tables" defaultChecked />
                  <Label htmlFor="cat-tables" className="text-base font-normal cursor-pointer">Tables</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cat-storage" />
                  <Label htmlFor="cat-storage" className="text-base font-normal cursor-pointer">Storage</Label>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-serif text-lg font-medium mb-4">Price Range</h3>
              <Slider defaultValue={[0, 1000]} max={2000} step={10} className="mb-4" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹0</span>
                <span>₹2000+</span>
              </div>
            </div>

            <Separator />

             <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-serif text-lg font-medium">Materials</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mat-oak" />
                      <Label htmlFor="mat-oak">Oak</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mat-walnut" />
                      <Label htmlFor="mat-walnut">Walnut</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mat-ash" />
                      <Label htmlFor="mat-ash">Ash</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Pagination Placeholder */}
            <div className="mt-16 flex justify-center">
              <nav className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground border-primary">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
