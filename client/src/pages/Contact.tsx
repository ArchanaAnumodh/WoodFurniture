import Layout from "@/components/Layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message is required"),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log(values);
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h1 className="font-serif text-4xl font-medium text-primary mb-6">Get in Touch</h1>
            <p className="text-muted-foreground mb-10 text-lg">
              Have a question about our products or need assistance with a custom order? We're here to help.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="p-3 bg-secondary/50 rounded-full h-fit text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Visit Our Showroom</h3>
                  <p className="text-muted-foreground">123 Chennai<br/>TamilNadu, India</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="p-3 bg-secondary/50 rounded-full h-fit text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Call Us</h3>
                  <p className="text-muted-foreground">+91 xxxxxxxxxx</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-secondary/50 rounded-full h-fit text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email Us</h3>
                  <p className="text-muted-foreground">woodcraftonline@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-secondary/50 rounded-full h-fit text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Hours</h3>
                  <p className="text-muted-foreground">Mon-Fri: 10am - 6pm<br/>Sat: 11am - 5pm<br/>Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border p-8 rounded-2xl shadow-sm">
            <h2 className="font-serif text-2xl mb-6">Send us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message..." 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </Layout>
  );
}
