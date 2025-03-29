
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
import { getRiskBadgeVariant } from "@/utils/uiUtils";

const LoanDashboard = () => {
  const { loans } = useLoanContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof LoanApplication>("submissionDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

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

  // Toggle sort direction
  const handleSort = (field: keyof LoanApplication) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
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

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <LoanStatsCards loans={loans} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Loan Applications</CardTitle>
          <CardDescription>
            Review and manage all borrower applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by Loan ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select
                value={riskFilter}
                onValueChange={setRiskFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="critical">Critical Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Applications</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="high-risk">High Risk</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="border rounded-md overflow-auto">
                <Table>
                  <TableCaption>List of all loan applications</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px] cursor-pointer" onClick={() => handleSort('loanId')}>
                        Loan ID {sortField === 'loanId' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('loanAmount')}>
                        Amount {sortField === 'loanAmount' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('creditScore')}>
                        Credit Score {sortField === 'creditScore' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('riskScore')}>
                        Risk Score {sortField === 'riskScore' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('submissionDate')}>
                        Date {sortField === 'submissionDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="text-right">Action</TableHead>
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
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.loanId}</TableCell>
                          <TableCell>{formatCurrency(loan.loanAmount)}</TableCell>
                          <TableCell>{loan.creditScore}</TableCell>
                          <TableCell>{loan.loanPurpose}</TableCell>
                          <TableCell>{loan.riskScore}</TableCell>
                          <TableCell>
                            <Badge variant={getRiskBadgeVariant(loan.riskLevel as RiskLevel)}>
                              {loan.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(loan.submissionDate)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="border rounded-md overflow-auto">
                <Table>
                  <TableCaption>Applications from the last 7 days</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Loan ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Credit Score</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
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
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.loanId}</TableCell>
                          <TableCell>{formatCurrency(loan.loanAmount)}</TableCell>
                          <TableCell>{loan.creditScore}</TableCell>
                          <TableCell>{loan.loanPurpose}</TableCell>
                          <TableCell>{loan.riskScore}</TableCell>
                          <TableCell>
                            <Badge variant={getRiskBadgeVariant(loan.riskLevel as RiskLevel)}>
                              {loan.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(loan.submissionDate)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="high-risk">
              <div className="border rounded-md overflow-auto">
                <Table>
                  <TableCaption>High and critical risk applications</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Loan ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Credit Score</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedLoans
                      .filter(loan => loan.riskLevel === 'High' || loan.riskLevel === 'Critical')
                      .map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.loanId}</TableCell>
                          <TableCell>{formatCurrency(loan.loanAmount)}</TableCell>
                          <TableCell>{loan.creditScore}</TableCell>
                          <TableCell>{loan.loanPurpose}</TableCell>
                          <TableCell>{loan.riskScore}</TableCell>
                          <TableCell>
                            <Badge variant={getRiskBadgeVariant(loan.riskLevel as RiskLevel)}>
                              {loan.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(loan.submissionDate)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">View</Button>
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
