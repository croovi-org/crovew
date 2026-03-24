import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { MockUser } from "@/lib/mock-data";

const statusConfig = {
  online: { color: "bg-emerald-400", label: "Online" },
  away: { color: "bg-amber-400", label: "Away" },
  offline: { color: "bg-zinc-500", label: "Offline" },
};

const planColors = {
  free: "bg-zinc-600/50 text-zinc-300",
  pro: "bg-primary/15 text-primary",
  team: "bg-violet-500/15 text-violet-400",
};

interface LiveUsersProps {
  users: MockUser[];
}

export function LiveUsers({ users }: LiveUsersProps) {
  const [filter, setFilter] = useState<"all" | "online" | "away" | "offline">("all");

  const filteredUsers = useMemo(() => {
    if (filter === "all") return users;
    return users.filter((u) => u.status === filter);
  }, [users, filter]);

  const statusCounts = useMemo(() => {
    const counts = { online: 0, away: 0, offline: 0 };
    users.forEach((u) => counts[u.status]++);
    return counts;
  }, [users]);

  return (
    <Card className="flex flex-col h-full bg-card border-card-border overflow-hidden" data-testid="live-users-panel">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Live Users</h3>
        <span className="text-xs text-muted-foreground tabular-nums">
          {filteredUsers.length} users
        </span>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-1 px-3 py-2 border-b border-border">
        {(["all", "online", "away", "offline"] as const).map((s) => {
          const count = s === "all" ? users.length : statusCounts[s];
          const isActive = filter === s;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
              data-testid={`filter-${s}`}
            >
              {s !== "all" && (
                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[s].color}`} />
              )}
              <span className="capitalize">{s}</span>
              <span className="tabular-nums text-muted-foreground">{count}</span>
            </button>
          );
        })}
      </div>

      {/* User list */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-accent/30 transition-colors"
              data-testid={`user-row-${user.id}`}
            >
              <div className="relative">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-[11px] font-medium bg-muted text-muted-foreground">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${statusConfig[user.status].color}`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground truncate">
                    {user.name}
                  </span>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] px-1.5 py-0 h-4 font-medium ${planColors[user.plan]}`}
                  >
                    {user.plan}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="truncate">{user.currentPage}</span>
                  <span className="flex-shrink-0">·</span>
                  <span className="flex-shrink-0 tabular-nums">
                    {user.sessionDuration > 0 ? `${user.sessionDuration}m` : "—"}
                  </span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-[11px] text-muted-foreground">
                  {user.city}
                </div>
                <div className="text-[10px] text-muted-foreground/60 tabular-nums">
                  {user.daysSinceFirst}d ago
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
