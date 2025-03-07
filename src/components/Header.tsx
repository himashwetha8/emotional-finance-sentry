
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              FinAI
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-2">
            <Link to="/">
              <Button variant={location.pathname === '/' ? "secondary" : "ghost"}>
                Dashboard
              </Button>
            </Link>
            <Link to="/expense-tracking">
              <Button variant={location.pathname === '/expense-tracking' ? "secondary" : "ghost"}>
                Expenses
              </Button>
            </Link>
            <Link to="/emotion-insights">
              <Button variant={location.pathname === '/emotion-insights' ? "secondary" : "ghost"}>
                Emotions
              </Button>
            </Link>
            <Link to="/stock-market">
              <Button variant={location.pathname === '/stock-market' ? "secondary" : "ghost"}>
                Investments
              </Button>
            </Link>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/" className="w-full">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/expense-tracking" className="w-full">Expense Tracking</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/emotion-insights" className="w-full">Emotion Insights</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/stock-market" className="w-full">Stock Market</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/debt-management" className="w-full">Debt Management</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/smart-savings" className="w-full">Smart Savings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/community-funding" className="w-full">Community Funding</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/multilingual-support" className="w-full">Multilingual Support</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/voice-input" className="w-full">Voice Input</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/financial-education" className="w-full">Financial Education</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
