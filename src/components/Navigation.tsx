
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, FileTextIcon, LayoutDashboard, CalculatorIcon, MoonIcon, SunIcon, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useToast } from "@/components/ui/use-toast";

const Navigation = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem('userRole');
    setUserRole(role);
    
    // Check if user has a dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [location.pathname]);
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const officerNavigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'New Application', href: '/form', icon: FileTextIcon },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Loan Calculator', href: '/calculator', icon: CalculatorIcon },
  ];
  
  const customerNavigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Apply for Loan', href: '/form', icon: FileTextIcon },
    { name: 'Loan Calculator', href: '/calculator', icon: CalculatorIcon },
  ];
  
  // Determine which navigation to show based on user role
  const navigation = userRole === 'officer' ? officerNavigation : customerNavigation;

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-fintech-600 dark:text-fintech-400">LoanRisk</span>
            </Link>
          </div>
          <div className="flex space-x-1 md:space-x-4 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`inline-flex items-center px-2 md:px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname === item.href
                    ? 'text-white bg-fintech-600 dark:bg-fintech-800'
                    : 'text-gray-700 dark:text-gray-300 hover:text-fintech-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            ))}
            
            {userRole && (
              <Button 
                onClick={handleLogout} 
                variant="ghost" 
                size="icon"
                className="rounded-md ml-2 w-8 h-8"
                asChild
              >
                <Link to="/login">
                  <LogOut className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </Link>
              </Button>
            )}
            
            <Button 
              onClick={toggleDarkMode} 
              variant="ghost" 
              size="icon"
              className="rounded-md ml-2 w-8 h-8"
            >
              {darkMode ? (
                <SunIcon className="h-4 w-4 text-yellow-400" />
              ) : (
                <MoonIcon className="h-4 w-4 text-fintech-800" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
