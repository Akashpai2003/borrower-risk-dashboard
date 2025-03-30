
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LoanChatbot from "@/components/LoanChatbot";

const Chatbot = () => {
  return (
    <div className="container mx-auto py-4 space-y-6">
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg text-white mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Assistant</h1>
          <p className="text-purple-100">Ask me anything about loans and risk assessment</p>
        </div>
        <Button asChild className="bg-white text-indigo-800 hover:bg-purple-100">
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
      
      <LoanChatbot />
    </div>
  );
};

export default Chatbot;
