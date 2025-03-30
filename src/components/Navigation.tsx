
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, FileTextIcon, BarChartIcon, CalculatorIcon, MessageCircleIcon } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'New Application', href: '/form', icon: FileTextIcon },
    { name: 'Dashboard', href: '/dashboard', icon: BarChartIcon },
    { name: 'Loan Calculator', href: '/calculator', icon: CalculatorIcon },
    { name: 'AI Assistant', href: '/chatbot', icon: MessageCircleIcon },
  ];

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">LoanRisk</span>
            </Link>
          </div>
          <div className="flex space-x-1 md:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`inline-flex items-center px-2 md:px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname === item.href
                    ? 'text-white bg-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
