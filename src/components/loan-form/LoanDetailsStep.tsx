
import React from "react";
import { LoanPurpose } from "@/types/loan";
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

interface LoanDetailsStepProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
  nextStep: (current: string) => void;
  prevStep: (current: string) => void;
}

const LoanDetailsStep = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange, 
  handleSwitchChange,
  nextStep,
  prevStep
}: LoanDetailsStepProps) => {
  return (
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
  );
};

export default LoanDetailsStep;
