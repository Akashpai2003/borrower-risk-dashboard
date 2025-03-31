
import React from "react";
import { EducationType, EmploymentType } from "@/types/loan";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronRight, IndianRupee } from "lucide-react";

interface FinancialInfoStepProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
  nextStep: (current: string) => void;
  prevStep: (current: string) => void;
}

const FinancialInfoStep = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange, 
  handleSwitchChange,
  nextStep,
  prevStep
}: FinancialInfoStepProps) => {
  return (
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
  );
};

export default FinancialInfoStep;
