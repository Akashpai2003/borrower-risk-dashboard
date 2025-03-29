
import { RiskLevel } from "@/types/loan";

export const getRiskBadgeVariant = (riskLevel: RiskLevel): "default" | "secondary" | "destructive" | "outline" => {
  switch (riskLevel) {
    case "Low":
      return "outline";
    case "Medium":
      return "secondary";
    case "High":
      return "default";
    case "Critical":
      return "destructive";
    default:
      return "outline";
  }
};

export const getRiskBadgeColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case "Low":
      return "bg-risk-low/10 text-risk-low border-risk-low";
    case "Medium":
      return "bg-risk-medium/10 text-risk-medium border-risk-medium";
    case "High":
      return "bg-risk-high/10 text-risk-high border-risk-high";
    case "Critical":
      return "bg-risk-critical/10 text-risk-critical border-risk-critical";
    default:
      return "bg-risk-low/10 text-risk-low border-risk-low";
  }
};
