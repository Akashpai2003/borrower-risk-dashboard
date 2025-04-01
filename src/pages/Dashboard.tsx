
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
      <div className="flex justify-between items-center p-6 rounded-xl shadow-lg text-white mb-8 bg-fintech-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Loan Officer Dashboard</h1>
          <p className="text-gray-100">Monitor and analyze loan applications</p>
        </div>
        <Button asChild className="bg-white text-fintech-800 hover:bg-gray-100 rounded-xl">
          <Link to="/form">New Application</Link>
        </Button>
      </div>
      
      <LoanDashboard />
      
      {/* Floating AI Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={toggleChatbot} 
          size="icon" 
          className={`h-12 w-12 rounded-xl shadow-lg ${showChatbot ? 'bg-red-500 hover:bg-red-600' : 'bg-fintech-600 hover:bg-fintech-700'}`}
        >
          {showChatbot ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Chatbot Popup */}
      {showChatbot && (
        <div className="fixed bottom-20 right-6 w-96 h-[500px] z-40 rounded-xl overflow-hidden shadow-2xl border border-gray-300 bg-white dark:bg-gray-800">
          <div className="h-full">
            <LoanChatbot popup={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
