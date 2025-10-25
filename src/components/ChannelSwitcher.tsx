import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Monitor, 
  MessageSquare,
  Store,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

type Channel = 'mobile' | 'kiosk' | 'whatsapp' | 'web';

interface ChannelSwitcherProps {
  currentChannel: Channel;
  onChannelChange: (channel: Channel) => void;
  showTransition?: boolean;
}

const channels = [
  {
    id: 'mobile' as Channel,
    name: 'Mobile App',
    icon: Smartphone,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    description: 'iOS/Android App'
  },
  {
    id: 'web' as Channel,
    name: 'Web Chat',
    icon: MessageSquare,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    description: 'Desktop Browser'
  },
  {
    id: 'whatsapp' as Channel,
    name: 'WhatsApp',
    icon: MessageSquare,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    description: 'Messaging App'
  },
  {
    id: 'kiosk' as Channel,
    name: 'In-Store Kiosk',
    icon: Store,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    description: 'Physical Store'
  }
];

export default function ChannelSwitcher({
  currentChannel,
  onChannelChange,
  showTransition = true
}: ChannelSwitcherProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetChannel, setTargetChannel] = useState<Channel | null>(null);

  const handleChannelSwitch = (newChannel: Channel) => {
    if (newChannel === currentChannel) return;

    if (showTransition) {
      setIsTransitioning(true);
      setTargetChannel(newChannel);

      setTimeout(() => {
        onChannelChange(newChannel);
        setTimeout(() => {
          setIsTransitioning(false);
          setTargetChannel(null);
        }, 1000);
      }, 1500);
    } else {
      onChannelChange(newChannel);
    }
  };

  const currentChannelData = channels.find(c => c.id === currentChannel);
  const targetChannelData = channels.find(c => c.id === targetChannel);

  return (
    <div className="space-y-4">
      {/* Current Channel Indicator */}
      <Card className="shadow-lg border-2 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${currentChannelData?.bgColor}`}>
                {currentChannelData?.icon && (
                  <currentChannelData.icon className={`h-5 w-5 ${currentChannelData.color}`} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{currentChannelData?.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {currentChannelData?.description}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Channel Transition Animation */}
      {isTransitioning && targetChannelData && (
        <Card className="shadow-glow border-2 border-accent animate-fade-in">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${currentChannelData?.bgColor}`}>
                    {currentChannelData?.icon && (
                      <currentChannelData.icon className={`h-6 w-6 ${currentChannelData.color}`} />
                    )}
                  </div>
                  <ArrowRight className="h-6 w-6 text-accent animate-pulse" />
                  <div className={`p-3 rounded-lg ${targetChannelData.bgColor}`}>
                    <targetChannelData.icon className={`h-6 w-6 ${targetChannelData.color}`} />
                  </div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold text-accent">
                  Switching to {targetChannelData.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Preserving your conversation context...
                </p>
                <div className="flex justify-center gap-1 mt-4">
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Channels */}
      {!isTransitioning && (
        <div className="grid grid-cols-2 gap-3">
          {channels
            .filter(channel => channel.id !== currentChannel)
            .map((channel) => (
              <Button
                key={channel.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 hover:border-primary hover:bg-primary/5"
                onClick={() => handleChannelSwitch(channel.id)}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className={`p-2 rounded-lg ${channel.bgColor}`}>
                    <channel.icon className={`h-4 w-4 ${channel.color}`} />
                  </div>
                  <span className="font-medium text-sm">{channel.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Switch to {channel.description.toLowerCase()}
                </span>
              </Button>
            ))}
        </div>
      )}

      {/* Context Preservation Notice */}
      <Card className="bg-secondary/50 border-dashed">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground text-center">
            💡 Your conversation history and cart items are preserved across all channels
          </p>
        </CardContent>
      </Card>
    </div>
  );
}