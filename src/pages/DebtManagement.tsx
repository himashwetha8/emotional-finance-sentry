
import React, { useState } from 'react';
import Header from '../components/Header';
import { EmotionProvider } from '../context/EmotionContext';
import { FinanceProvider } from '../context/FinanceContext';
import { CreditCard, Plus, Trash2, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Debt {
  id: string;
  name: string;
  type: 'credit-card' | 'loan' | 'mortgage' | 'student-loan' | 'other';
  originalAmount: number;
  currentBalance: number;
  interestRate: number;
  minimumPayment: number;
}

const DebtManagement = () => {
  const { toast } = useToast();
  
  // Mock data for initial debts
  const [debts, setDebts] = useState<Debt[]>([
    {
      id: '1',
      name: 'Credit Card A',
      type: 'credit-card',
      originalAmount: 8500,
      currentBalance: 4250,
      interestRate: 19.99,
      minimumPayment: 85,
    },
    {
      id: '2',
      name: 'Auto Loan',
      type: 'loan',
      originalAmount: 32000,
      currentBalance: 18750,
      interestRate: 4.25,
      minimumPayment: 450,
    },
    {
      id: '3',
      name: 'Student Loan',
      type: 'student-loan',
      originalAmount: 45000,
      currentBalance: 30000,
      interestRate: 5.8,
      minimumPayment: 350,
    },
  ]);
  
  // Form state for adding new debt
  const [newDebt, setNewDebt] = useState<Omit<Debt, 'id'>>({
    name: '',
    type: 'credit-card',
    originalAmount: 0,
    currentBalance: 0,
    interestRate: 0,
    minimumPayment: 0,
  });
  
  // Calculate total debt
  const totalDebt = debts.reduce((sum, debt) => sum + debt.currentBalance, 0);
  const totalOriginalDebt = debts.reduce((sum, debt) => sum + debt.originalAmount, 0);
  const totalMinimumPayment = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
  
  // Calculate average interest rate (weighted by current balance)
  const avgInterestRate = debts.length > 0
    ? debts.reduce((sum, debt) => sum + (debt.interestRate * debt.currentBalance), 0) / totalDebt
    : 0;
  
  const handleAddDebt = () => {
    // Validate form
    if (!newDebt.name || newDebt.originalAmount <= 0 || newDebt.currentBalance <= 0 || newDebt.interestRate <= 0) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields with valid values",
        variant: "destructive",
      });
      return;
    }
    
    // Add the new debt
    const debt: Debt = {
      ...newDebt,
      id: `debt-${Date.now()}`,
    };
    
    setDebts([...debts, debt]);
    
    // Reset form
    setNewDebt({
      name: '',
      type: 'credit-card',
      originalAmount: 0,
      currentBalance: 0,
      interestRate: 0,
      minimumPayment: 0,
    });
    
    toast({
      title: "Debt Added",
      description: `${debt.name} has been added to your debt tracker`,
    });
  };
  
  const handleDeleteDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
    toast({
      title: "Debt Removed",
      description: "The debt has been removed from your tracker",
    });
  };
  
  // Calculate payment strategies
  const avalancheMethod = [...debts].sort((a, b) => b.interestRate - a.interestRate);
  const snowballMethod = [...debts].sort((a, b) => a.currentBalance - b.currentBalance);
  
  return (
    <EmotionProvider>
      <FinanceProvider>
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
                    <CreditCard className="w-8 h-8" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-4">
                  Debt Management
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Strategic plans to help you reduce debt faster and save on interest payments.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Debt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">${totalDebt.toLocaleString()}</div>
                    <Progress 
                      value={(totalDebt / totalOriginalDebt) * 100} 
                      className="h-2 mt-2" 
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {totalOriginalDebt > totalDebt ? (
                        `${((1 - (totalDebt / totalOriginalDebt)) * 100).toFixed(1)}% paid off`
                      ) : (
                        'No progress yet'
                      )}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Monthly Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">${totalMinimumPayment.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Total minimum payments
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Avg. Interest Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{avgInterestRate.toFixed(2)}%</div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Weighted by current balance
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Debt Freedom</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">Oct 2027</div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Estimated debt-free date
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Debt List */}
                <div className="lg:col-span-2">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-xl">Your Debts</CardTitle>
                      <CardDescription>Track and manage all your debts in one place</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {debts.length > 0 ? (
                        <div className="space-y-4">
                          {debts.map((debt) => (
                            <div 
                              key={debt.id} 
                              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-secondary/20 rounded-lg"
                            >
                              <div className="mb-2 sm:mb-0">
                                <div className="font-medium">{debt.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {debt.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <div className="text-muted-foreground">Balance</div>
                                  <div className="font-medium">${debt.currentBalance.toLocaleString()}</div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground">Interest</div>
                                  <div className="font-medium">{debt.interestRate}%</div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground">Payment</div>
                                  <div className="font-medium">${debt.minimumPayment}/mo</div>
                                </div>
                                <div className="flex justify-end sm:justify-center items-center">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteDebt(debt.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          <p>No debts added yet</p>
                          <p className="text-sm">Add your first debt to get started</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Add Debt Form */}
                <div>
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-xl">Add New Debt</CardTitle>
                      <CardDescription>Record your loans, credit cards, and other debts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="debt-name">Debt Name</Label>
                          <Input
                            id="debt-name"
                            placeholder="Credit Card, Car Loan, etc."
                            value={newDebt.name}
                            onChange={(e) => setNewDebt({...newDebt, name: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="debt-type">Debt Type</Label>
                          <Select 
                            value={newDebt.type} 
                            onValueChange={(value) => setNewDebt({...newDebt, type: value as Debt['type']})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="credit-card">Credit Card</SelectItem>
                              <SelectItem value="loan">Personal Loan</SelectItem>
                              <SelectItem value="mortgage">Mortgage</SelectItem>
                              <SelectItem value="student-loan">Student Loan</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="original-amount">Original Amount</Label>
                          <Input
                            id="original-amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={newDebt.originalAmount || ''}
                            onChange={(e) => setNewDebt({...newDebt, originalAmount: parseFloat(e.target.value) || 0})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="current-balance">Current Balance</Label>
                          <Input
                            id="current-balance"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={newDebt.currentBalance || ''}
                            onChange={(e) => setNewDebt({...newDebt, currentBalance: parseFloat(e.target.value) || 0})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                          <Input
                            id="interest-rate"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={newDebt.interestRate || ''}
                            onChange={(e) => setNewDebt({...newDebt, interestRate: parseFloat(e.target.value) || 0})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="minimum-payment">Minimum Monthly Payment</Label>
                          <Input
                            id="minimum-payment"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={newDebt.minimumPayment || ''}
                            onChange={(e) => setNewDebt({...newDebt, minimumPayment: parseFloat(e.target.value) || 0})}
                          />
                        </div>
                        
                        <Button type="button" className="w-full" onClick={handleAddDebt}>
                          <Plus className="mr-2 h-4 w-4" /> Add Debt
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Card className="glass-card mb-8">
                <CardHeader>
                  <CardTitle className="text-xl">Debt Payoff Strategies</CardTitle>
                  <CardDescription>Different methods to help you become debt-free faster</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="avalanche">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="avalanche">Avalanche Method</TabsTrigger>
                      <TabsTrigger value="snowball">Snowball Method</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="avalanche">
                      <div className="space-y-4">
                        <p className="text-muted-foreground mb-4">
                          The <strong>Avalanche Method</strong> focuses on paying off debts with the highest interest rates first, 
                          which saves you the most money in interest payments over time.
                        </p>
                        
                        {avalancheMethod.map((debt, index) => (
                          <div key={debt.id} className="bg-secondary/20 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                                {index + 1}
                              </div>
                              <h3 className="font-medium">{debt.name}</h3>
                              <div className="text-sm text-muted-foreground ml-auto">
                                Interest: {debt.interestRate}%
                              </div>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Current: ${debt.currentBalance.toLocaleString()}</span>
                              <span>Monthly: ${debt.minimumPayment}/mo</span>
                            </div>
                            <Progress 
                              value={(debt.currentBalance / debt.originalAmount) * 100} 
                              className="h-2" 
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="snowball">
                      <div className="space-y-4">
                        <p className="text-muted-foreground mb-4">
                          The <strong>Snowball Method</strong> focuses on paying off the smallest debts first to build momentum
                          and motivation as you eliminate each debt quickly.
                        </p>
                        
                        {snowballMethod.map((debt, index) => (
                          <div key={debt.id} className="bg-secondary/20 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                                {index + 1}
                              </div>
                              <h3 className="font-medium">{debt.name}</h3>
                              <div className="text-sm text-muted-foreground ml-auto">
                                Balance: ${debt.currentBalance.toLocaleString()}
                              </div>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Original: ${debt.originalAmount.toLocaleString()}</span>
                              <span>Monthly: ${debt.minimumPayment}/mo</span>
                            </div>
                            <Progress 
                              value={(debt.currentBalance / debt.originalAmount) * 100} 
                              className="h-2" 
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
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
      </FinanceProvider>
    </EmotionProvider>
  );
};

export default DebtManagement;
