import { Card } from "@/components/ui/card";
import type { GeoData } from "@/lib/mock-data";

interface GeoBreakdownProps {
  data: GeoData[];
}

const barColors = [
  "bg-primary",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
];

function getBarColor(index: number): string {
  return barColors[index % barColors.length];
}

export function GeoBreakdown({ data }: GeoBreakdownProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <Card className="flex flex-col h-full bg-card border-card-border overflow-hidden" data-testid="geo-breakdown">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Geographic Presence</h3>
        <span className="text-xs text-muted-foreground tabular-nums">
          {total.toLocaleString()} total
        </span>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 px-4 py-3 space-y-2.5">
        {data.map((geo, i) => (
          <div key={geo.country} data-testid={`geo-row-${geo.country.replace(/\s/g, "-").toLowerCase()}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-foreground">
                {geo.country}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground tabular-nums">
                  {geo.count}
                </span>
                <span className="text-[11px] text-muted-foreground/60 tabular-nums w-10 text-right">
                  {geo.percentage}%
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full ${getBarColor(i)} transition-all duration-700 ease-out`}
                style={{ width: `${(geo.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
