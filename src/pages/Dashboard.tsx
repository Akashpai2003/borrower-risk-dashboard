
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LoanDashboard from "@/components/LoanDashboard";

const Dashboard = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Officer Dashboard</h1>
          <p className="text-muted-foreground">Monitor and analyze loan applications</p>
        </div>
        <Button asChild>
          <Link to="/form">New Application</Link>
        </Button>
      </div>
      
      <LoanDashboard />
    </div>
  );
};

export default Dashboard;
