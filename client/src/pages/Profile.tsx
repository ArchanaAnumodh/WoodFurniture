import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { User, Package, MapPin, CreditCard, LogOut } from "lucide-react";
import { Link } from "wouter";

export default function Profile() {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://github.com/shadcn.png",
    memberSince: "January 2024",
  };

  const orders = [
    { id: "ORD-1234", date: "Mar 15, 2024", status: "Delivered", total: "$899.00", items: "Solid Oak Dining Table" },
    { id: "ORD-5678", date: "Feb 20, 2024", status: "Processing", total: "$249.00", items: "The Artisan Dining Chair (x1)" },
  ];

  return (
    <Layout>
      <div className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="font-serif text-3xl font-medium text-primary">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground mt-1">Member since {user.memberSince}</p>
            </div>
            <div className="md:ml-auto">
              <Link href="/login">
                <Button variant="outline" className="gap-2">
                  <LogOut className="h-4 w-4" /> Sign Out
                </Button>
              </Link>
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
                <CardDescription>View your past orders and their status.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                      <div className="mb-2 sm:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{order.id}</span>
                          <Badge variant={order.status === "Delivered" ? "secondary" : "default"} className={order.status === "Delivered" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.items}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.total}</p>
                        <Button variant="link" size="sm" className="h-auto p-0 text-primary">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
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
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-secondary/50 p-2 rounded-full text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Home</p>
                    <p className="text-sm text-muted-foreground">123 Main St, Apt 4B<br/>New York, NY 10001</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">Edit</Button>
                </div>
                <Button className="mt-4 w-full" variant="outline">Add New Address</Button>
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
                   <Input defaultValue={user.name} />
                 </div>
                 <div className="grid gap-2">
                   <label className="text-sm font-medium">Email</label>
                   <Input defaultValue={user.email} />
                 </div>
                 <Button className="mt-2">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
