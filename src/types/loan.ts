
export type EducationType = 'High School' | 'Bachelor' | 'Master' | 'PhD' | 'Other';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Self-employed' | 'Unemployed' | 'Retired';
export type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Widowed';
export type LoanPurpose = 'Home' | 'Auto' | 'Education' | 'Personal' | 'Business' | 'Debt Consolidation' | 'Other';
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface LoanApplication {
  id: string;
  loanId: string;
  age: number;
  income: number;
  loanAmount: number;
  creditScore: number;
  monthsEmployed: number;
  creditLines: number;
  interestRate: number;
  loanTerm: number;
  dti: number;
  education: EducationType;
  employmentType: EmploymentType;
  maritalStatus: MaritalStatus;
  hasMortgage: boolean;
  dependents: number;
  loanPurpose: LoanPurpose;
  hasCoSigner: boolean;
  riskScore: number;
  riskLevel: RiskLevel;
  submissionDate: Date;
  
  // Additional fields
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  employerName?: string;
  jobTitle?: string;
  previousBankruptcy?: boolean;
  previousDefaultCount?: number;
  assetValue?: number;
  liabilityValue?: number;
  notes?: string;
  landmark?: string;
}
