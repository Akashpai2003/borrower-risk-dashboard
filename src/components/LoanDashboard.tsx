
import { useState } from "react";
import { useLoanContext } from "@/context/LoanContext";
import { LoanApplication, RiskLevel } from "@/types/loan";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoanStatsCards from "./LoanStatsCards";
import { getRiskBadgeVariant, getRiskBadgeColor } from "@/utils/uiUtils";
import { IndianRupee } from "lucide-react";

const LoanDashboard = () => {
  const { loans } = useLoanContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof LoanApplication>("submissionDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Handle sort function
  const handleSort = (field: keyof LoanApplication) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Filter and sort loans
  const filteredLoans = loans.filter((loan) => {
    // Filter by search term (loan ID)
    const matchesSearch = loan.loanId.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by risk level
    const matchesRisk = riskFilter === "all" || loan.riskLevel?.toLowerCase() === riskFilter.toLowerCase();
    
    return matchesSearch && matchesRisk;
  });

  // Sort loans
  const sortedLoans = [...filteredLoans].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Handle date comparison
    if (sortField === "submissionDate") {
      aValue = new Date(a.submissionDate).getTime();
      bValue = new Date(b.submissionDate).getTime();
    }
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Format currency as Indian Rupees
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(new Date(date));
  };
  
  // Get risk score class
  const getRiskScoreClass = (riskLevel: RiskLevel) => {
    switch(riskLevel) {
      case 'Low': return 'risk-score-low';
      case 'Medium': return 'risk-score-medium';
      case 'High': return 'risk-score-high';
      case 'Critical': return 'risk-score-critical';
      default: return 'risk-score-low';
    }
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <LoanStatsCards loans={loans} />
      </div>

      <Card className="border-gray-300 shadow-md rounded-xl overflow-hidden">
        <CardHeader className="bg-fintech-800 text-white pb-4">
          <CardTitle className="text-white">Loan Applications</CardTitle>
          <CardDescription className="text-gray-100">
            Review and manage all borrower applications
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by Loan ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-gray-300 bg-white text-gray-800 rounded-lg"
              />
            </div>
            <div className="w-full md:w-48">
              <Select
                value={riskFilter}
                onValueChange={setRiskFilter}
              >
                <SelectTrigger className="border-gray-300 bg-white rounded-lg">
                  <SelectValue placeholder="Filter by Risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low" className="text-green-600">Low Risk</SelectItem>
                  <SelectItem value="medium" className="text-yellow-600">Medium Risk</SelectItem>
                  <SelectItem value="high" className="text-orange-600">High Risk</SelectItem>
                  <SelectItem value="critical" className="text-red-600">Critical Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" className="mt-4">
            <TabsList className="mb-4 bg-fintech-700 p-1 rounded-lg">
              <TabsTrigger value="all" className="data-[state=active]:bg-fintech-900 text-white rounded-md">All Applications</TabsTrigger>
              <TabsTrigger value="recent" className="data-[state=active]:bg-fintech-900 text-white rounded-md">Recent</TabsTrigger>
              <TabsTrigger value="high-risk" className="data-[state=active]:bg-fintech-900 text-white rounded-md">High Risk</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="border rounded-xl overflow-auto border-gray-300 bg-white">
                <Table>
                  <TableCaption>List of all loan applications</TableCaption>
                  <TableHeader className="bg-fintech-800 text-white">
                    <TableRow>
                      <TableHead className="w-[150px] cursor-pointer text-white" onClick={() => handleSort('loanId')}>
                        Loan ID {sortField === 'loanId' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="cursor-pointer text-white" onClick={() => handleSort('loanAmount')}>
                        Amount {sortField === 'loanAmount' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="cursor-pointer text-white" onClick={() => handleSort('creditScore')}>
                        Credit Score {sortField === 'creditScore' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="text-white">Purpose</TableHead>
                      <TableHead className="cursor-pointer text-white" onClick={() => handleSort('riskScore')}>
                        Risk Score {sortField === 'riskScore' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="text-white">Risk Level</TableHead>
                      <TableHead className="cursor-pointer text-white" onClick={() => handleSort('submissionDate')}>
                        Date {sortField === 'submissionDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="text-right text-white">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedLoans.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          No loan applications found
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedLoans.map((loan) => (
                        <TableRow key={loan.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{loan.loanId}</TableCell>
                          <TableCell className="flex items-center justify-center">
                            <IndianRupee className="h-3.5 w-3.5 mr-1 text-fintech-600" />
                            {formatCurrency(loan.loanAmount).replace('₹', '')}
                          </TableCell>
                          <TableCell className="text-center">{loan.creditScore}</TableCell>
                          <TableCell className="text-center">{loan.loanPurpose}</TableCell>
                          <TableCell className="text-center">
                            <div className={`risk-score-highlight text-xl font-bold mx-auto ${getRiskScoreClass(loan.riskLevel as RiskLevel)}`}>
                              {loan.riskScore}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge 
                              variant={getRiskBadgeVariant(loan.riskLevel as RiskLevel)}
                              className={`${getRiskBadgeColor(loan.riskLevel as RiskLevel)}`}
                            >
                              {loan.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">{formatDate(loan.submissionDate)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="border-fintech-600 hover:bg-fintech-50 rounded-lg">View</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            
            <TabsContent value="recent">
              <div className="border rounded-xl overflow-auto border-gray-300 bg-white">
                <Table>
                  <TableCaption>Applications from the last 7 days</TableCaption>
                  <TableHeader className="bg-fintech-800 text-white">
                    <TableRow>
                      <TableHead className="w-[150px] text-white">Loan ID</TableHead>
                      <TableHead className="text-white">Amount</TableHead>
                      <TableHead className="text-white">Credit Score</TableHead>
                      <TableHead className="text-white">Purpose</TableHead>
                      <TableHead className="text-white">Risk Score</TableHead>
                      <TableHead className="text-white">Risk Level</TableHead>
                      <TableHead className="text-white">Date</TableHead>
                      <TableHead className="text-right text-white">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedLoans
                      .filter(loan => {
                        const oneWeekAgo = new Date();
                        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                        return new Date(loan.submissionDate) >= oneWeekAgo;
                      })
                      .map((loan) => (
                        <TableRow key={loan.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{loan.loanId}</TableCell>
                          <TableCell className="flex items-center justify-center">
                            <IndianRupee className="h-3.5 w-3.5 mr-1 text-fintech-600" />
                            {formatCurrency(loan.loanAmount).replace('₹', '')}
                          </TableCell>
                          <TableCell className="text-center">{loan.creditScore}</TableCell>
                          <TableCell className="text-center">{loan.loanPurpose}</TableCell>
                          <TableCell className="text-center">
                            <div className={`risk-score-highlight text-xl font-bold mx-auto ${getRiskScoreClass(loan.riskLevel as RiskLevel)}`}>
                              {loan.riskScore}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge 
                              variant={getRiskBadgeVariant(loan.riskLevel as RiskLevel)}
                              className={`${getRiskBadgeColor(loan.riskLevel as RiskLevel)}`}
                            >
                              {loan.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">{formatDate(loan.submissionDate)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="border-fintech-600 hover:bg-fintech-50 rounded-lg">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            
            <TabsContent value="high-risk">
              <div className="border rounded-xl overflow-auto border-gray-300 bg-white">
                <Table>
                  <TableCaption>High and critical risk applications</TableCaption>
                  <TableHeader className="bg-fintech-800 text-white">
                    <TableRow>
                      <TableHead className="w-[150px] text-white">Loan ID</TableHead>
                      <TableHead className="text-white">Amount</TableHead>
                      <TableHead className="text-white">Credit Score</TableHead>
                      <TableHead className="text-white">Purpose</TableHead>
                      <TableHead className="text-white">Risk Score</TableHead>
                      <TableHead className="text-white">Risk Level</TableHead>
                      <TableHead className="text-white">Date</TableHead>
                      <TableHead className="text-right text-white">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedLoans
                      .filter(loan => loan.riskLevel === 'High' || loan.riskLevel === 'Critical')
                      .map((loan) => (
                        <TableRow key={loan.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{loan.loanId}</TableCell>
                          <TableCell className="flex items-center justify-center">
                            <IndianRupee className="h-3.5 w-3.5 mr-1 text-fintech-600" />
                            {formatCurrency(loan.loanAmount).replace('₹', '')}
                          </TableCell>
                          <TableCell className="text-center">{loan.creditScore}</TableCell>
                          <TableCell className="text-center">{loan.loanPurpose}</TableCell>
                          <TableCell className="text-center">
                            <div className={`risk-score-highlight text-xl font-bold mx-auto ${getRiskScoreClass(loan.riskLevel as RiskLevel)}`}>
                              {loan.riskScore}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge 
                              variant={getRiskBadgeVariant(loan.riskLevel as RiskLevel)}
                              className={`${getRiskBadgeColor(loan.riskLevel as RiskLevel)}`}
                            >
                              {loan.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">{formatDate(loan.submissionDate)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="border-fintech-600 hover:bg-fintech-50 rounded-lg">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanDashboard;
