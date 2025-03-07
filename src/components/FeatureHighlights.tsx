
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Brain, 
  TrendingUp, 
  CreditCard, 
  PiggyBank, 
  Globe, 
  MessageSquare, 
  Mic, 
  BookOpen
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, link }) => {
  return (
    <Link to={link}>
      <Card className="glass-card h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20 cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="text-primary">{icon}</div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

const FeatureHighlights: React.FC = () => {
  const features = [
    {
      title: "Expense Tracking",
      description: "Automatically categorize and track all your expenses in real-time with AI-driven insights.",
      icon: <BarChart3 />,
      link: "/expense-tracking"
    },
    {
      title: "Emotion-Based Insights",
      description: "Make better financial decisions by understanding how your emotions impact your spending habits.",
      icon: <Brain />,
      link: "/emotion-insights"
    },
    {
      title: "Stock Market Predictions",
      description: "Get AI-powered market analysis and personalized investment suggestions.",
      icon: <TrendingUp />,
      link: "/stock-market"
    },
    {
      title: "Debt Management",
      description: "Strategic plans to help you reduce debt faster and save on interest payments.",
      icon: <CreditCard />,
      link: "/debt-management"
    },
    {
      title: "Smart Savings",
      description: "Automated saving strategies tailored to your financial goals and emotional patterns.",
      icon: <PiggyBank />,
      link: "/smart-savings"
    },
    {
      title: "Community Funding",
      description: "Support social causes and community initiatives through our crowdfunding feature.",
      icon: <Globe />,
      link: "/community-funding"
    },
    {
      title: "Multilingual Support",
      description: "Access financial advice in multiple languages for greater accessibility.",
      icon: <MessageSquare />,
      link: "/multilingual-support"
    },
    {
      title: "Voice-Based Input",
      description: "Simply speak to add transactions, check balances, or get financial advice.",
      icon: <Mic />,
      link: "/voice-input"
    },
    {
      title: "Financial Education",
      description: "Personalized lessons and tips to improve your financial literacy over time.",
      icon: <BookOpen />,
      link: "/financial-education"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Smart Features for Smarter Finances</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          FinAI combines emotional intelligence with financial expertise to help you manage money more effectively.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            link={feature.link}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;
