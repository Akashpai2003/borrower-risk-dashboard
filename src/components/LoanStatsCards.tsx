
import { BarChart3, IndianRupee, ArrowDown, ArrowUp } from "lucide-react";
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

  // Format currency as Indian Rupees
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <>
      <Card className="border-fintech-200 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-fintech-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-fintech-800">Total Loan Applications</CardTitle>
          <BarChart3 className="h-4 w-4 text-fintech-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-fintech-900">{loans.length}</div>
          <p className="text-xs text-fintech-600 mt-1">
            {loans.length > 0 ? `+${Math.min(loans.length, 5)} new this week` : "No applications yet"}
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-fintech-200 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-fintech-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-fintech-800">Total Loan Amount</CardTitle>
          <IndianRupee className="h-4 w-4 text-fintech-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-fintech-900 flex items-center">
            <IndianRupee className="h-5 w-5 mr-1 text-fintech-700" />
            {(totalLoanAmount / 10000000).toFixed(2)}Cr
          </div>
          <p className="text-xs text-fintech-600 mt-1">
            {totalLoanAmount > 1000000 ? "+12.5% from last month" : "No change from last month"}
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-fintech-200 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-fintech-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-fintech-800">Average Risk Score</CardTitle>
          <BarChart3 className="h-4 w-4 text-fintech-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-fintech-900">{averageRiskScore}</div>
          <p className="text-xs text-fintech-600 mt-1">
            {averageRiskScore > 70 ? "Healthy portfolio overall" : "Below target threshold"}
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-fintech-200 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-fintech-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-fintech-800">High Risk Applications</CardTitle>
          {isIncreasing ? (
            <ArrowUp className="h-4 w-4 text-risk-critical" />
          ) : (
            <ArrowDown className="h-4 w-4 text-risk-low" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-fintech-900">{highRiskPercentage}%</div>
          <p className="text-xs text-fintech-600 mt-1">
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
