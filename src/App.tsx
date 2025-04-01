
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoanProvider } from "@/context/LoanContext";
import { createElement, useEffect } from "react"; // Add explicit React import

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
  
  // Add theme detection
  useEffect(() => {
    // Check for dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoanProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-fintech-50 to-blue-50 dark:from-fintech-950 dark:to-gray-900">
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
