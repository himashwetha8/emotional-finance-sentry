
import React, { useState } from 'react';
import Header from '../components/Header';
import { EmotionProvider, useEmotion, Emotion } from '../context/EmotionContext';
import { FinanceProvider, useFinance } from '../context/FinanceContext';
import { Brain, LineChart, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import EmotionDetector from '@/components/EmotionDetector';

// Create a separate component to use the emotion and finance contexts
const EmotionInsightsContent = () => {
  const { emotionState, setCurrentEmotion, toggleEmotionDetection } = useEmotion();
  const { addInsight } = useFinance();
  const { toast } = useToast();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>('neutral');
  const [journalEntry, setJournalEntry] = useState('');
  
  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    setCurrentEmotion(emotion, 0.9); // High confidence since user selected
  };
  
  const handleJournalSubmit = () => {
    if (!journalEntry.trim()) {
      toast({
        title: "Missing information",
        description: "Please write something in your journal entry",
        variant: "destructive",
      });
      return;
    }
    
    // Add an insight based on the journal
    addInsight({
      title: `Emotion: ${selectedEmotion}`,
      description: "Your emotional state impacts your financial decisions. Consider this before making large purchases.",
      emotionRelated: true,
      emotion: selectedEmotion,
      impactLevel: selectedEmotion === 'happy' || selectedEmotion === 'neutral' ? 'low' : 'high',
    });
    
    toast({
      title: "Journal Entry Saved",
      description: "Your emotional journal entry has been saved and analyzed",
    });
    
    // Reset form
    setJournalEntry('');
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
                <Brain className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-4">
              Emotion-Based Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Make better financial decisions by understanding how your emotions impact your spending habits.
            </p>
          </div>
          
          <Tabs defaultValue="emotion-tracker" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="emotion-tracker">Emotion Tracker</TabsTrigger>
              <TabsTrigger value="financial-impact">Financial Impact</TabsTrigger>
              <TabsTrigger value="journal">Emotional Journal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="emotion-tracker">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Emotion Detector Card */}
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">Current Emotion</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="auto-detect" 
                          checked={emotionState.emotionDetectionEnabled}
                          onCheckedChange={toggleEmotionDetection}
                        />
                        <Label htmlFor="auto-detect">Auto-detect</Label>
                      </div>
                    </div>
                    <CardDescription>How are you feeling right now?</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <EmotionDetector isDetecting={false} />
                  </CardContent>
                </Card>
                
                {/* Manual Selection Card */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Select Your Emotion</CardTitle>
                    <CardDescription>Choose how you're feeling manually</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={selectedEmotion}
                      onValueChange={(value) => handleEmotionSelect(value as Emotion)}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="happy" id="happy" />
                        <Label htmlFor="happy">😊 Happy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sad" id="sad" />
                        <Label htmlFor="sad">😢 Sad</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="angry" id="angry" />
                        <Label htmlFor="angry">😠 Angry</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fearful" id="fearful" />
                        <Label htmlFor="fearful">😨 Fearful</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="disgusted" id="disgusted" />
                        <Label htmlFor="disgusted">🤢 Disgusted</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="surprised" id="surprised" />
                        <Label htmlFor="surprised">😲 Surprised</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="neutral" id="neutral" />
                        <Label htmlFor="neutral">😐 Neutral</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="financial-impact">
              <div className="grid grid-cols-1 gap-6 mb-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Emotion & Spending Analysis</CardTitle>
                    <CardDescription>How your emotions affect your spending behavior</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-lg bg-secondary/20 p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <LineChart className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium">Emotional Spending Patterns</h3>
                            <p className="text-sm text-muted-foreground">Based on your current emotion: {selectedEmotion}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Financial Impact</h4>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ 
                                  width: selectedEmotion === 'happy' ? '30%' : 
                                         selectedEmotion === 'sad' || selectedEmotion === 'angry' ? '80%' : '50%' 
                                }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Low Impact</span>
                              <span>High Impact</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="mb-2 font-medium">Spending Advice</h4>
                            {selectedEmotion === 'happy' && (
                              <p>You're in a good mood! This is a good time for budgeting and long-term financial planning.</p>
                            )}
                            {selectedEmotion === 'sad' && (
                              <p>When feeling sad, you may be prone to "retail therapy." Consider waiting 24 hours before making non-essential purchases.</p>
                            )}
                            {selectedEmotion === 'angry' && (
                              <p>Anger can lead to impulsive financial decisions. Take a break before making any significant financial changes.</p>
                            )}
                            {selectedEmotion === 'fearful' && (
                              <p>Fear might cause you to sell investments prematurely or over-save. Balance caution with rational decision-making.</p>
                            )}
                            {selectedEmotion === 'neutral' && (
                              <p>Your neutral emotional state is ideal for making balanced financial decisions.</p>
                            )}
                            {(selectedEmotion === 'disgusted' || selectedEmotion === 'surprised') && (
                              <p>Strong emotions can cloud judgment. Consider revisiting financial decisions when emotions are less intense.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="journal">
              <div className="grid grid-cols-1 gap-6 mb-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Emotional Journal</CardTitle>
                    <CardDescription>Record how you're feeling about your finances</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Write about how you're feeling today and how it might affect your financial decisions..."
                        className="min-h-[150px]"
                        value={journalEntry}
                        onChange={(e) => setJournalEntry(e.target.value)}
                      />
                      
                      <Button onClick={handleJournalSubmit} className="w-full">
                        Save Journal Entry
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
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

const EmotionInsights = () => {
  return (
    <EmotionProvider>
      <FinanceProvider>
        <EmotionInsightsContent />
      </FinanceProvider>
    </EmotionProvider>
  );
};

export default EmotionInsights;
