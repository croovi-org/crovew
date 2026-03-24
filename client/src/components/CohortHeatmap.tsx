import { Card } from "@/components/ui/card";
import type { CohortRow } from "@/lib/mock-data";

interface CohortHeatmapProps {
  data: CohortRow[];
}

const dayLabels = ["D0", "D1", "D3", "D7", "D14", "D21", "D30"];

function getRetentionColor(value: number): string {
  // Teal-based gradient: higher retention = more saturated/darker teal
  if (value >= 80) return "bg-primary/90 text-primary-foreground";
  if (value >= 60) return "bg-primary/70 text-primary-foreground";
  if (value >= 45) return "bg-primary/50 text-foreground";
  if (value >= 30) return "bg-primary/30 text-foreground";
  if (value >= 20) return "bg-primary/20 text-foreground";
  if (value >= 10) return "bg-primary/10 text-muted-foreground";
  return "bg-muted text-muted-foreground";
}

export function CohortHeatmap({ data }: CohortHeatmapProps) {
  return (
    <Card className="bg-card border-card-border overflow-hidden" data-testid="cohort-heatmap">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Retention Cohorts</h3>
        <span className="text-[11px] text-muted-foreground">Weekly cohorts</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-[11px] font-medium text-muted-foreground text-left px-4 py-2 w-16">
                Cohort
              </th>
              <th className="text-[11px] font-medium text-muted-foreground text-right px-2 py-2 w-14">
                Users
              </th>
              {dayLabels.map((d) => (
                <th
                  key={d}
                  className="text-[11px] font-medium text-muted-foreground text-center px-1 py-2 w-14"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.cohort} className="border-b border-border last:border-0">
                <td className="text-xs font-medium text-foreground px-4 py-1.5">
                  {row.cohort}
                </td>
                <td className="text-xs text-muted-foreground text-right px-2 py-1.5 tabular-nums">
                  {row.users}
                </td>
                {row.retention.map((val, i) => (
                  <td key={i} className="px-1 py-1.5">
                    <div
                      className={`text-[11px] font-medium tabular-nums text-center py-1.5 rounded-md ${getRetentionColor(val)}`}
                    >
                      {val}%
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
