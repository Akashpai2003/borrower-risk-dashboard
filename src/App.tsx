
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoanProvider } from "@/context/LoanContext";
import { createElement } from "react"; // Add explicit React import

import Index from "./pages/Index";
import Form from "./pages/Form";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import LoanCalculator from "./pages/LoanCalculator";
import Chatbot from "./pages/Chatbot";

// Create QueryClient inside the component to ensure proper React context
const App = () => {
  // Move the queryClient instance inside the component function
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoanProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <div className="pt-4">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/calculator" element={<LoanCalculator />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </LoanProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
