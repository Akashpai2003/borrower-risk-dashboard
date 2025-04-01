
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, IndianRupee } from "lucide-react";
import { AdditionalInfoStepProps } from "./types";

const AdditionalInfoStep = ({ 
  formData, 
  handleInputChange,
  handleSelectChange,
  handleSwitchChange,
  prevStep,
  isLoading
}: AdditionalInfoStepProps) => {
  return (
    <div className="px-6 pb-6 space-y-6">
      <div>
        <h3 className="text-md font-medium mb-4 text-gray-800 dark:text-gray-100">Asset & Liability Information</h3>
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
        <h3 className="text-md font-medium mb-4 text-gray-800 dark:text-gray-100">Additional Notes</h3>
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
          className="border-[#3ca3d9] text-[#0d3d62] hover:bg-[#e6f7ff] rounded-md"
        >
          Previous
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-[#0d3d62] hover:bg-[#0a2e4a] rounded-md"
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
  );
};

export default AdditionalInfoStep;
