import Layout from "@/components/Layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {

      const csrfRes = await fetch("http://127.0.0.1:8000/accounts/csrf/", {
        credentials: "include",
      });
      const { csrfToken } = await csrfRes.json();
      const response = await fetch("http://127.0.0.1:8000/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Login failed",
          description: data.error || "Invalid credentials",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Welcome back",
        description: data.user.full_name,
      });

      setLocation("/profile");

    } catch {
      toast({
        title: "Server error",
        description: "Unable to connect to server",
        variant: "destructive",
      });
    }
  }

   
   

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-20 bg-secondary/30">
        <div className="w-full max-w-md bg-card border p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-medium text-primary mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to access your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" size="lg">Sign In</Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
