
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { IndianRupee, Calculator } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  // Calculate EMI and related values
  useEffect(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
      const x = Math.pow(1 + monthlyRate, numberOfPayments);
      const monthlyPayment = (principal * x * monthlyRate) / (x - 1);
      
      setEmi(Math.round(monthlyPayment));
      setTotalPayment(Math.round(monthlyPayment * numberOfPayments));
      setTotalInterest(Math.round((monthlyPayment * numberOfPayments) - principal));
    } else {
      setEmi(0);
      setTotalPayment(0);
      setTotalInterest(0);
    }
  }, [loanAmount, interestRate, loanTerm]);

  // Format currency as Indian Rupees
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(amount);
  };

  // Chart data
  const data = [
    { name: "Principal", value: loanAmount, color: "#4ade80" },
    { name: "Interest", value: totalInterest, color: "#f87171" }
  ];

  return (
    <div className="container mx-auto py-4 space-y-6">
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg shadow-lg text-white mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan EMI Calculator</h1>
          <p className="text-green-100">Calculate your monthly EMI, total interest and payment</p>
        </div>
        <Calculator className="h-10 w-10 text-white" />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
            <CardTitle className="text-2xl text-green-900">Loan Parameters</CardTitle>
            <CardDescription className="text-green-700">
              Adjust the values to calculate your EMI
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="loanAmount" className="text-base font-medium">Loan Amount</Label>
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1 text-gray-700" />
                  <span>{formatCurrency(loanAmount).replace('₹', '')}</span>
                </div>
              </div>
              <Slider
                id="loanAmount"
                min={100000}
                max={10000000}
                step={50000}
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                className="[&>span]:bg-green-500"
              />
              <Input
                type="number"
                min={100000}
                max={10000000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="mt-2 border-green-200"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="interestRate" className="text-base font-medium">Interest Rate (%)</Label>
                <span>{interestRate}%</span>
              </div>
              <Slider
                id="interestRate"
                min={4}
                max={24}
                step={0.1}
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
                className="[&>span]:bg-green-500"
              />
              <Input
                type="number"
                min={4}
                max={24}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="mt-2 border-green-200"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="loanTerm" className="text-base font-medium">Loan Term (years)</Label>
                <span>{loanTerm} years</span>
              </div>
              <Slider
                id="loanTerm"
                min={1}
                max={30}
                value={[loanTerm]}
                onValueChange={(value) => setLoanTerm(value[0])}
                className="[&>span]:bg-green-500"
              />
              <Input
                type="number"
                min={1}
                max={30}
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="mt-2 border-green-200"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-teal-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-green-50">
            <CardTitle className="text-2xl text-teal-900">Loan Summary</CardTitle>
            <CardDescription className="text-teal-700">
              Your loan payment breakdown
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
                <p className="text-xl font-bold text-green-800">{formatCurrency(emi)}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                <p className="text-xl font-bold text-red-800">{formatCurrency(totalInterest)}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Payment</p>
                <p className="text-xl font-bold text-blue-800">{formatCurrency(totalPayment)}</p>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t border-gray-100">
            <div className="w-full text-center text-gray-600 text-sm">
              This is an estimate based on the information you provided
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoanCalculator;
