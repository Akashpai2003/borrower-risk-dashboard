
import { LoanApplication, RiskLevel } from "@/types/loan";

export const calculateRiskScore = (application: Omit<LoanApplication, 'riskScore' | 'riskLevel' | 'id' | 'submissionDate'>): number => {
  // This is a simplified risk scoring model
  // In a real application, this would be much more complex or call an API
  
  let score = 100; // Start with perfect score
  
  // Credit score impact (maximum impact)
  if (application.creditScore < 580) score -= 30;
  else if (application.creditScore < 670) score -= 20;
  else if (application.creditScore < 740) score -= 10;
  else if (application.creditScore < 800) score -= 5;
  
  // DTI impact
  if (application.dti > 0.43) score -= 25;
  else if (application.dti > 0.36) score -= 15;
  else if (application.dti > 0.28) score -= 5;
  
  // Employment stability
  if (application.monthsEmployed < 6) score -= 15;
  else if (application.monthsEmployed < 12) score -= 10;
  else if (application.monthsEmployed < 24) score -= 5;
  
  // Loan amount to income ratio
  const loanToIncome = application.loanAmount / application.income;
  if (loanToIncome > 5) score -= 20;
  else if (loanToIncome > 3) score -= 10;
  else if (loanToIncome > 2) score -= 5;
  
  // Additional factors with smaller impacts
  if (!application.hasCoSigner) score -= 5;
  if (application.creditLines > 10) score -= 5;
  if (application.dependents > 3) score -= 5;
  
  // Ensure score stays in range 0-100
  return Math.max(0, Math.min(100, score));
};

export const getRiskLevel = (score: number): RiskLevel => {
  if (score >= 80) return 'Low';
  if (score >= 60) return 'Medium';
  if (score >= 40) return 'High';
  return 'Critical';
};
