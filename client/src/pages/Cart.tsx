import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  getCart,
  updateQuantity,
  removeFromCart,
  CartItem,
} from "../utils/cart";

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const changeQty = (id: number, qty: number) => {
    if (qty < 1) return;
    updateQuantity(id, qty);
    setItems(getCart());
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-16">
        <h1 className="font-serif text-4xl mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-6 border rounded-xl p-4"
                >
                  <div className="h-24 w-24 bg-gray-100 rounded overflow-hidden">
                      
                      {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-sm text-gray-400">
                            No image
                          </div>
                        )}


                    </div>


                  <div className="flex-1">
                    <h2 className="font-medium">{item.name}</h2>
                    <p className="text-muted-foreground">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        changeQty(item.id, item.quantity - 1)
                      }
                    >
                      <Minus />
                    </Button>

                    <span>{item.quantity}</span>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        changeQty(item.id, item.quantity + 1)
                      }
                    >
                      <Plus />
                    </Button>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      removeFromCart(item.id);
                      setItems(getCart());
                    }}
                  >
                    <Trash />
                  </Button>
                 </div>

                 
              ))}
            </div>

            <div className="mt-10 flex justify-between items-center">
              <h2 className="text-2xl font-medium">
                Total: ₹{total.toFixed(2)}
              </h2>

              <Link href="/checkout">
                <Button className="w-full mt-4">Proceed to Checkout</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
