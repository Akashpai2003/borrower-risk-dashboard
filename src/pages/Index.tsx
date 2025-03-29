
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the form page
    navigate("/form");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-fintech-200 to-fintech-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-4 text-fintech-800">Loading...</h1>
        <p className="text-xl text-fintech-600">Please wait while we prepare the application form.</p>
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fintech-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
