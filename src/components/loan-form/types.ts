
import { ChangeEvent } from 'react';
import { LoanApplication } from "@/types/loan";

export type FormStep = 'personal' | 'financial' | 'loan' | 'additional' | 'review';

export interface StepIndicatorProps {
  currentStep: FormStep;
}

export interface FormStepProps {
  formData: Omit<LoanApplication, "id" | "riskScore" | "riskLevel" | "submissionDate">;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
}

export interface ReviewStepProps extends FormStepProps {
  prevStep: (current: FormStep) => void;
  submitApplication: () => void;
}

export interface PersonalInfoStepProps extends FormStepProps {
  nextStep: (current: FormStep) => void;
}

export interface FinancialInfoStepProps extends FormStepProps {
  nextStep: (current: FormStep) => void;
  prevStep: (current: FormStep) => void;
}

export interface LoanDetailsStepProps extends FormStepProps {
  nextStep: (current: FormStep) => void;
  prevStep: (current: FormStep) => void;
}

export interface AdditionalInfoStepProps extends FormStepProps {
  nextStep: (current: FormStep) => void;
  prevStep: (current: FormStep) => void;
}
