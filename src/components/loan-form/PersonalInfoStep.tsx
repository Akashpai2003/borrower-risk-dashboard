
import React from "react";
import { EducationType, MaritalStatus } from "@/types/loan";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface PersonalInfoStepProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  nextStep: (current: string) => void;
}

const PersonalInfoStep = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange, 
  nextStep 
}: PersonalInfoStepProps) => {
  return (
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
  );
};

export default PersonalInfoStep;
