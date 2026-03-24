// Mock data generators for CroVew dashboard

const firstNames = [
  "Sarah", "James", "Priya", "Marcus", "Elena", "Chen", "Aisha", "Oliver",
  "Maya", "Diego", "Yuki", "Alex", "Fatima", "Raj", "Luna", "Noah",
  "Zara", "Liam", "Sophie", "Kai", "Emma", "Arjun", "Chloe", "Hassan",
  "Isabella", "Ethan", "Mia", "Ravi", "Olivia", "Lucas"
];

const lastNames = [
  "Chen", "Patel", "Kim", "Singh", "Anderson", "Martinez", "Tanaka", "Williams",
  "Das", "Johnson", "Müller", "Garcia", "Nakamura", "Brown", "Shah", "Lee",
  "Fernández", "Wilson", "Gupta", "Taylor", "Sato", "Moore", "Khan", "Davis",
  "Thompson", "White", "Clark", "Hall", "Young", "Walker"
];

const pages = [
  "/dashboard", "/settings", "/billing", "/reports", "/users",
  "/integrations", "/api-keys", "/profile", "/analytics", "/exports",
  "/team", "/onboarding", "/docs", "/support", "/notifications"
];

const cities = [
  { city: "San Francisco", country: "United States" },
  { city: "London", country: "United Kingdom" },
  { city: "Bangalore", country: "India" },
  { city: "Toronto", country: "Canada" },
  { city: "Berlin", country: "Germany" },
  { city: "Tokyo", country: "Japan" },
  { city: "São Paulo", country: "Brazil" },
  { city: "Sydney", country: "Australia" },
  { city: "Singapore", country: "Singapore" },
  { city: "Amsterdam", country: "Netherlands" },
  { city: "Dubai", country: "UAE" },
  { city: "Lagos", country: "Nigeria" },
  { city: "Seoul", country: "South Korea" },
  { city: "Mumbai", country: "India" },
  { city: "Paris", country: "France" },
];

const plans: Array<"free" | "pro" | "team"> = ["free", "pro", "team"];
const statuses: Array<"online" | "away" | "offline"> = ["online", "away", "offline"];

const eventTypes = [
  { type: "page_view", label: "Page View" },
  { type: "login", label: "Login" },
  { type: "upgrade", label: "Upgrade" },
  { type: "export", label: "Export" },
  { type: "invite_sent", label: "Invite Sent" },
  { type: "settings_change", label: "Settings Change" },
  { type: "onboarding_complete", label: "Onboarding Complete" },
  { type: "report_generated", label: "Report Generated" },
  { type: "api_key_created", label: "API Key Created" },
  { type: "team_member_added", label: "Team Member Added" },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export interface MockUser {
  id: string;
  name: string;
  email: string;
  status: "online" | "away" | "offline";
  currentPage: string;
  sessionDuration: number; // minutes
  daysSinceFirst: number;
  plan: "free" | "pro" | "team";
  city: string;
  country: string;
  avatar: string;
}

export interface MockEvent {
  id: string;
  userId: string;
  userName: string;
  eventType: string;
  eventLabel: string;
  path: string;
  timestamp: Date;
}

export interface GeoData {
  country: string;
  count: number;
  percentage: number;
}

export interface CohortRow {
  cohort: string;
  users: number;
  retention: number[]; // D0, D1, D3, D7, D14, D21, D30
}

export interface HourlySession {
  hour: number;
  sessions: number;
}

let userIdCounter = 0;
let eventIdCounter = 0;

export function generateUsers(count: number): MockUser[] {
  const users: MockUser[] = [];
  for (let i = 0; i < count; i++) {
    const firstName = pick(firstNames);
    const lastName = pick(lastNames);
    const loc = pick(cities);
    const status = Math.random() < 0.4 ? "online" : Math.random() < 0.6 ? "away" : "offline";
    users.push({
      id: `usr_${++userIdCounter}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      status,
      currentPage: pick(pages),
      sessionDuration: status === "offline" ? 0 : rand(1, 180),
      daysSinceFirst: rand(1, 365),
      plan: pick(plans),
      city: loc.city,
      country: loc.country,
      avatar: `${firstName[0]}${lastName[0]}`,
    });
  }
  return users;
}

export function generateEvents(users: MockUser[], count: number): MockEvent[] {
  const events: MockEvent[] = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const user = pick(users);
    const evt = pick(eventTypes);
    events.push({
      id: `evt_${++eventIdCounter}`,
      userId: user.id,
      userName: user.name,
      eventType: evt.type,
      eventLabel: evt.label,
      path: pick(pages),
      timestamp: new Date(now - rand(0, 3600000)), // within last hour
    });
  }
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function generateGeoData(): GeoData[] {
  const countries = [
    { country: "United States", count: rand(280, 340) },
    { country: "India", count: rand(180, 240) },
    { country: "United Kingdom", count: rand(90, 130) },
    { country: "Germany", count: rand(70, 100) },
    { country: "Canada", count: rand(60, 90) },
    { country: "Japan", count: rand(50, 80) },
    { country: "Brazil", count: rand(40, 70) },
    { country: "Australia", count: rand(30, 55) },
    { country: "France", count: rand(25, 45) },
    { country: "Nigeria", count: rand(20, 40) },
    { country: "South Korea", count: rand(15, 35) },
    { country: "Netherlands", count: rand(10, 25) },
  ];
  const total = countries.reduce((sum, c) => sum + c.count, 0);
  return countries.map((c) => ({
    ...c,
    percentage: Math.round((c.count / total) * 1000) / 10,
  }));
}

export function generateCohortData(): CohortRow[] {
  const weeks = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"];
  return weeks.map((cohort, i) => {
    const users = rand(80, 200);
    // Retention naturally decays, with some variance
    const d0 = 100;
    const d1 = rand(72, 88);
    const d3 = rand(55, 70);
    const d7 = rand(38, 55);
    const d14 = rand(25, 42);
    const d21 = rand(18, 32);
    const d30 = rand(12, 25);
    return {
      cohort,
      users,
      retention: [d0, d1, d3, d7, d14, d21, d30],
    };
  });
}

export function generateHourlySessions(): HourlySession[] {
  return Array.from({ length: 24 }, (_, hour) => {
    // Simulate realistic traffic pattern: low at night, peaks in morning and afternoon
    let base = 20;
    if (hour >= 8 && hour <= 11) base = rand(60, 120);
    else if (hour >= 12 && hour <= 14) base = rand(80, 140);
    else if (hour >= 15 && hour <= 18) base = rand(90, 150);
    else if (hour >= 19 && hour <= 22) base = rand(50, 100);
    else if (hour >= 6 && hour <= 7) base = rand(30, 60);
    else base = rand(10, 35);
    return { hour, sessions: base };
  });
}

export function generateSparklineData(length: number = 12, base: number = 50, variance: number = 20): number[] {
  return Array.from({ length }, () => base + rand(-variance, variance));
}

// Generate a new random event for real-time simulation
export function generateSingleEvent(users: MockUser[]): MockEvent {
  const user = pick(users);
  const evt = pick(eventTypes);
  return {
    id: `evt_${++eventIdCounter}`,
    userId: user.id,
    userName: user.name,
    eventType: evt.type,
    eventLabel: evt.label,
    path: pick(pages),
    timestamp: new Date(),
  };
}
