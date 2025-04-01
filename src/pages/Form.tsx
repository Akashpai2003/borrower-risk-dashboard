
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import { useState } from "react";
import LoanChatbot from "@/components/LoanChatbot";
import { MessageCircle, X } from "lucide-react";

const Form = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-fintech-50 to-blue-50 dark:from-fintech-950 dark:to-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)]">
        {/* Left side - Image */}
        <div className="hidden lg:flex bg-fintech-400 relative overflow-hidden rounded-br-xl">
          <img 
            src="/lovable-uploads/eb54b5e0-7a6e-44df-919c-82686307a611.png" 
            alt="Loan application" 
            className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-fintech-800/40 to-fintech-900/60"></div>
        </div>
        
        {/* Right side - Form */}
        <div className="flex flex-col">
          <div className="bg-fintech-900 p-6 text-white glassmorphism">
            <div className="flex justify-between items-center max-w-3xl mx-auto w-full">
              <div>
                <h1 className="text-2xl font-bold">New Loan Application</h1>
                <p className="text-sm text-gray-200">Submit a new borrower application for risk assessment</p>
              </div>
              <Button 
                asChild 
                variant="outline" 
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/10 rounded-md"
              >
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-3xl mx-auto">
              <LoanApplicationForm />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating AI Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={toggleChatbot} 
          size="icon" 
          className={`h-12 w-12 rounded-full shadow-lg ${showChatbot ? 'bg-red-500 hover:bg-red-600' : 'bg-fintech-600 hover:bg-fintech-700'}`}
        >
          {showChatbot ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Chatbot Popup */}
      {showChatbot && (
        <div className="fixed bottom-20 right-6 w-96 h-[500px] z-40 rounded-lg overflow-hidden shadow-2xl border border-fintech-200 glassmorphism">
          <div className="h-full">
            <LoanChatbot popup={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
