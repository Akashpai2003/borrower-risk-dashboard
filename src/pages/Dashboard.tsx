
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LoanDashboard from "@/components/LoanDashboard";

const Dashboard = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-fintech-600 to-fintech-800 rounded-lg shadow-lg text-white mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Officer Dashboard</h1>
          <p className="text-fintech-100">Monitor and analyze loan applications</p>
        </div>
        <Button asChild className="bg-white text-fintech-800 hover:bg-fintech-100">
          <Link to="/form">New Application</Link>
        </Button>
      </div>
      
      <LoanDashboard />
    </div>
  );
};

export default Dashboard;
