import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { getCart, clearCart } from "../utils/cart";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Address = {
  id: number;
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  is_default?: boolean;
};

// 🔒 Normalizer (IMPORTANT)
const normalizeAddresses = (data: any): Address[] => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.addresses)) return data.addresses;
  return [];
};

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ SINGLE address fetch
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    fetch("http://127.0.0.1:8000/accounts/address/", {
      headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json", },
    })
      .then(res => res.json())
      .then((data) => {
      console.log("Fetched addresses:", data); // 👈 IMPORTANT
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
        ? data.results
        : [];

      setAddresses(list);

        const defaultAddr = list.find((a: any) => a.is_default);
        if (defaultAddr) setSelectedAddress(defaultAddr);
      })
      .catch(console.error);
  }, []);

  const handleCheckout = async () => {
  if (!selectedAddress) {
    alert("Please select a delivery address.");
    return;
  }

  const token = localStorage.getItem("access");

  if (!token) {
    alert("Session expired. Please login again.");
    window.location.href = "/login";
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://127.0.0.1:8000/api/orders/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cartItems.map(item => ({
        product_id: item.id,   // 🔥 IMPORTANT FIX
        quantity: item.quantity
      })),
      total_price: totalPrice,
      address_id: selectedAddress.id,
      }),

    });

    const data = await res.json();

    if (!res.ok) {
      console.log("ORDER API ERROR 👉", data);

      // If token invalid or expired
      if (res.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("access");
        window.location.href = "/login";
        return;
      }

      // Other errors (address missing, cart issue, etc.)
      alert(data.detail || "Order failed. Please try again.");
      return;
    }

    clearCart();
    alert("🎉 Order placed successfully!");
    window.location.href = "/";

  } catch (error) {
    console.error("Checkout error:", error);
    alert("Server error. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-3xl mb-8">Checkout</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <h2 className="mb-4 font-semibold">Select Delivery Address</h2>

            {addresses.length === 0 ? (
              <p>No saved addresses.</p>
            ) : (
              addresses.map(addr => (
                <div
                  key={addr.id}
                  className={`border p-4 mb-3 rounded cursor-pointer ${
                    selectedAddress?.id === addr.id ? "border-green-600" : ""
                  }`}
                  onClick={() => setSelectedAddress(addr)}
                >
                  <p className="font-medium">
                    {addr.full_name} ({addr.phone})
                  </p>
                  <p className="text-sm">
                    {addr.address_line}, {addr.city}
                  </p>
                  <p className="text-sm">
                    {addr.state} - {addr.pincode}
                  </p>
                </div>
              ))
            )}

            <div className="mt-8">
              <div className="flex justify-between font-semibold mb-4">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <Button onClick={handleCheckout} disabled={loading} className="w-full">
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
