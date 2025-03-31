
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LoanApplicationForm from "@/components/LoanApplicationForm";

const Form = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)]">
        {/* Left side - Image */}
        <div className="hidden lg:flex bg-[#3ca3d9] relative">
          <img 
            src="/lovable-uploads/eb54b5e0-7a6e-44df-919c-82686307a611.png" 
            alt="Loan application" 
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Right side - Form */}
        <div className="flex flex-col">
          <div className="bg-[#0d3d62] p-6 text-white">
            <div className="flex justify-between items-center max-w-3xl mx-auto w-full">
              <div>
                <h1 className="text-2xl font-bold">New Loan Application</h1>
                <p className="text-sm text-gray-200">Submit a new borrower application for risk assessment</p>
              </div>
              <Button 
                asChild 
                variant="outline" 
                className="bg-white text-[#0d3d62] hover:bg-gray-100 border-none"
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
    </div>
  );
};

export default Form;
