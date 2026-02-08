import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ScrollToTop } from "./components/ScrollToTop";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Customization from "./pages/Customization";
import Repair from "./pages/Repair";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Settings from "./pages/Settings";
import Orders from "./pages/Orders";




function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />

        <Route path="/products" component={ProductList} />
        <Route path="/products/:id" component={ProductDetails} />

        <Route path="/customization" component={Customization} />
        <Route path="/repair" component={Repair} />

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        <Route path="/contact" component={Contact} />
        <Route path="/profile" component={Profile} />
        <Route path="/settings" component={Settings} />


        <Route path="/cart" component={Cart} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />


        {/* 404 fallback */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
