
import { BarChart3, DollarSign, ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoanApplication } from "@/types/loan";

interface LoanStatsCardsProps {
  loans: LoanApplication[];
}

const LoanStatsCards = ({ loans }: LoanStatsCardsProps) => {
  // Calculate total loan amount
  const totalLoanAmount = loans.reduce((total, loan) => total + loan.loanAmount, 0);
  
  // Calculate average risk score
  const averageRiskScore = loans.length 
    ? Math.round(loans.reduce((total, loan) => total + (loan.riskScore || 0), 0) / loans.length) 
    : 0;
  
  // Count high-risk loans
  const highRiskCount = loans.filter(
    loan => loan.riskLevel === 'High' || loan.riskLevel === 'Critical'
  ).length;
  
  // Calculate high-risk percentage
  const highRiskPercentage = loans.length 
    ? Math.round((highRiskCount / loans.length) * 100) 
    : 0;

  // Check if high-risk percentage is increasing (mock data for demo)
  const isIncreasing = highRiskPercentage > 25;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Loan Applications</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loans.length}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {loans.length > 0 ? `+${Math.min(loans.length, 5)} new this week` : "No applications yet"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Loan Amount</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(totalLoanAmount / 1000000).toFixed(2)}M
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {totalLoanAmount > 1000000 ? "+12.5% from last month" : "No change from last month"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Risk Score</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRiskScore}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {averageRiskScore > 70 ? "Healthy portfolio overall" : "Below target threshold"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">High Risk Applications</CardTitle>
          {isIncreasing ? (
            <ArrowUp className="h-4 w-4 text-destructive" />
          ) : (
            <ArrowDown className="h-4 w-4 text-green-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{highRiskPercentage}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            {isIncreasing 
              ? `+${Math.round(highRiskPercentage * 0.1)}% from last month` 
              : `-${Math.round(highRiskPercentage * 0.1)}% from last month`}
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default LoanStatsCards;
