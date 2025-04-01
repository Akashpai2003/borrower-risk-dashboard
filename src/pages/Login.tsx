
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Wallet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<"customer" | "officer" | null>(null);

  const handleLogin = () => {
    if (!selectedRole) {
      toast({
        title: "Please select a role",
        description: "You must select a role to continue",
        variant: "destructive",
      });
      return;
    }

    if (selectedRole === "customer") {
      navigate("/form");
    } else {
      navigate("/dashboard");
    }
    
    // Store the role in localStorage for future reference
    localStorage.setItem("userRole", selectedRole);
    
    toast({
      title: "Login successful",
      description: `You are now logged in as a ${selectedRole === "customer" ? "Customer" : "Bank Officer"}`,
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-fintech-50 to-blue-50 dark:from-fintech-950 dark:to-gray-900 p-4">
      <Card className="w-full max-w-md border-gray-200 shadow-lg">
        <CardHeader className="bg-fintech-800 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">LoanRisk Login</CardTitle>
          <CardDescription className="text-gray-200 text-center">Select your role to continue</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className={`h-28 flex flex-col items-center justify-center gap-2 rounded-lg transition-all ${
                selectedRole === "customer" 
                  ? "border-2 border-fintech-600 bg-fintech-50 dark:bg-fintech-900/30" 
                  : "border border-gray-200"
              }`}
              onClick={() => setSelectedRole("customer")}
            >
              <User size={32} className={selectedRole === "customer" ? "text-fintech-600" : "text-gray-500"} />
              <span className={selectedRole === "customer" ? "font-medium text-fintech-800" : "text-gray-700"}>
                Customer
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className={`h-28 flex flex-col items-center justify-center gap-2 rounded-lg transition-all ${
                selectedRole === "officer" 
                  ? "border-2 border-fintech-600 bg-fintech-50 dark:bg-fintech-900/30" 
                  : "border border-gray-200"
              }`}
              onClick={() => setSelectedRole("officer")}
            >
              <Wallet size={32} className={selectedRole === "officer" ? "text-fintech-600" : "text-gray-500"} />
              <span className={selectedRole === "officer" ? "font-medium text-fintech-800" : "text-gray-700"}>
                Bank Officer
              </span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center p-6 pt-0">
          <Button 
            onClick={handleLogin} 
            className="w-full bg-fintech-600 hover:bg-fintech-700 text-white rounded-lg"
            disabled={!selectedRole}
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
