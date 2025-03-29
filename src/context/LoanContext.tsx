
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LoanApplication } from '@/types/loan';
import { mockLoans } from '@/data/mockLoans';
import { calculateRiskScore, getRiskLevel } from '@/utils/riskUtils';
import { useToast } from '@/components/ui/use-toast';

interface LoanContextType {
  loans: LoanApplication[];
  addLoan: (loan: Omit<LoanApplication, 'id' | 'riskScore' | 'riskLevel' | 'submissionDate'>) => void;
  isLoading: boolean;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const useLoanContext = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error('useLoanContext must be used within a LoanProvider');
  }
  return context;
};

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState<LoanApplication[]>(mockLoans);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addLoan = (loanData: Omit<LoanApplication, 'id' | 'riskScore' | 'riskLevel' | 'submissionDate'>) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const riskScore = calculateRiskScore(loanData);
        const riskLevel = getRiskLevel(riskScore);
        
        const newLoan: LoanApplication = {
          ...loanData,
          id: `loan-${Date.now()}`,
          riskScore,
          riskLevel,
          submissionDate: new Date()
        };
        
        setLoans(prevLoans => [newLoan, ...prevLoans]);
        toast({
          title: "Loan application submitted",
          description: `Loan ID: ${loanData.loanId} has been processed with a risk score of ${riskScore}`,
        });
      } catch (error) {
        console.error("Error adding loan:", error);
        toast({
          title: "Error",
          description: "Failed to process loan application. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  const value = {
    loans,
    addLoan,
    isLoading
  };

  return <LoanContext.Provider value={value}>{children}</LoanContext.Provider>;
};
