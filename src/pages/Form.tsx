
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LoanApplicationForm from "@/components/LoanApplicationForm";

const Form = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-fintech-600 to-fintech-800 rounded-lg shadow-lg text-white mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Loan Application</h1>
          <p className="text-fintech-100">Submit a new borrower application for risk assessment</p>
        </div>
        <Button asChild className="bg-white text-fintech-800 hover:bg-fintech-100">
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
      
      <LoanApplicationForm />
    </div>
  );
};

export default Form;
