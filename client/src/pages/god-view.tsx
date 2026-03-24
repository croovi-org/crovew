import { useState, useEffect, useCallback } from "react";
import { MetricCards } from "@/components/MetricCards";
import { LiveUsers } from "@/components/LiveUsers";
import { EventFeed } from "@/components/EventFeed";
import { GeoBreakdown } from "@/components/GeoBreakdown";
import { CohortHeatmap } from "@/components/CohortHeatmap";
import { SessionsChart } from "@/components/SessionsChart";
import {
  generateUsers,
  generateEvents,
  generateGeoData,
  generateCohortData,
  generateHourlySessions,
  generateSingleEvent,
  type MockUser,
  type MockEvent,
  type GeoData,
  type CohortRow,
  type HourlySession,
} from "@/lib/mock-data";

export default function GodView() {
  const [users] = useState<MockUser[]>(() => generateUsers(40));
  const [events, setEvents] = useState<MockEvent[]>(() => generateEvents(users, 30));
  const [geoData] = useState<GeoData[]>(() => generateGeoData());
  const [cohortData] = useState<CohortRow[]>(() => generateCohortData());
  const [hourlyData] = useState<HourlySession[]>(() => generateHourlySessions());

  // Simulate real-time events arriving
  const addNewEvent = useCallback(() => {
    const newEvent = generateSingleEvent(users);
    setEvents((prev) => [newEvent, ...prev.slice(0, 49)]);
  }, [users]);

  useEffect(() => {
    const interval = setInterval(addNewEvent, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, [addNewEvent]);

  return (
    <div className="h-full overflow-y-auto p-4 space-y-3" data-testid="god-view">
      {/* KPI Cards */}
      <MetricCards />

      {/* Main content: Live Users + Event Stream + Geo */}
      <div className="grid grid-cols-12 gap-3" style={{ height: "340px" }}>
        {/* Live Users Panel — wider */}
        <div className="col-span-5 min-h-0">
          <LiveUsers users={users} />
        </div>

        {/* Event Stream */}
        <div className="col-span-4 min-h-0">
          <EventFeed events={events} />
        </div>

        {/* Geographic Presence */}
        <div className="col-span-3 min-h-0">
          <GeoBreakdown data={geoData} />
        </div>
      </div>

      {/* Bottom row: Retention Heatmap + Sessions Chart */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7">
          <CohortHeatmap data={cohortData} />
        </div>
        <div className="col-span-5">
          <SessionsChart data={hourlyData} />
        </div>
      </div>
    </div>
  );
}
