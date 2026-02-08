import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Link } from "wouter";

type ProductImage = {
  image: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  images: string[]
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/`)
      .then(res => res.json())
      .then(data => {
          const fixed = data.map((p: any) => ({
            ...p,
            images: p.images?.map((img: any) =>
              img.image.startsWith("http")
                ? img.image
                : `http://127.0.0.1:8000${img.image}`
            ) || [],
          }));

  setProducts(fixed);
  setLoading(false);
})


      .catch(() => setLoading(false));
  }, []);

  return (
    <Layout>
      {/* Header */}
      <div className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl font-medium">
            Shop Collection
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            Explore our curated selection of handcrafted furniture.
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {loading ? (
          <div className="text-center py-20">Loading products…</div>
        ) : (
          <>
            {products.length === 0 && (
              <p className="text-center text-muted-foreground py-20">
                No products available.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="border rounded-xl bg-white hover:shadow-lg transition flex flex-col"
                >
                 <div className="h-56 w-full bg-gray-100 rounded-lg overflow-hidden">
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-sm text-gray-400">
                        No image
                      </div>
                    )}
                  </div>


                  <div className="p-4 flex flex-col flex-1">
                    <h2 className="font-medium text-lg mb-2 line-clamp-2">
                      {product.name}
                    </h2>
                    <p className="text-muted-foreground mt-auto">
                      ₹{product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination UI (placeholder) */}
            <div className="mt-16 flex justify-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-white">
                1
              </Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
