
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
      return "bg-green-100 text-green-700 border-green-500";
    case "Medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-500";
    case "High":
      return "bg-orange-100 text-orange-700 border-orange-500";
    case "Critical":
      return "bg-red-100 text-red-700 border-red-500";
    default:
      return "bg-green-100 text-green-700 border-green-500";
  }
};
