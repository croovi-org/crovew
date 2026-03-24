import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { HourlySession } from "@/lib/mock-data";

interface SessionsChartProps {
  data: HourlySession[];
}

function formatHour(hour: number): string {
  if (hour === 0) return "12a";
  if (hour === 12) return "12p";
  if (hour < 12) return `${hour}a`;
  return `${hour - 12}p`;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { hour, sessions } = payload[0].payload;
    return (
      <div className="bg-popover border border-popover-border rounded-md px-3 py-2 shadow-md">
        <p className="text-xs font-medium text-foreground">
          {formatHour(hour)} — {formatHour(hour + 1)}
        </p>
        <p className="text-xs text-muted-foreground tabular-nums">
          {sessions} sessions
        </p>
      </div>
    );
  }
  return null;
};

export function SessionsChart({ data }: SessionsChartProps) {
  const maxSessions = Math.max(...data.map((d) => d.sessions));

  return (
    <Card className="bg-card border-card-border overflow-hidden" data-testid="sessions-chart">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Sessions by Hour</h3>
        <span className="text-[11px] text-muted-foreground">Today</span>
      </div>

      <div className="px-2 py-3 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="15%">
            <XAxis
              dataKey="hour"
              tickFormatter={formatHour}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "hsl(var(--accent) / 0.3)" }}
            />
            <Bar
              dataKey="sessions"
              radius={[3, 3, 0, 0]}
            >
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.sessions > maxSessions * 0.7
                      ? "hsl(var(--primary))"
                      : entry.sessions > maxSessions * 0.4
                        ? "hsl(var(--primary) / 0.6)"
                        : "hsl(var(--primary) / 0.3)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
