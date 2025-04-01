
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SendIcon, LoaderIcon } from "lucide-react";
import { calculateRiskScore, getRiskLevel } from "@/utils/riskUtils";
import { EducationType, LoanPurpose, EmploymentType, MaritalStatus } from '@/types/loan';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface LoanChatbotProps {
  popup?: boolean;
}

const LoanChatbot = ({ popup = false }: LoanChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      content: 'Hi there! I\'m your loan assistant. Ask me anything about loans, repayment ability, or risk assessment.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInputMessage('');

    // Process user query and generate response
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    // Simple loan repayment assessment
    if (query.toLowerCase().includes('repay') || query.toLowerCase().includes('afford')) {
      const incomeMatch = query.match(/(\d+)\s*income/i);
      const loanMatch = query.match(/(\d+)\s*loan/i) || query.match(/loan\s*(\d+)/i);
      
      if (incomeMatch && loanMatch) {
        const income = parseInt(incomeMatch[1]);
        const loanAmount = parseInt(loanMatch[1]);
        
        return assessLoanRepaymentAbility(income, loanAmount);
      }
    }
    
    // Respond to risk assessment questions
    if (query.toLowerCase().includes('risk') || query.toLowerCase().includes('score')) {
      const creditScoreMatch = query.match(/credit\s*score\s*(\d+)/i);
      const incomeMatch = query.match(/(\d+)\s*income/i);
      const loanMatch = query.match(/(\d+)\s*loan/i) || query.match(/loan\s*(\d+)/i);
      
      if (creditScoreMatch || incomeMatch || loanMatch) {
        const creditScore = creditScoreMatch ? parseInt(creditScoreMatch[1]) : 700;
        const income = incomeMatch ? parseInt(incomeMatch[1]) : 75000;
        const loanAmount = loanMatch ? parseInt(loanMatch[1]) : 200000;
        
        return assessRiskScore(income, loanAmount, creditScore);
      }
    }
    
    // Default responses
    const loanQuestions = [
      { 
        keywords: ['interest', 'rate'], 
        response: 'Interest rates vary based on your credit score, income, and loan amount. Typically, rates range from 7% to 15% for personal loans, 3% to 6% for home loans, and 4% to 10% for auto loans.' 
      },
      { 
        keywords: ['document', 'require', 'need'],
        response: 'For loan applications, you typically need ID proof, address proof, income proof (salary slips or IT returns), bank statements for the last 6 months, and details of existing loans.' 
      },
      { 
        keywords: ['emi', 'monthly', 'payment'],
        response: 'EMI depends on loan amount, interest rate, and tenure. You can use our Loan EMI Calculator to get an accurate estimate for your specific situation.' 
      },
      { 
        keywords: ['process', 'apply', 'application'],
        response: 'To apply for a loan, fill out our application form with your personal, professional, and financial details. We\'ll assess your risk profile and get back to you within 48 hours.' 
      }
    ];
    
    for (const question of loanQuestions) {
      if (question.keywords.some(keyword => query.toLowerCase().includes(keyword))) {
        return question.response;
      }
    }
    
    return "I'm not sure I understand your question. Could you please rephrase it? You can ask me about loan repayment ability, risk assessment, interest rates, or application requirements.";
  };
  
  const assessLoanRepaymentAbility = (income: number, loanAmount: number): string => {
    // Simple DTI calculation - assuming a 3-year loan term and 10% interest rate
    const monthlyIncome = income;
    const loanTerm = 36; // 3 years
    const interestRate = 10; // 10% annual interest
    const monthlyInterestRate = (interestRate / 100) / 12;
    
    // EMI calculation
    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) / 
               (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
    
    const dti = (emi / monthlyIncome) * 100;
    
    if (dti < 30) {
      return `With a monthly income of ₹${income} and a loan of ₹${loanAmount}, your estimated EMI would be ₹${Math.round(emi)} per month. This is about ${Math.round(dti)}% of your income, which is generally considered safe. Most lenders recommend keeping your debt-to-income ratio below 40%.`;
    } else if (dti < 40) {
      return `With a monthly income of ₹${income} and a loan of ₹${loanAmount}, your estimated EMI would be ₹${Math.round(emi)} per month. This is about ${Math.round(dti)}% of your income, which is approaching the upper limit of what lenders typically recommend. Consider a smaller loan amount or longer tenure.`;
    } else {
      return `With a monthly income of ₹${income} and a loan of ₹${loanAmount}, your estimated EMI would be ₹${Math.round(emi)} per month. This is about ${Math.round(dti)}% of your income, which exceeds the recommended debt-to-income ratio of 40%. This might be difficult to repay and could put financial strain on you.`;
    }
  };
  
  const assessRiskScore = (income: number, loanAmount: number, creditScore: number): string => {
    // Use our existing risk calculation function
    const mockApplication = {
      loanId: "TEMP",
      age: 35,
      income: income,
      loanAmount: loanAmount,
      creditScore: creditScore,
      monthsEmployed: 24,
      creditLines: 2,
      interestRate: 10,
      loanTerm: 36,
      dti: 0.35,
      education: 'Bachelor' as EducationType,
      employmentType: 'Full-time' as EmploymentType,
      maritalStatus: 'Married' as MaritalStatus,
      hasMortgage: false,
      dependents: 1,
      loanPurpose: 'Personal' as LoanPurpose,
      hasCoSigner: false,
    };
    
    const riskScore = calculateRiskScore(mockApplication);
    const riskLevel = getRiskLevel(riskScore);
    
    return `Based on the information provided (income: ₹${income}, loan amount: ₹${loanAmount}, credit score: ${creditScore}), the estimated risk score would be ${riskScore}/100, which is considered "${riskLevel}" risk. ${
      riskLevel === 'Low' ? 'This indicates good loan approval chances.' :
      riskLevel === 'Medium' ? 'This indicates moderate loan approval chances, possibly with a higher interest rate.' :
      riskLevel === 'High' ? 'This indicates lower approval chances or approval with significantly higher interest rates.' :
      'This indicates very low approval chances.'
    }`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className={`${popup ? 'w-full h-full' : 'w-full max-w-4xl mx-auto h-[70vh]'} flex flex-col glassmorphism`}>
      <CardHeader className="px-4 py-3 bg-gradient-to-r from-fintech-700 to-fintech-900 text-white rounded-t-lg">
        <CardTitle className="text-lg">Loan Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.sender === 'user'
                  ? 'bg-fintech-600 text-white'
                  : 'bg-white/10 border border-white/20'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg px-4 py-2 bg-white/10 border border-white/20 flex items-center">
              <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-3 border-t border-white/20">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Ask a question about loans..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-white/10 border-white/20"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()} className="rounded-md">
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoanChatbot;
