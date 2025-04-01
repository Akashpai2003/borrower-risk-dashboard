
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoanApplication } from "@/types/loan";
import { useLoanContext } from "@/context/LoanContext";
import { Card, CardContent } from "@/components/ui/card";
import { FormStep } from "./loan-form/types";

// Import components
import StepProgressIndicator from "./loan-form/StepProgressIndicator";
import PersonalInfoStep from "./loan-form/PersonalInfoStep";
import FinancialInfoStep from "./loan-form/FinancialInfoStep";
import LoanDetailsStep from "./loan-form/LoanDetailsStep";
import AdditionalInfoStep from "./loan-form/AdditionalInfoStep";

// Helper to generate a random Loan ID
const generateLoanId = () => `LN-${Math.floor(10000000 + Math.random() * 90000000)}`;

const LoanApplicationForm = () => {
  const navigate = useNavigate();
  const { addLoan, isLoading } = useLoanContext();
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  
  // Form state
  const [formData, setFormData] = useState<Omit<LoanApplication, 'id' | 'riskScore' | 'riskLevel' | 'submissionDate'>>({
    loanId: generateLoanId(),
    age: 30,
    income: 60000,
    loanAmount: 200000,
    creditScore: 720,
    monthsEmployed: 24,
    creditLines: 3,
    interestRate: 4.5,
    loanTerm: 360,
    dti: 0.28,
    education: 'Bachelor',
    employmentType: 'Full-time',
    maritalStatus: 'Single',
    hasMortgage: false,
    dependents: 0,
    loanPurpose: 'Home',
    hasCoSigner: false,
    // Additional fields
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    employerName: '',
    jobTitle: '',
    previousBankruptcy: false,
    previousDefaultCount: 0,
    assetValue: 0,
    liabilityValue: 0,
    notes: '',
    landmark: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const nextStep = (current: FormStep) => {
    if (current === 'personal') setCurrentStep('financial');
    else if (current === 'financial') setCurrentStep('loan');
    else if (current === 'loan') setCurrentStep('additional');
  };

  const prevStep = (current: FormStep) => {
    if (current === 'financial') setCurrentStep('personal');
    else if (current === 'loan') setCurrentStep('financial');
    else if (current === 'additional') setCurrentStep('loan');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLoan(formData);
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-gray-200 shadow-md rounded-xl">
        <CardContent className="p-0">
          <div className="p-6 pb-2 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Loan Application</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Enter borrower information to assess loan risk</p>
          </div>
          
          <div className="px-6 py-4">
            <StepProgressIndicator currentStep={currentStep} />
          </div>
          
          {/* Step Components */}
          {currentStep === 'personal' && (
            <PersonalInfoStep 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              nextStep={nextStep}
            />
          )}
          
          {currentStep === 'financial' && (
            <FinancialInfoStep 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {currentStep === 'loan' && (
            <LoanDetailsStep 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {currentStep === 'additional' && (
            <AdditionalInfoStep 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleSwitchChange={handleSwitchChange}
              prevStep={prevStep}
              isLoading={isLoading}
            />
          )}
        </CardContent>
      </Card>
    </form>
  );
};

export default LoanApplicationForm;
