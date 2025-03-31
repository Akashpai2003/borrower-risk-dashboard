
import React from "react";
import { FormStep } from "./types";

interface StepProgressIndicatorProps {
  currentStep: FormStep;
}

const StepProgressIndicator = ({ currentStep }: StepProgressIndicatorProps) => {
  const steps = [
    { id: "personal", label: "Personal", number: 1 },
    { id: "financial", label: "Financial", number: 2 },
    { id: "loan", label: "Loan", number: 3 },
    { id: "additional", label: "Additional", number: 4 },
  ];

  const getProgressWidth = () => {
    if (currentStep === "personal") return "12.5%";
    if (currentStep === "financial") return "37.5%";
    if (currentStep === "loan") return "62.5%";
    return "87.5%";
  };

  return (
    <div className="flex justify-between mb-8 relative">
      <div className="w-full flex justify-between items-center">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`flex-1 text-center ${
              currentStep === step.id ? "text-fintech-900 font-medium" : "text-gray-500"
            }`}
          >
            <div 
              className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                currentStep === step.id ? "bg-fintech-100 text-fintech-900" : "bg-gray-100 text-gray-500"
              }`}
            >
              {step.number}
            </div>
            <div className="mt-2">{step.label}</div>
          </div>
        ))}
        
        {/* Progress bar */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full">
          <div 
            className="h-full bg-fintech-400 transition-all duration-300 rounded-full"
            style={{ width: getProgressWidth() }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StepProgressIndicator;
