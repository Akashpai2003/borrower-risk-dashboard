
import { EducationType, EmploymentType, LoanApplication, LoanPurpose, MaritalStatus } from "@/types/loan";
import { ReactNode } from "react";

export type FormStep = 'personal' | 'financial' | 'loan' | 'additional';

export interface FormProps {
  children?: ReactNode;
  isLoading?: boolean;
}

export interface StepProps {
  formData: Omit<LoanApplication, 'id' | 'riskScore' | 'riskLevel' | 'submissionDate'>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
  nextStep?: (current: FormStep) => void;
  prevStep?: (current: FormStep) => void;
  isLoading?: boolean;
}

export interface PersonalInfoStepProps {
  formData: Omit<LoanApplication, 'id' | 'riskScore' | 'riskLevel' | 'submissionDate'>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  nextStep: (current: FormStep) => void;
}

export interface FinancialInfoStepProps {
  formData: Omit<LoanApplication, 'id' | 'riskScore' | 'riskLevel' | 'submissionDate'>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
  nextStep: (current: FormStep) => void;
  prevStep: (current: FormStep) => void;
}

export interface LoanDetailsStepProps {
  formData: Omit<LoanApplication, 'id' | 'riskScore' | 'riskLevel' | 'submissionDate'>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
  nextStep: (current: FormStep) => void;
  prevStep: (current: FormStep) => void;
}

export interface AdditionalInfoStepProps {
  formData: Omit<LoanApplication, 'id' | 'riskScore' | 'riskLevel' | 'submissionDate'>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  prevStep: (current: FormStep) => void;
  isLoading: boolean;
}
