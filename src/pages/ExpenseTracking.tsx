
import React, { useState } from 'react';
import Header from '../components/Header';
import { EmotionProvider } from '../context/EmotionContext';
import { FinanceProvider, useFinance } from '../context/FinanceContext';
import { BarChart3, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import TransactionCard from '@/components/TransactionCard';
import { formatCurrency } from '@/utils/financeUtils';

// Create a separate component to use the finance context
const ExpenseTrackingContent = () => {
  const { financeState, addTransaction } = useFinance();
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [filter, setFilter] = useState<string>('all');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive amount",
        variant: "destructive",
      });
      return;
    }
    
    addTransaction({
      amount: amountValue,
      category,
      description,
      date: new Date(),
      type: transactionType,
    });
    
    toast({
      title: "Transaction added",
      description: `${transactionType === 'expense' ? 'Expense' : 'Income'} of ${formatCurrency(amountValue)} added successfully`,
    });
    
    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
  };
  
  // Filter transactions based on selected filter
  const filteredTransactions = financeState.transactions.filter(tx => {
    if (filter === 'all') return true;
    if (filter === 'expense') return tx.type === 'expense';
    if (filter === 'income') return tx.type === 'income';
    return true;
  });
  
  // Group transactions by date for display
  const groupedTransactions: Record<string, typeof filteredTransactions> = {};
  filteredTransactions.forEach(tx => {
    const dateStr = tx.date.toDateString();
    if (!groupedTransactions[dateStr]) {
      groupedTransactions[dateStr] = [];
    }
    groupedTransactions[dateStr].push(tx);
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
      <Header />
      <main className="flex-1 pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">
                ← Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="text-center mb-10 animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <BarChart3 className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-4">
              Expense Tracking
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Automatically categorize and track all your expenses in real-time with AI-driven insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Add Transaction Form */}
            <Card className="glass-card col-span-1">
              <CardHeader>
                <CardTitle className="text-xl">Add Transaction</CardTitle>
                <CardDescription>Record your expenses and income</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="transaction-type">Transaction Type</Label>
                    <Select 
                      value={transactionType} 
                      onValueChange={(value) => setTransactionType(value as 'expense' | 'income')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food">Food & Dining</SelectItem>
                        <SelectItem value="transportation">Transportation</SelectItem>
                        <SelectItem value="housing">Housing</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="shopping">Shopping</SelectItem>
                        <SelectItem value="health">Health & Medical</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="salary">Salary</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="What was this for?"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Transaction
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Transactions List */}
            <div className="col-span-1 lg:col-span-2">
              <Card className="glass-card mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Your Transactions</CardTitle>
                    <CardDescription>Track your spending and income</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="expense">Expenses</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.keys(groupedTransactions).length > 0 ? (
                    Object.entries(groupedTransactions).map(([date, transactions]) => (
                      <div key={date}>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">{date}</h3>
                        <div className="space-y-2">
                          {transactions.map((transaction) => (
                            <TransactionCard key={transaction.id} transaction={transaction} />
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>No transactions yet</p>
                      <p className="text-sm">Add your first transaction to get started</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 bg-secondary/20 border-t border-border/40">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            FinAI – Smart, Simple, Secure!
          </p>
        </div>
      </footer>
    </div>
  );
};

const ExpenseTracking = () => {
  return (
    <EmotionProvider>
      <FinanceProvider>
        <ExpenseTrackingContent />
      </FinanceProvider>
    </EmotionProvider>
  );
};

export default ExpenseTracking;
