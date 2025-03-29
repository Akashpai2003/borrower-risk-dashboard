
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the form page after a short delay
    const timer = setTimeout(() => {
      navigate("/form");
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-purple-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">RiskSense</h1>
        <p className="text-xl text-gray-700 mb-6">Advanced Loan Risk Assessment Platform</p>
        <div className="mt-6 flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
          <p className="mt-4 text-purple-700">Initializing application...</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
