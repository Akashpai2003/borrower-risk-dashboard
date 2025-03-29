
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
