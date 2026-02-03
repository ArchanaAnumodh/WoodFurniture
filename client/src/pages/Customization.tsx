import Layout from "@/components/Layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const customizationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  furnitureType: z.string().min(1, "Please select a furniture type"),
  woodType: z.string().min(1, "Please select a wood type"),
  dimensions: z.string().min(1, "Rough dimensions are required"),
  details: z.string().min(10, "Please provide more details about your vision"),
});

export default function Customization() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof customizationSchema>>({
    resolver: zodResolver(customizationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      furnitureType: "",
      woodType: "",
      dimensions: "",
      details: "",
    },
  });

  function onSubmit(values: z.infer<typeof customizationSchema>) {
    console.log(values);
    toast({
      title: "Request Sent",
      description: "We've received your customization request. An artisan will contact you shortly.",
    });
    form.reset();
  }

  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-medium mb-6">Custom Design Service</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Collaborate with our artisans to create a unique piece that perfectly fits your space and style.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border p-8 md:p-12 rounded-2xl shadow-sm">
            <h2 className="font-serif text-3xl text-primary mb-8 text-center">Start Your Project</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <FormField
                    control={form.control}
                    name="furnitureType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Furniture Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="chair">Chair</SelectItem>
                            <SelectItem value="table">Dining Table</SelectItem>
                            <SelectItem value="coffee-table">Coffee Table</SelectItem>
                            <SelectItem value="bookshelf">Bookshelf</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="woodType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Wood</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select wood" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="oak">White Oak</SelectItem>
                            <SelectItem value="walnut">American Walnut</SelectItem>
                            <SelectItem value="ash">Ash</SelectItem>
                            <SelectItem value="cherry">Cherry</SelectItem>
                            <SelectItem value="unsure">I'm not sure</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="dimensions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approximate Dimensions</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 80 inches long, 40 inches wide" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your vision, specific features, style preferences, etc." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full">Submit Request</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
