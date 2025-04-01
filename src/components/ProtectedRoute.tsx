
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole: "customer" | "officer";
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user has the required role
    const userRole = localStorage.getItem("userRole");
    
    // If no role is stored, user needs to login
    if (!userRole) {
      setHasAccess(false);
      setIsLoading(false);
      toast({
        title: "Access denied",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user has permission
    if (userRole === allowedRole) {
      setHasAccess(true);
    } else {
      toast({
        title: "Access denied",
        description: `This page is only accessible to ${allowedRole === "officer" ? "Bank Officers" : "Customers"}`,
        variant: "destructive",
      });
      setHasAccess(false);
    }
    
    setIsLoading(false);
  }, [allowedRole, toast]);
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-[calc(100vh-64px)]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-fintech-600"></div>
    </div>;
  }
  
  return hasAccess ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
