import Layout from "@/components/Layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Hammer, Wrench, Clock } from "lucide-react";

const repairSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  itemDescription: z.string().min(10, "Please describe the item"),
  damageDescription: z.string().min(10, "Please describe the damage"),
});

export default function Repair() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof repairSchema>>({
    resolver: zodResolver(repairSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      itemDescription: "",
      damageDescription: "",
    },
  });

  function onSubmit(values: z.infer<typeof repairSchema>) {
    console.log(values);
    toast({
      title: "Repair Inquiry Sent",
      description: "We'll review your request and get back to you with an estimate.",
    });
    form.reset();
  }

  return (
    <Layout>
      <div className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-primary mb-6">Repair & Restoration</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Give your cherished furniture a second life. Our restoration experts specialize in structural repairs and refinishing.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div>
            <h2 className="font-serif text-3xl text-primary mb-8">Our Services</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-full h-fit text-primary">
                  <Hammer className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Structural Repair</h3>
                  <p className="text-muted-foreground">Fixing wobbly legs, broken joinery, and frame damage to restore stability and safety.</p>
                </div>
              </div>
              <div className="flex gap-4">
                 <div className="p-3 bg-primary/10 rounded-full h-fit text-primary">
                  <Wrench className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Refinishing</h3>
                  <p className="text-muted-foreground">Stripping, sanding, and re-staining to remove scratches, water marks, and sun damage.</p>
                </div>
              </div>
               <div className="flex gap-4">
                 <div className="p-3 bg-primary/10 rounded-full h-fit text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Preservation</h3>
                  <p className="text-muted-foreground">Cleaning and conditioning services to maintain the beauty of your wood furniture for years to come.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border p-8 rounded-2xl shadow-sm">
            <h3 className="font-serif text-2xl mb-6">Request an Estimate</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="itemDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Description</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Vintage Oak Dining Chair" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="damageDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description of Damage/Needs</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the issue in detail..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">Submit Request</Button>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </Layout>
  );
}
