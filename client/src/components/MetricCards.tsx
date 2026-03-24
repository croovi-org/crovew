import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { generateSparklineData } from "@/lib/mock-data";

interface MetricCardProps {
  label: string;
  value: string | number;
  delta?: number; // percentage change
  sparkData: number[];
  isLive?: boolean;
  suffix?: string;
}

function Sparkline({ data, color = "hsl(var(--chart-1))" }: { data: number[]; color?: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const padding = 2;

  const points = data
    .map((v, i) => {
      const x = padding + (i / (data.length - 1)) * (w - padding * 2);
      const y = h - padding - ((v - min) / range) * (h - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  // Area fill
  const firstX = padding;
  const lastX = padding + ((data.length - 1) / (data.length - 1)) * (w - padding * 2);
  const areaPoints = `${firstX},${h} ${points} ${lastX},${h}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="flex-shrink-0">
      <defs>
        <linearGradient id={`spark-grad-${color.replace(/[^a-z0-9]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#spark-grad-${color.replace(/[^a-z0-9]/gi, "")})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetricCard({ label, value, delta, sparkData, isLive, suffix }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const deltaColor =
    delta === undefined || delta === 0
      ? "text-muted-foreground"
      : delta > 0
        ? "text-emerald-400"
        : "text-red-400";

  const DeltaIcon =
    delta === undefined || delta === 0
      ? Minus
      : delta > 0
        ? TrendingUp
        : TrendingDown;

  return (
    <Card
      className="p-4 bg-card border-card-border"
      data-testid={`metric-${label.toLowerCase().replace(/\s/g, "-")}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
            {isLive && (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                <span className="text-[10px] text-emerald-400 font-medium">LIVE</span>
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold tabular-nums text-foreground">
              {displayValue}
              {suffix && <span className="text-sm text-muted-foreground ml-0.5">{suffix}</span>}
            </span>
            {delta !== undefined && (
              <span className={`flex items-center gap-0.5 text-xs font-medium ${deltaColor}`}>
                <DeltaIcon className="w-3 h-3" />
                {Math.abs(delta)}%
              </span>
            )}
          </div>
        </div>
        <Sparkline data={sparkData} />
      </div>
    </Card>
  );
}

export function MetricCards() {
  const [activeNow, setActiveNow] = useState(147);
  const [sparkActive] = useState(() => generateSparklineData(12, 140, 30));
  const [sparkDau] = useState(() => generateSparklineData(12, 1200, 200));
  const [sparkRetention] = useState(() => generateSparklineData(12, 42, 8));
  const [sparkSession] = useState(() => generateSparklineData(12, 8, 3));

  // Simulate live active user count
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNow((prev) => {
        const change = Math.floor(Math.random() * 7) - 3;
        return Math.max(80, Math.min(200, prev + change));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3" data-testid="metric-cards">
      <MetricCard
        label="Active Now"
        value={activeNow}
        sparkData={sparkActive}
        isLive
        delta={12}
      />
      <MetricCard
        label="DAU"
        value="1,247"
        sparkData={sparkDau}
        delta={8}
      />
      <MetricCard
        label="7d Retention"
        value="42.3"
        suffix="%"
        sparkData={sparkRetention}
        delta={-2}
      />
      <MetricCard
        label="Avg Session"
        value="8m 24s"
        sparkData={sparkSession}
        delta={5}
      />
    </div>
  );
}
