import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { User, Package, MapPin, CreditCard, LogOut } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { profile } from "console";
import { access } from "fs";


type ProfileData = {
  full_name: string;
  email: string;
  phone: string;
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


const normalizeAddresses = (data: any) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.addresses)) return data.addresses;
  return [];
};

export default function Profile() {

  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: "",
    email: "",
    phone: "",
  });

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);

  const [addressForm, setAddressForm] = useState<Address>({
    id: 0,
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Fetch profile info

   useEffect(() => {
  const storedUser = localStorage.getItem("access");

  if (!storedUser) {
    window.location.href = "/login";
    return;
  }

  fetch("http://127.0.0.1:8000/accounts/profile/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProfileData(data))
      .catch((err) => console.error("Profile fetch error:", err));
  }, []);


  const token = localStorage.getItem("access");

  // Fetch address

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      setLoading(false);
      return;
    }

  fetch("http://127.0.0.1:8000/accounts/address/", {
  headers: { Authorization: `Bearer ${token}` },
})
  .then((res) => res.json())
      .then((data) => setAddresses(normalizeAddresses(data)))
      .catch((err) => console.error("Address fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setProfileData({ ...profileData, [e.target.name]: e.target.value });
};

const saveAddress = async () => {
  const token = localStorage.getItem("access");
  if (!token) return alert("Login required");

  // 🔐 Get CSRF token (same way login does)
  const csrfRes = await fetch("http://127.0.0.1:8000/accounts/csrf/", {
    credentials: "include",
  });
  const { csrfToken } = await csrfRes.json();

  const method = addressForm.id ? "PUT" : "POST";
  const url = addressForm.id
    ? `http://127.0.0.1:8000/accounts/address/${addressForm.id}/update/`
    : "http://127.0.0.1:8000/accounts/address/";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(addressForm),
  });

  if (res.ok) {
    alert("Address saved!");
    window.location.reload();
  } else {
    const err = await res.json();
    console.error("Save error:", err);
    alert("Failed to save address");
  }
};


const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
};


const editAddress = (addr: any) => {
  setAddressForm(addr); // fills form with selected address
};

const deleteAddress = async (id: number) => {
  const token = localStorage.getItem("access");

  const res = await fetch(`http://127.0.0.1:8000/accounts/address/${id}/delete/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    setAddresses(addresses.filter((a:Address) => a.id !== id));
  } else {
    alert("Failed to delete address");
  }
};


const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setProfileData({ ...profileData, [e.target.name]: e.target.value });
};

const saveProfile = async () => {
  const token = localStorage.getItem("access");

  const res = await fetch("http://127.0.0.1:8000/accounts/profile/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (res.ok) alert("Profile updated!");
  else alert("Failed to update profile");
};

const setDefaultAddress = async (id: number) => {
  const token = localStorage.getItem("access");

  await fetch(`http://127.0.0.1:8000/accounts/address/${id}/default/`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });

  window.location.reload();
};

  useEffect(() => {
    const token = localStorage.getItem("access");
    fetch("http://127.0.0.1:8000/api/orders/my_orders/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);


  const handleReorder = async (orderId: number) => {
  const token = localStorage.getItem("access");

  await fetch(`http://127.0.0.1:8000/api/orders/${orderId}/reorder/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  alert("Order placed again!");
};

  const handleCancel = async (orderId: number) => {
  const token = localStorage.getItem("access");

  await fetch(`http://127.0.0.1:8000/api/orders/${orderId}/cancel/`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });

  alert("Order cancelled");
  window.location.reload();
};

  return (
    <Layout>
      <div className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarFallback>
                {profileData.full_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left">
              <h1 className="font-serif text-3xl font-medium text-primary">{profileData.full_name}</h1>
              <p className="text-muted-foreground">{profileData.email}</p>
              <p className="text-sm text-muted-foreground mt-1">
                    Welcome to your profile
              </p>

            </div>
            <div className="md:ml-auto">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>
            </div>

          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                  <CardDescription>Your recent orders will appear here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                      You have no orders yet.
                </p>
              </CardContent>
           </Card>
          </TabsContent>

          
          <TabsContent value="addresses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Addresses</CardTitle>
                <CardDescription>Manage your shipping and billing addresses.</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Saved Addresses</h3>

                  {addresses.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No addresses saved</p>
                  ) : (
                    addresses.map((addr: Address) => (
                      <div key={addr.id} className="border p-4 mb-3 rounded-lg flex justify-between items-start">
                        <div>
                          <p className="font-medium">{addr.full_name} ({addr.phone})</p>
                          <p className="text-sm text-muted-foreground">
                            {addr.address_line}<br/>
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => editAddress(addr)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteAddress(addr.id)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  )}


                  <div className="mt-6 grid gap-4">
                    <h3 className="font-medium text-lg">Add / Edit Address</h3>

                    <Input name="full_name" value={addressForm.full_name} onChange={handleAddressChange} />
                    <Input name="phone" value={addressForm.phone} onChange={handleAddressChange} />
                    <Input name="address_line" value={addressForm.address_line} onChange={handleAddressChange} />
                    <Input name="city" value={addressForm.city} onChange={handleAddressChange} />
                    <Input name="state" value={addressForm.state} onChange={handleAddressChange} />
                    <Input name="pincode" value={addressForm.pincode} onChange={handleAddressChange} />


                    <Button onClick={saveAddress} className="mt-2">
                      Save Address
                    </Button>
                  </div>

              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    name="full_name"
                    value={profileData.full_name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                <Button className="mt-2" onClick={saveProfile}>
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
            
          {orders.length === 0 ? (
        <p className="text-muted-foreground text-sm">No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="border p-4 rounded-lg mb-4">
            <div className="flex justify-between mb-2">
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <span className="text-sm font-medium">{order.status}</span>
            </div>

            {order.items.map((item: any, idx: number) => (
              <p key={idx} className="text-sm">
                {item.name} × {item.quantity} — ₹{item.price}
              </p>
            ))}

            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={() => handleReorder(order.id)}>Reorder</Button>
              {order.status !== "Cancelled" && (
                <Button size="sm" variant="destructive" onClick={() => handleCancel(order.id)}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
        ))
      )}

        </Tabs>
      </div>
    </Layout>
  );
}
