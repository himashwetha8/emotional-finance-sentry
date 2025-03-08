
import React, { useState } from 'react';
import Header from '../components/Header';
import { EmotionProvider } from '../context/EmotionContext';
import { FinanceProvider, useFinance } from '../context/FinanceContext';
import { PiggyBank, Plus, Target, Calendar, Sparkles, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  category: 'emergency' | 'vacation' | 'home' | 'car' | 'education' | 'retirement' | 'other';
  endDate: Date | null;
  autoSave: boolean;
  autoSaveAmount: number;
  autoSaveFrequency: 'daily' | 'weekly' | 'monthly';
}

// Create a component to use the finance context
const SmartSavingsContent = () => {
  const { financeState } = useFinance();
  const { toast } = useToast();
  
  // Mock data for savings goals
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 15000,
      savedAmount: 6000,
      category: 'emergency',
      endDate: new Date(2023, 11, 31),
      autoSave: true,
      autoSaveAmount: 200,
      autoSaveFrequency: 'monthly',
    },
    {
      id: '2',
      name: 'Summer Vacation',
      targetAmount: 3000,
      savedAmount: 1200,
      category: 'vacation',
      endDate: new Date(2023, 5, 15),
      autoSave: true,
      autoSaveAmount: 100,
      autoSaveFrequency: 'weekly',
    },
    {
      id: '3',
      name: 'New Car',
      targetAmount: 25000,
      savedAmount: 5000,
      category: 'car',
      endDate: new Date(2024, 8, 30),
      autoSave: false,
      autoSaveAmount: 0,
      autoSaveFrequency: 'monthly',
    },
  ]);
  
  // Form state for adding new savings goal
  const [newGoal, setNewGoal] = useState<Omit<SavingsGoal, 'id'>>({
    name: '',
    targetAmount: 0,
    savedAmount: 0,
    category: 'other',
    endDate: null,
    autoSave: false,
    autoSaveAmount: 0,
    autoSaveFrequency: 'monthly',
  });
  
  // Calculate totals
  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalAutoSave = savingsGoals
    .filter(goal => goal.autoSave)
    .reduce((sum, goal) => {
      if (goal.autoSaveFrequency === 'monthly') return sum + goal.autoSaveAmount;
      if (goal.autoSaveFrequency === 'weekly') return sum + (goal.autoSaveAmount * 4);
      if (goal.autoSaveFrequency === 'daily') return sum + (goal.autoSaveAmount * 30);
      return sum;
    }, 0);
  
  const handleAddGoal = () => {
    // Validate form
    if (!newGoal.name || newGoal.targetAmount <= 0) {
      toast({
        title: "Missing information",
        description: "Please provide a name and target amount for your savings goal",
        variant: "destructive",
      });
      return;
    }
    
    // Add the new goal
    const goal: SavingsGoal = {
      ...newGoal,
      id: `goal-${Date.now()}`,
    };
    
    setSavingsGoals([...savingsGoals, goal]);
    
    // Reset form
    setNewGoal({
      name: '',
      targetAmount: 0,
      savedAmount: 0,
      category: 'other',
      endDate: null,
      autoSave: false,
      autoSaveAmount: 0,
      autoSaveFrequency: 'monthly',
    });
    
    toast({
      title: "Savings Goal Added",
      description: `${goal.name} has been added to your savings goals`,
    });
  };
  
  const handleDeleteGoal = (id: string) => {
    setSavingsGoals(savingsGoals.filter(goal => goal.id !== id));
    toast({
      title: "Goal Removed",
      description: "The savings goal has been removed",
    });
  };
  
  const handleContribute = (id: string, amount: number) => {
    setSavingsGoals(savingsGoals.map(goal => {
      if (goal.id === id) {
        return {
          ...goal,
          savedAmount: goal.savedAmount + amount
        };
      }
      return goal;
    }));
    
    toast({
      title: "Contribution Added",
      description: `$${amount} has been added to your savings goal`,
    });
  };
  
  const toggleAutoSave = (id: string) => {
    setSavingsGoals(savingsGoals.map(goal => {
      if (goal.id === id) {
        return {
          ...goal,
          autoSave: !goal.autoSave
        };
      }
      return goal;
    }));
  };
  
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
                <PiggyBank className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-4">
              Smart Savings
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Automated saving strategies tailored to your financial goals and emotional patterns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalSaved.toLocaleString()}</div>
                <Progress 
                  value={(totalSaved / totalTarget) * 100} 
                  className="h-2 mt-2" 
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {totalTarget > 0 ? `${((totalSaved / totalTarget) * 100).toFixed(1)}% of total goals` : 'No goals set'}
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Monthly Auto-Save</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalAutoSave.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Total automatic monthly contributions
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Savings Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">14%</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Of your monthly income
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-xl">Your Savings Goals</CardTitle>
                  <CardDescription>Track progress towards your financial milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  {savingsGoals.length > 0 ? (
                    <div className="space-y-6">
                      {savingsGoals.map((goal) => (
                        <div key={goal.id} className="p-4 bg-secondary/20 rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {goal.category === 'emergency' && <Target className="h-4 w-4 text-amber-500" />}
                                {goal.category === 'vacation' && <Calendar className="h-4 w-4 text-blue-500" />}
                                {goal.category === 'home' && <PiggyBank className="h-4 w-4 text-green-500" />}
                                {goal.category === 'car' && <PiggyBank className="h-4 w-4 text-purple-500" />}
                                {goal.category === 'education' && <PiggyBank className="h-4 w-4 text-red-500" />}
                                {goal.category === 'retirement' && <PiggyBank className="h-4 w-4 text-indigo-500" />}
                                {goal.category === 'other' && <PiggyBank className="h-4 w-4 text-gray-500" />}
                                {goal.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {goal.endDate ? `Target date: ${goal.endDate.toLocaleDateString()}` : 'No end date set'}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleContribute(goal.id, 100)}
                              >
                                + $100
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteGoal(goal.id)}
                              >
                                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-sm mb-1">
                            <span>${goal.savedAmount.toLocaleString()} saved</span>
                            <span>Target: ${goal.targetAmount.toLocaleString()}</span>
                          </div>
                          <Progress 
                            value={(goal.savedAmount / goal.targetAmount) * 100} 
                            className="h-2 mb-3" 
                          />
                          
                          <div className="flex items-center justify-between mt-3 bg-primary/5 p-2 rounded">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">Auto-save</span>
                            </div>
                            <div className="flex items-center gap-4">
                              {goal.autoSave && (
                                <span className="text-sm">
                                  ${goal.autoSaveAmount}/{goal.autoSaveFrequency}
                                </span>
                              )}
                              <Switch 
                                checked={goal.autoSave}
                                onCheckedChange={() => toggleAutoSave(goal.id)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>No savings goals yet</p>
                      <p className="text-sm">Add your first goal to get started</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Add Savings Goal Form */}
            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-xl">Add New Goal</CardTitle>
                  <CardDescription>Create a new savings target</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="goal-name">Goal Name</Label>
                      <Input
                        id="goal-name"
                        placeholder="Emergency Fund, Vacation, etc."
                        value={newGoal.name}
                        onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="goal-category">Category</Label>
                      <Select 
                        value={newGoal.category} 
                        onValueChange={(value) => setNewGoal({...newGoal, category: value as SavingsGoal['category']})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency">Emergency Fund</SelectItem>
                          <SelectItem value="vacation">Vacation</SelectItem>
                          <SelectItem value="home">Home</SelectItem>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retirement">Retirement</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="target-amount">Target Amount</Label>
                      <Input
                        id="target-amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newGoal.targetAmount || ''}
                        onChange={(e) => setNewGoal({...newGoal, targetAmount: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="initial-amount">Initial Amount (Optional)</Label>
                      <Input
                        id="initial-amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newGoal.savedAmount || ''}
                        onChange={(e) => setNewGoal({...newGoal, savedAmount: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-save" className="cursor-pointer">Enable Auto-Save</Label>
                      <Switch 
                        id="auto-save"
                        checked={newGoal.autoSave}
                        onCheckedChange={(checked) => setNewGoal({...newGoal, autoSave: checked})}
                      />
                    </div>
                    
                    {newGoal.autoSave && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="auto-save-amount">Auto-Save Amount</Label>
                          <Input
                            id="auto-save-amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={newGoal.autoSaveAmount || ''}
                            onChange={(e) => setNewGoal({...newGoal, autoSaveAmount: parseFloat(e.target.value) || 0})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="auto-save-frequency">Frequency</Label>
                          <Select 
                            value={newGoal.autoSaveFrequency} 
                            onValueChange={(value) => setNewGoal({...newGoal, autoSaveFrequency: value as SavingsGoal['autoSaveFrequency']})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    
                    <Button type="button" className="w-full" onClick={handleAddGoal}>
                      <Plus className="mr-2 h-4 w-4" /> Add Goal
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl">Smart Recommendations</CardTitle>
              <CardDescription>AI-powered savings suggestions based on your income and spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 bg-secondary/20 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Target className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-medium">Emergency Fund Priority</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Based on your spending, we recommend saving 3-6 months of expenses in an emergency fund.
                    </p>
                    <Button variant="outline" size="sm">Set Up Emergency Fund</Button>
                  </div>
                  
                  <div className="flex-1 bg-secondary/20 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-medium">Optimal Savings Rate</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your current savings rate is 14%. We recommend increasing to 20% to reach your retirement goals.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Current: 14%</span>
                        <span>Recommended: 20%</span>
                      </div>
                      <Slider defaultValue={[14]} max={25} step={1} />
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium">Round-Up Savings</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Enable round-up savings to automatically save the spare change from transactions.
                    Based on your spending patterns, this could add up to $45 extra savings per month.
                  </p>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">Enable Round-Up</Button>
                    <div className="text-sm font-medium">Potential Monthly Savings: $45</div>
                  </div>
                </div>
              </div>
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
  );
};

const SmartSavings = () => {
  return (
    <EmotionProvider>
      <FinanceProvider>
        <SmartSavingsContent />
      </FinanceProvider>
    </EmotionProvider>
  );
};

export default SmartSavings;
