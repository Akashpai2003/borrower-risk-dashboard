
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LoanApplicationForm from "@/components/LoanApplicationForm";

const Form = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Loan Application</h1>
          <p className="text-muted-foreground">Submit a new borrower application for risk assessment</p>
        </div>
        <Button asChild>
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
      
      <LoanApplicationForm />
    </div>
  );
};

export default Form;
