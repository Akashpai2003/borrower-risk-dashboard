
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Separator } from "@/components/ui/separator";

// Helper to generate a random Loan ID
const generateLoanId = () => `LN-${Math.floor(10000000 + Math.random() * 90000000)}`;

const LoanApplicationForm = () => {
  const navigate = useNavigate();
  const { addLoan, isLoading } = useLoanContext();
  
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
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLoan(formData);
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto">
        <Card className="col-span-full md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-2xl">Loan Application</CardTitle>
            <CardDescription>Enter borrower information to assess loan risk</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="loanId">Loan ID</Label>
                    <Input
                      id="loanId"
                      name="loanId"
                      value={formData.loanId}
                      onChange={handleInputChange}
                      readOnly
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
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="income">Annual Income ($)</Label>
                    <Input
                      id="income"
                      name="income"
                      type="number"
                      min="0"
                      step="1000"
                      value={formData.income}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Loan Details */}
              <div>
                <h3 className="text-lg font-medium mb-4">Loan Details</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                    <Input
                      id="loanAmount"
                      name="loanAmount"
                      type="number"
                      min="1000"
                      step="1000"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      required
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
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="loanTerm">Loan Term (months)</Label>
                    <Select
                      value={formData.loanTerm.toString()}
                      onValueChange={(value) => handleSelectChange("loanTerm", value)}
                    >
                      <SelectTrigger>
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
                      <SelectTrigger>
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

              <Separator />

              {/* Financial Profile */}
              <div>
                <h3 className="text-lg font-medium mb-4">Financial Profile</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
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
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="education">Education</Label>
                    <Select
                      value={formData.education}
                      onValueChange={(value) => handleSelectChange("education", value as EducationType)}
                    >
                      <SelectTrigger>
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
                  <div className="grid gap-2">
                    <Label htmlFor="employmentType">Employment Type</Label>
                    <Select
                      value={formData.employmentType}
                      onValueChange={(value) => handleSelectChange("employmentType", value as EmploymentType)}
                    >
                      <SelectTrigger>
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
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select
                      value={formData.maritalStatus}
                      onValueChange={(value) => handleSelectChange("maritalStatus", value as MaritalStatus)}
                    >
                      <SelectTrigger>
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
                    />
                  </div>
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Submit Application"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default LoanApplicationForm;
