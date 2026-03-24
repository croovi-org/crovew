import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Eye, LogIn, ArrowUpCircle, Download, UserPlus,
  Settings, CheckCircle, FileText, Key, Users
} from "lucide-react";
import type { MockEvent } from "@/lib/mock-data";

const eventIcons: Record<string, typeof Eye> = {
  page_view: Eye,
  login: LogIn,
  upgrade: ArrowUpCircle,
  export: Download,
  invite_sent: UserPlus,
  settings_change: Settings,
  onboarding_complete: CheckCircle,
  report_generated: FileText,
  api_key_created: Key,
  team_member_added: Users,
};

const eventColors: Record<string, string> = {
  page_view: "text-blue-400",
  login: "text-emerald-400",
  upgrade: "text-primary",
  export: "text-amber-400",
  invite_sent: "text-violet-400",
  settings_change: "text-zinc-400",
  onboarding_complete: "text-emerald-400",
  report_generated: "text-blue-400",
  api_key_created: "text-amber-400",
  team_member_added: "text-violet-400",
};

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

interface EventFeedProps {
  events: MockEvent[];
}

export function EventFeed({ events }: EventFeedProps) {
  return (
    <Card className="flex flex-col h-full bg-card border-card-border overflow-hidden" data-testid="event-feed">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Event Stream</h3>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          <span className="text-[10px] text-emerald-400 font-medium">LIVE</span>
        </span>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {events.map((event, i) => {
            const Icon = eventIcons[event.eventType] || Eye;
            const iconColor = eventColors[event.eventType] || "text-muted-foreground";

            return (
              <div
                key={event.id}
                className={`flex items-center gap-3 px-4 py-2.5 hover:bg-accent/30 transition-colors ${
                  i === 0 ? "animate-slide-in" : ""
                }`}
                data-testid={`event-row-${event.id}`}
              >
                <div className={`flex-shrink-0 ${iconColor}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-foreground truncate">
                      {event.userName}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {event.eventLabel}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground/60 font-mono truncate">
                    {event.path}
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground/50 tabular-nums flex-shrink-0">
                  {formatTimeAgo(event.timestamp)}
                </span>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}
