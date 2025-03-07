
import { RouteObject } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ExpenseTracking from "./pages/ExpenseTracking";
import EmotionInsights from "./pages/EmotionInsights";
import StockMarket from "./pages/StockMarket";
import DebtManagement from "./pages/DebtManagement";
import SmartSavings from "./pages/SmartSavings";
import CommunityFunding from "./pages/CommunityFunding";
import MultilingualSupport from "./pages/MultilingualSupport";
import VoiceInput from "./pages/VoiceInput";
import FinancialEducation from "./pages/FinancialEducation";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/expense-tracking",
    element: <ExpenseTracking />,
  },
  {
    path: "/emotion-insights",
    element: <EmotionInsights />,
  },
  {
    path: "/stock-market",
    element: <StockMarket />,
  },
  {
    path: "/debt-management",
    element: <DebtManagement />,
  },
  {
    path: "/smart-savings",
    element: <SmartSavings />,
  },
  {
    path: "/community-funding",
    element: <CommunityFunding />,
  },
  {
    path: "/multilingual-support",
    element: <MultilingualSupport />,
  },
  {
    path: "/voice-input",
    element: <VoiceInput />,
  },
  {
    path: "/financial-education",
    element: <FinancialEducation />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
