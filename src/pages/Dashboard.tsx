
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LoanDashboard from "@/components/LoanDashboard";
import { useState } from "react";
import LoanChatbot from "@/components/LoanChatbot";
import { MessageCircle, X } from "lucide-react";

const Dashboard = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="container mx-auto py-4 space-y-6">
      <div className="flex justify-between items-center p-6 rounded-lg shadow-lg text-white mb-8 glassmorphism bg-gradient-to-r from-fintech-700 to-fintech-900">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Officer Dashboard</h1>
          <p className="text-fintech-100">Monitor and analyze loan applications</p>
        </div>
        <Button asChild className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/10 rounded-md">
          <Link to="/form">New Application</Link>
        </Button>
      </div>
      
      <LoanDashboard />
      
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

export default Dashboard;
