
import React, { useState } from 'react';
import Header from '../components/Header';
import { EmotionProvider } from '../context/EmotionContext';
import { FinanceProvider } from '../context/FinanceContext';
import { TrendingUp, Search, Clock, ArrowUpRight, ArrowDownRight, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

// Mock stock data for demo purposes
const mockStocks = [
  { 
    symbol: 'AAPL', 
    name: 'Apple Inc.', 
    price: 178.72, 
    change: 2.34, 
    changePercent: 1.32,
    recommendation: 'Buy',
    aiConfidence: 87,
    history: [160, 162, 165, 169, 172, 171, 175, 177, 179, 178.72],
  },
  { 
    symbol: 'MSFT', 
    name: 'Microsoft Corporation', 
    price: 412.65, 
    change: -3.21, 
    changePercent: -0.77,
    recommendation: 'Hold',
    aiConfidence: 65,
    history: [400, 405, 410, 418, 415, 417, 416, 413, 410, 412.65],
  },
  { 
    symbol: 'GOOGL', 
    name: 'Alphabet Inc.', 
    price: 142.08, 
    change: 1.15, 
    changePercent: 0.82,
    recommendation: 'Buy',
    aiConfidence: 92,
    history: [136, 137, 139, 138, 140, 141, 139, 138, 141, 142.08],
  },
  { 
    symbol: 'AMZN', 
    name: 'Amazon.com Inc.', 
    price: 178.12, 
    change: -2.45, 
    changePercent: -1.36,
    recommendation: 'Sell',
    aiConfidence: 75,
    history: [185, 184, 182, 180, 178, 176, 177, 179, 181, 178.12],
  },
  { 
    symbol: 'TSLA', 
    name: 'Tesla, Inc.', 
    price: 235.45, 
    change: 12.78, 
    changePercent: 5.74,
    recommendation: 'Strong Buy',
    aiConfidence: 95,
    history: [210, 215, 218, 220, 225, 230, 228, 232, 233, 235.45],
  },
];

const StockMarket = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState(mockStocks[0]);
  const { toast } = useToast();
  
  const filteredStocks = mockStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return;
    }
    
    const found = mockStocks.find(stock => 
      stock.symbol.toLowerCase() === searchQuery.toLowerCase() ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (found) {
      setSelectedStock(found);
      toast({
        title: "Stock Found",
        description: `Displaying information for ${found.name} (${found.symbol})`,
      });
    } else {
      toast({
        title: "Stock Not Found",
        description: "Please try another symbol or company name",
        variant: "destructive",
      });
    }
  };
  
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
                    <TrendingUp className="w-8 h-8" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-4">
                  Stock Market Predictions
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Get AI-powered market analysis and personalized investment suggestions.
                </p>
              </div>
              
              <div className="mb-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Search Stocks</CardTitle>
                    <CardDescription>Look up stocks by symbol or company name</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSearch} className="flex gap-2">
                      <Input
                        placeholder="Search by symbol or name (e.g., AAPL, Apple)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit">
                        <Search className="h-4 w-4 mr-2" /> Search
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Stock Details */}
                <div className="lg:col-span-2">
                  <Card className="glass-card h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{selectedStock.name}</CardTitle>
                          <CardDescription>{selectedStock.symbol}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">${selectedStock.price.toFixed(2)}</div>
                          <div className={`flex items-center ${selectedStock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {selectedStock.change >= 0 ? (
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 mr-1" />
                            )}
                            <span>${Math.abs(selectedStock.change).toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Stock Chart</h3>
                        <div className="bg-card rounded-lg p-4">
                          <div className="h-64 flex items-end space-x-2">
                            {selectedStock.history.map((value, index) => (
                              <div 
                                key={index} 
                                className="bg-primary flex-1 rounded-t-sm"
                                style={{ 
                                  height: `${(value / Math.max(...selectedStock.history)) * 100}%`,
                                  opacity: 0.3 + ((index / selectedStock.history.length) * 0.7)
                                }}
                              ></div>
                            ))}
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>10 days ago</span>
                            <span>Today</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Key Metrics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="bg-secondary/20 p-3 rounded-lg">
                            <div className="text-sm text-muted-foreground">52 Week High</div>
                            <div className="font-medium">${(selectedStock.price * 1.2).toFixed(2)}</div>
                          </div>
                          <div className="bg-secondary/20 p-3 rounded-lg">
                            <div className="text-sm text-muted-foreground">52 Week Low</div>
                            <div className="font-medium">${(selectedStock.price * 0.8).toFixed(2)}</div>
                          </div>
                          <div className="bg-secondary/20 p-3 rounded-lg">
                            <div className="text-sm text-muted-foreground">Market Cap</div>
                            <div className="font-medium">$1.3T</div>
                          </div>
                          <div className="bg-secondary/20 p-3 rounded-lg">
                            <div className="text-sm text-muted-foreground">P/E Ratio</div>
                            <div className="font-medium">28.5</div>
                          </div>
                          <div className="bg-secondary/20 p-3 rounded-lg">
                            <div className="text-sm text-muted-foreground">Dividend Yield</div>
                            <div className="font-medium">0.5%</div>
                          </div>
                          <div className="bg-secondary/20 p-3 rounded-lg">
                            <div className="text-sm text-muted-foreground">Volume</div>
                            <div className="font-medium">12.8M</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* AI Analysis */}
                <div>
                  <Card className="glass-card h-full">
                    <CardHeader>
                      <CardTitle className="text-xl">AI Analysis</CardTitle>
                      <CardDescription>Personalized investment recommendations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Recommendation</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedStock.recommendation === 'Buy' || selectedStock.recommendation === 'Strong Buy' 
                              ? 'bg-green-500/20 text-green-500' 
                              : selectedStock.recommendation === 'Sell' 
                                ? 'bg-red-500/20 text-red-500' 
                                : 'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {selectedStock.recommendation}
                          </span>
                        </div>
                        <div className="bg-secondary/20 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <LineChart className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">AI Confidence: {selectedStock.aiConfidence}%</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {selectedStock.recommendation === 'Buy' || selectedStock.recommendation === 'Strong Buy'
                              ? `Our AI analysis suggests strong growth potential for ${selectedStock.name} based on recent market trends and company performance metrics.`
                              : selectedStock.recommendation === 'Sell'
                                ? `Current indicators suggest potential downside risk for ${selectedStock.name}. Consider reallocating assets to more stable investments.`
                                : `${selectedStock.name} shows mixed signals. Maintain current positions but monitor closely for changes in market conditions.`
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Recent News</h3>
                        <div className="space-y-3">
                          <div className="flex gap-3 items-start bg-secondary/10 p-3 rounded-lg">
                            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm">{selectedStock.name} reports better than expected quarterly results</p>
                              <p className="text-xs text-muted-foreground">2 hours ago</p>
                            </div>
                          </div>
                          <div className="flex gap-3 items-start bg-secondary/10 p-3 rounded-lg">
                            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm">Analysts upgrade {selectedStock.name} to "outperform"</p>
                              <p className="text-xs text-muted-foreground">1 day ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        Add to Watchlist
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Tabs defaultValue="top-stocks">
                <TabsList className="w-full grid grid-cols-3 mb-6">
                  <TabsTrigger value="top-stocks">Top Stocks</TabsTrigger>
                  <TabsTrigger value="ai-picks">AI Picks</TabsTrigger>
                  <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
                </TabsList>
                
                <TabsContent value="top-stocks">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredStocks.map((stock) => (
                      <div 
                        key={stock.symbol} 
                        className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-4 cursor-pointer hover:bg-accent/10"
                        onClick={() => setSelectedStock(stock)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">{stock.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${stock.price.toFixed(2)}</div>
                            <div className={`text-sm flex items-center justify-end ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {stock.change >= 0 ? (
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 mr-1" />
                              )}
                              <span>{stock.changePercent.toFixed(2)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="ai-picks">
                  <div className="glass-card rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4">AI-Recommended Investments</h3>
                    <div className="space-y-4">
                      {mockStocks
                        .filter(stock => stock.recommendation === 'Buy' || stock.recommendation === 'Strong Buy')
                        .map(stock => (
                          <div 
                            key={stock.symbol}
                            className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg cursor-pointer hover:bg-accent/10"
                            onClick={() => setSelectedStock(stock)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                {stock.symbol.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{stock.name}</div>
                                <div className="text-sm text-muted-foreground">{stock.symbol}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-green-500">
                                <ArrowUpRight className="h-4 w-4 mr-1" />
                                <span>AI Score: {stock.aiConfidence}%</span>
                              </div>
                              <div className="text-sm">${stock.price.toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="watchlist">
                  <div className="text-center p-12 bg-secondary/20 rounded-lg">
                    <div className="text-3xl mb-2">📊</div>
                    <h3 className="text-lg font-medium mb-2">Your Watchlist is Empty</h3>
                    <p className="text-muted-foreground mb-4">Start adding stocks to track their performance</p>
                    <Button>Add Your First Stock</Button>
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
      </FinanceProvider>
    </EmotionProvider>
  );
};

export default StockMarket;
