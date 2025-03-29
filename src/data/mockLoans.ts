
import { LoanApplication } from "@/types/loan";
import { calculateRiskScore, getRiskLevel } from "@/utils/riskUtils";

// Generate a random loan ID with format LN-XXXXXXXX
const generateLoanId = () => `LN-${Math.floor(10000000 + Math.random() * 90000000)}`;

// Function to create a mock loan application
const createMockLoan = (id: string): LoanApplication => {
  // Generate random data within reasonable ranges
  const age = Math.floor(21 + Math.random() * 50);
  const income = Math.floor(30000 + Math.random() * 150000);
  const loanAmount = Math.floor(5000 + Math.random() * 500000);
  const creditScore = Math.floor(550 + Math.random() * 300);
  const monthsEmployed = Math.floor(3 + Math.random() * 120);
  const creditLines = Math.floor(1 + Math.random() * 12);
  const interestRate = 3 + Math.random() * 15;
  const loanTerm = [12, 24, 36, 48, 60, 120, 180, 240, 360][Math.floor(Math.random() * 9)];
  const dti = 0.1 + Math.random() * 0.5;
  const education = ['High School', 'Bachelor', 'Master', 'PhD', 'Other'][Math.floor(Math.random() * 5)] as any;
  const employmentType = ['Full-time', 'Part-time', 'Self-employed', 'Unemployed', 'Retired'][Math.floor(Math.random() * 5)] as any;
  const maritalStatus = ['Single', 'Married', 'Divorced', 'Widowed'][Math.floor(Math.random() * 4)] as any;
  const hasMortgage = Math.random() > 0.5;
  const dependents = Math.floor(Math.random() * 5);
  const loanPurpose = ['Home', 'Auto', 'Education', 'Personal', 'Business', 'Debt Consolidation', 'Other'][Math.floor(Math.random() * 7)] as any;
  const hasCoSigner = Math.random() > 0.7;
  
  // Calculate risk score and level
  const application = {
    loanId: generateLoanId(),
    age,
    income,
    loanAmount,
    creditScore,
    monthsEmployed,
    creditLines,
    interestRate,
    loanTerm,
    dti,
    education,
    employmentType,
    maritalStatus,
    hasMortgage,
    dependents,
    loanPurpose,
    hasCoSigner
  };
  
  const riskScore = calculateRiskScore(application);
  const riskLevel = getRiskLevel(riskScore);
  
  return {
    id,
    ...application,
    riskScore,
    riskLevel,
    submissionDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
  };
};

// Generate 20 mock loan applications
export const mockLoans: LoanApplication[] = Array.from({ length: 20 }, (_, i) => 
  createMockLoan(`loan-${i + 1}`)
);
