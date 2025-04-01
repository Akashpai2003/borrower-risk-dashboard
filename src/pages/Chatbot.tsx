
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LoanChatbot from "@/components/LoanChatbot";

const Chatbot = () => {
  return (
    <div className="container mx-auto py-4 space-y-6">
      <div className="flex justify-between items-center p-6 rounded-lg shadow-lg text-white mb-8 glassmorphism bg-gradient-to-r from-fintech-700 to-fintech-900">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Assistant</h1>
          <p className="text-fintech-100">Ask me anything about loans and risk assessment</p>
        </div>
        <Button asChild className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/10 rounded-md">
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <LoanChatbot />
      </div>
    </div>
  );
};

export default Chatbot;
