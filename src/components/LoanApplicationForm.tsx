
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  EducationType, 
  EmploymentType, 
  LoanApplication, 
  LoanPurpose, 
  MaritalStatus 
} from "@/types/loan";
import { useLoanContext } from "@/context/LoanContext";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { IndianRupee } from "lucide-react";

// Helper to generate a random Loan ID
const generateLoanId = () => `LN-${Math.floor(10000000 + Math.random() * 90000000)}`;

const LoanApplicationForm = () => {
  const navigate = useNavigate();
  const { addLoan, isLoading } = useLoanContext();
  const [currentStep, setCurrentStep] = useState('personal');
  
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

  const nextStep = (current: string) => {
    if (current === 'personal') setCurrentStep('financial');
    else if (current === 'financial') setCurrentStep('loan');
    else if (current === 'loan') setCurrentStep('additional');
  };

  const prevStep = (current: string) => {
    if (current === 'financial') setCurrentStep('personal');
    else if (current === 'loan') setCurrentStep('financial');
    else if (current === 'additional') setCurrentStep('loan');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLoan(formData);
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <div className="p-6 pb-2">
            <h2 className="text-xl font-semibold text-[#0d3d62]">Loan Application</h2>
            <p className="text-sm text-gray-500">Enter borrower information to assess loan risk</p>
          </div>
          
          <div className="px-6 py-4">
            <div className="flex justify-between mb-8 relative">
              <div className="w-full flex justify-between items-center">
                <div className={`flex-1 text-center ${currentStep === 'personal' ? 'text-[#0d3d62] font-medium' : 'text-gray-500'}`}>
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${currentStep === 'personal' ? 'bg-[#e6f7ff] text-[#0d3d62]' : 'bg-gray-100 text-gray-500'}`}>
                    1
                  </div>
                  <div className="mt-2">Personal</div>
                </div>
                <div className={`flex-1 text-center ${currentStep === 'financial' ? 'text-[#0d3d62] font-medium' : 'text-gray-500'}`}>
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${currentStep === 'financial' ? 'bg-[#e6f7ff] text-[#0d3d62]' : 'bg-gray-100 text-gray-500'}`}>
                    2
                  </div>
                  <div className="mt-2">Financial</div>
                </div>
                <div className={`flex-1 text-center ${currentStep === 'loan' ? 'text-[#0d3d62] font-medium' : 'text-gray-500'}`}>
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${currentStep === 'loan' ? 'bg-[#e6f7ff] text-[#0d3d62]' : 'bg-gray-100 text-gray-500'}`}>
                    3
                  </div>
                  <div className="mt-2">Loan</div>
                </div>
                <div className={`flex-1 text-center ${currentStep === 'additional' ? 'text-[#0d3d62] font-medium' : 'text-gray-500'}`}>
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${currentStep === 'additional' ? 'bg-[#e6f7ff] text-[#0d3d62]' : 'bg-gray-100 text-gray-500'}`}>
                    4
                  </div>
                  <div className="mt-2">Additional</div>
                </div>
                
                {/* Progress bar */}
                <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-10">
                  <div 
                    className="h-full bg-[#3ca3d9] transition-all duration-300"
                    style={{ 
                      width: currentStep === 'personal' ? '12.5%' : 
                             currentStep === 'financial' ? '37.5%' : 
                             currentStep === 'loan' ? '62.5%' : '87.5%' 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Personal Information Tab */}
          {currentStep === 'personal' && (
            <div className="px-6 pb-6 space-y-6">
              <div>
                <h3 className="text-md font-medium mb-4 text-[#0d3d62]">Borrower Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-4 text-[#0d3d62]">Address</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="landmark">Landmark</Label>
                      <Input
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-4 text-[#0d3d62]">Personal Status</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select
                      value={formData.maritalStatus}
                      onValueChange={(value) => handleSelectChange("maritalStatus", value as MaritalStatus)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                        <SelectItem value="Widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dependents">Number of Dependents</Label>
                    <Input
                      id="dependents"
                      name="dependents"
                      type="number"
                      min="0"
                      max="20"
                      value={formData.dependents}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      min="18"
                      max="100"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  type="button" 
                  onClick={() => nextStep('personal')}
                  className="bg-[#0d3d62] hover:bg-[#0a2e4a]"
                >
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Financial Information Tab */}
          {currentStep === 'financial' && (
            <div className="px-6 pb-6 space-y-6">
              <div>
                <h3 className="text-md font-medium mb-4 text-[#0d3d62]">Income & Employment</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="income">Annual Income (<IndianRupee className="inline h-3 w-3" />)</Label>
                    <Input
                      id="income"
                      name="income"
                      type="number"
                      min="0"
                      step="1000"
                      value={formData.income}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="employmentType">Employment Type</Label>
                    <Select
                      value={formData.employmentType}
                      onValueChange={(value) => handleSelectChange("employmentType", value as EmploymentType)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]">
                        <SelectValue placeholder="Select employment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Self-employed">Self-employed</SelectItem>
                        <SelectItem value="Unemployed">Unemployed</SelectItem>
                        <SelectItem value="Retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="employerName">Employer Name</Label>
                    <Input
                      id="employerName"
                      name="employerName"
                      value={formData.employerName}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="monthsEmployed">Months Employed</Label>
                    <Input
                      id="monthsEmployed"
                      name="monthsEmployed"
                      type="number"
                      min="0"
                      value={formData.monthsEmployed}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="education">Education</Label>
                    <Select
                      value={formData.education}
                      onValueChange={(value) => handleSelectChange("education", value as EducationType)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]">
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High School">High School</SelectItem>
                        <SelectItem value="Bachelor">Bachelor</SelectItem>
                        <SelectItem value="Master">Master</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-4 text-[#0d3d62]">Credit Profile</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="creditScore">Credit Score</Label>
                    <Input
                      id="creditScore"
                      name="creditScore"
                      type="number"
                      min="300"
                      max="850"
                      value={formData.creditScore}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="creditLines">Number of Credit Lines</Label>
                    <Input
                      id="creditLines"
                      name="creditLines"
                      type="number"
                      min="0"
                      value={formData.creditLines}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dti">Debt-to-Income Ratio</Label>
                    <Input
                      id="dti"
                      name="dti"
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                      value={formData.dti}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="previousBankruptcy">Previous Bankruptcy</Label>
                      <Switch
                        id="previousBankruptcy"
                        checked={formData.previousBankruptcy}
                        onCheckedChange={(checked) => handleSwitchChange("previousBankruptcy", checked)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="previousDefaultCount">Previous Default Count</Label>
                    <Input
                      id="previousDefaultCount"
                      name="previousDefaultCount"
                      type="number"
                      min="0"
                      value={formData.previousDefaultCount}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => prevStep('financial')}
                  className="border-[#3ca3d9] text-[#0d3d62] hover:bg-[#e6f7ff]"
                >
                  Previous
                </Button>
                <Button 
                  type="button" 
                  onClick={() => nextStep('financial')}
                  className="bg-[#0d3d62] hover:bg-[#0a2e4a]"
                >
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Loan Details Tab */}
          {currentStep === 'loan' && (
            <div className="px-6 pb-6 space-y-6">
              <div>
                <h3 className="text-md font-medium mb-4 text-[#0d3d62]">Loan Request</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="loanId">Loan ID</Label>
                    <Input
                      id="loanId"
                      name="loanId"
                      value={formData.loanId}
                      onChange={handleInputChange}
                      readOnly
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="loanAmount">Loan Amount (<IndianRupee className="inline h-3 w-3" />)</Label>
                    <Input
                      id="loanAmount"
                      name="loanAmount"
                      type="number"
                      min="1000"
                      step="1000"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      name="interestRate"
                      type="number"
                      min="0"
                      max="30"
                      step="0.1"
                      value={formData.interestRate}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="loanTerm">Loan Term (months)</Label>
                    <Select
                      value={formData.loanTerm.toString()}
                      onValueChange={(value) => handleSelectChange("loanTerm", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]">
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                        <SelectItem value="48">48 months</SelectItem>
                        <SelectItem value="60">60 months</SelectItem>
                        <SelectItem value="120">120 months</SelectItem>
                        <SelectItem value="180">180 months</SelectItem>
                        <SelectItem value="240">240 months</SelectItem>
                        <SelectItem value="360">360 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="loanPurpose">Loan Purpose</Label>
                    <Select
                      value={formData.loanPurpose}
                      onValueChange={(value) => handleSelectChange("loanPurpose", value as LoanPurpose)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]">
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Home">Home</SelectItem>
                        <SelectItem value="Auto">Auto</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Debt Consolidation">Debt Consolidation</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-4 text-[#0d3d62]">Additional Loan Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="hasMortgage">Has Mortgage</Label>
                      <Switch
                        id="hasMortgage"
                        checked={formData.hasMortgage}
                        onCheckedChange={(checked) => handleSwitchChange("hasMortgage", checked)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="hasCoSigner">Has Co-Signer</Label>
                      <Switch
                        id="hasCoSigner"
                        checked={formData.hasCoSigner}
                        onCheckedChange={(checked) => handleSwitchChange("hasCoSigner", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => prevStep('loan')}
                  className="border-[#3ca3d9] text-[#0d3d62] hover:bg-[#e6f7ff]"
                >
                  Previous
                </Button>
                <Button 
                  type="button" 
                  onClick={() => nextStep('loan')}
                  className="bg-[#0d3d62] hover:bg-[#0a2e4a]"
                >
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Additional Information Tab */}
          {currentStep === 'additional' && (
            <div className="px-6 pb-6 space-y-6">
              <div>
                <h3 className="text-md font-medium mb-4 text-[#0d3d62]">Asset & Liability Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="assetValue">Total Asset Value (<IndianRupee className="inline h-3 w-3" />)</Label>
                    <Input
                      id="assetValue"
                      name="assetValue"
                      type="number"
                      min="0"
                      value={formData.assetValue}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="liabilityValue">Total Liability Value (<IndianRupee className="inline h-3 w-3" />)</Label>
                    <Input
                      id="liabilityValue"
                      name="liabilityValue"
                      type="number"
                      min="0"
                      value={formData.liabilityValue}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-4 text-[#0d3d62]">Additional Notes</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Enter any additional information about the borrower or the loan application"
                      className="min-h-32 border-gray-300 focus:border-[#3ca3d9] focus-visible:ring-[#3ca3d9]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => prevStep('additional')}
                  className="border-[#3ca3d9] text-[#0d3d62] hover:bg-[#e6f7ff]"
                >
                  Previous
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-[#0d3d62] hover:bg-[#0a2e4a]"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Submit Application <CheckCircle2 className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  );
};

export default LoanApplicationForm;
