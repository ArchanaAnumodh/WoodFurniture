import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  items: OrderItem[];
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/orders/my_orders/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchOrders();
}, []);




  const cancelOrder = async (id: number) => {
    const token = localStorage.getItem("access");

    await fetch(`http://127.0.0.1:8000/api/orders/${id}/cancel/`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  };

  const reorder = async (id: number) => {
    const token = localStorage.getItem("access");

    await fetch(`http://127.0.0.1:8000/api/orders/${id}/reorder/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Items added to cart");
  };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-semibold mb-6">Order History</h1>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map(order => (
            <Card key={order.id} className="mb-6">
              <CardHeader>
                <CardTitle>Order #{order.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.created_at).toLocaleString()}</p>
                <p>Total: ₹{order.total_price}</p>

                <div className="mt-3">
                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name} × {item.quantity}
                    </p>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" onClick={() => reorder(order.id)}>
                    Reorder
                  </Button>
                  {order.status === "Placed" && (
                    <Button variant="destructive" onClick={() => cancelOrder(order.id)}>
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Layout>
  );
}
