import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  ChevronDown,
  ChevronUp,
  Activity,
  Zap
} from 'lucide-react';

interface DemoControlPanelProps {
  currentScenario: string;
  onScenarioChange: (scenario: string) => void;
  onReset: () => void;
  isPaused: boolean;
  onPauseToggle: () => void;
  activeAgents: string[];
}

const scenarios = [
  { 
    id: 'mobile-to-kiosk', 
    name: 'Mobile to In-Store Transition',
    description: 'Sarah browses on mobile, then completes at kiosk'
  },
  { 
    id: 'vip-journey', 
    name: 'VIP Customer Journey',
    description: 'Mark (Gold Tier) gets personalized service with upsells'
  },
  { 
    id: 'payment-failure', 
    name: 'Payment Failure Recovery',
    description: 'Handle declined payment with alternative methods'
  },
  { 
    id: 'out-of-stock', 
    name: 'Out of Stock Alternative',
    description: 'Recommend alternatives when item unavailable'
  },
  { 
    id: 'bundle-recommendation', 
    name: 'Personalized Bundle',
    description: 'AI suggests complementary products for bundle'
  }
];

const agentColors: Record<string, string> = {
  sales: 'bg-blue-500',
  recommendation: 'bg-purple-500',
  inventory: 'bg-green-500',
  payment: 'bg-yellow-500',
  fulfillment: 'bg-orange-500',
  loyalty: 'bg-pink-500',
  support: 'bg-cyan-500'
};

const agentNames: Record<string, string> = {
  sales: 'Sales Agent',
  recommendation: 'Recommendation Agent',
  inventory: 'Inventory Agent',
  payment: 'Payment Agent',
  fulfillment: 'Fulfillment Agent',
  loyalty: 'Loyalty & Offers Agent',
  support: 'Post-Purchase Support'
};

export default function DemoControlPanel({
  currentScenario,
  onScenarioChange,
  onReset,
  isPaused,
  onPauseToggle,
  activeAgents
}: DemoControlPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showScenarios, setShowScenarios] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96">
      <Card className="shadow-2xl border-2 border-primary/20 bg-card/95 backdrop-blur-sm">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Demo Controls</h3>
                <p className="text-xs text-muted-foreground">Presentation Mode</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          </div>

          {isExpanded && (
            <div className="space-y-4">
              {/* Scenario Selector */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Active Scenario
                </label>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setShowScenarios(!showScenarios)}
                >
                  <span className="text-sm">
                    {scenarios.find(s => s.id === currentScenario)?.name || 'Select Scenario'}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {showScenarios && (
                  <div className="space-y-1 p-2 bg-secondary/50 rounded-lg max-h-64 overflow-y-auto">
                    {scenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        onClick={() => {
                          onScenarioChange(scenario.id);
                          setShowScenarios(false);
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          currentScenario === scenario.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-secondary'
                        }`}
                      >
                        <div className="font-medium text-sm">{scenario.name}</div>
                        <div className="text-xs opacity-80 mt-1">
                          {scenario.description}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Playback Controls */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={onPauseToggle}
                >
                  {isPaused ? (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={onReset}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Active Agents Visualizer */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <label className="text-xs font-medium text-muted-foreground">
                    Active Agents
                  </label>
                </div>
                <div className="space-y-2">
                  {Object.entries(agentNames).map(([key, name]) => {
                    const isActive = activeAgents.includes(key);
                    return (
                      <div
                        key={key}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                          isActive
                            ? 'bg-primary/10 border border-primary/20'
                            : 'bg-secondary/30 opacity-50'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isActive ? agentColors[key] : 'bg-muted'
                          } ${isActive ? 'animate-pulse' : ''}`}
                        />
                        <span className="text-xs font-medium flex-1">{name}</span>
                        {isActive && (
                          <Badge variant="secondary" className="text-xs px-2 py-0">
                            <Zap className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                <div className="text-center p-2 bg-secondary/50 rounded-lg">
                  <div className="text-xl font-bold text-primary">
                    {activeAgents.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Active Now</div>
                </div>
                <div className="text-center p-2 bg-secondary/50 rounded-lg">
                  <div className="text-xl font-bold text-primary">
                    {Object.keys(agentNames).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Agents</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}