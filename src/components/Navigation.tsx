
import { Link, useLocation } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { 
  Calculator, 
  Home, 
  FileText, 
  LayoutDashboard 
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b border-fintech-200 bg-white">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 flex items-center space-x-2">
          <Calculator className="h-6 w-6 text-fintech-600" />
          <span className="hidden font-bold text-xl text-fintech-800 sm:inline-block">RiskSense</span>
        </div>
        
        <NavigationMenu className="mx-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/form">
                <div className={cn(
                  navigationMenuTriggerStyle(),
                  "flex items-center gap-2",
                  isActive("/form") && "bg-fintech-100 text-fintech-800"
                )}>
                  <FileText className="h-4 w-4" />
                  <span>New Application</span>
                </div>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/dashboard">
                <div className={cn(
                  navigationMenuTriggerStyle(),
                  "flex items-center gap-2",
                  isActive("/dashboard") && "bg-fintech-100 text-fintech-800"
                )}>
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </div>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/calculator">
                <div className={cn(
                  navigationMenuTriggerStyle(),
                  "flex items-center gap-2",
                  isActive("/calculator") && "bg-fintech-100 text-fintech-800"
                )}>
                  <Calculator className="h-4 w-4" />
                  <span>EMI Calculator</span>
                </div>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navigation;
