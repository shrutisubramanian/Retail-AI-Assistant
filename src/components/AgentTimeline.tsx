import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  User, 
  Bot,
  ShoppingBag,
  Package,
  CreditCard,
  Truck,
  Gift,
  Headphones
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: 'user' | 'sales' | 'recommendation' | 'inventory' | 'payment' | 'fulfillment' | 'loyalty' | 'support';
  action: string;
  timestamp: Date;
  details?: string;
}

interface AgentTimelineProps {
  events: TimelineEvent[];
  showDetails?: boolean;
}

const agentIcons: Record<string, React.ReactNode> = {
  user: <User className="h-4 w-4" />,
  sales: <Bot className="h-4 w-4" />,
  recommendation: <ShoppingBag className="h-4 w-4" />,
  inventory: <Package className="h-4 w-4" />,
  payment: <CreditCard className="h-4 w-4" />,
  fulfillment: <Truck className="h-4 w-4" />,
  loyalty: <Gift className="h-4 w-4" />,
  support: <Headphones className="h-4 w-4" />
};

const agentColors: Record<string, { bg: string; text: string; border: string }> = {
  user: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
  sales: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  recommendation: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  inventory: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  payment: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  fulfillment: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  loyalty: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300' },
  support: { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-300' }
};

const agentLabels: Record<string, string> = {
  user: 'Customer',
  sales: 'Sales Agent',
  recommendation: 'Recommendation',
  inventory: 'Inventory',
  payment: 'Payment',
  fulfillment: 'Fulfillment',
  loyalty: 'Loyalty',
  support: 'Support'
};

export default function AgentTimeline({ events, showDetails = true }: AgentTimelineProps) {
  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Agent Orchestration Flow</h3>
            <p className="text-xs text-muted-foreground">
              Real-time agent activity and task delegation
            </p>
          </div>
        </div>

        <div className="relative space-y-4">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10" />

          {events.map((event, index) => {
            const colors = agentColors[event.type];
            const isLastEvent = index === events.length - 1;

            return (
              <div key={event.id} className="relative pl-16 animate-fade-in">
                {/* Agent Icon */}
                <div
                  className={`absolute left-0 flex items-center justify-center w-12 h-12 rounded-full ${colors.bg} ${colors.border} border-2`}
                >
                  {agentIcons[event.type]}
                </div>

                {/* Event Card */}
                <div
                  className={`p-4 rounded-lg border-2 ${colors.border} ${colors.bg} ${
                    isLastEvent ? 'ring-2 ring-primary/20 ring-offset-2' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`${colors.text} text-xs`}>
                        {agentLabels[event.type]}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {event.timestamp.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  <p className="font-medium text-sm mb-1">{event.action}</p>
                  
                  {showDetails && event.details && (
                    <p className="text-xs text-muted-foreground mt-2 pl-3 border-l-2 border-current">
                      {event.details}
                    </p>
                  )}
                </div>

                {/* Arrow to next event */}
                {!isLastEvent && (
                  <div className="absolute left-6 -bottom-2 flex items-center justify-center w-0 h-0">
                    <ArrowRight className="h-4 w-4 text-primary/50 rotate-90" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{events.length}</div>
            <div className="text-xs text-muted-foreground">Total Events</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {new Set(events.map(e => e.type)).size - 1}
            </div>
            <div className="text-xs text-muted-foreground">Agents Used</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(
                (events[events.length - 1]?.timestamp.getTime() -
                  events[0]?.timestamp.getTime()) /
                  1000
              )}s
            </div>
            <div className="text-xs text-muted-foreground">Duration</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}