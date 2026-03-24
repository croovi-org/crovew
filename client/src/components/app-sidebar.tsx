import {
  Eye, BarChart3, Globe, Grid3X3, Users, Zap, AlertTriangle,
  Key, Settings, FileText
} from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { CroVewLogo } from "./CroVewLogo";

const viewItems = [
  { title: "God View", url: "/", icon: Eye },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Geography", url: "/geography", icon: Globe },
  { title: "Retention", url: "/retention", icon: Grid3X3 },
];

const userItems = [
  { title: "All Users", url: "/users", icon: Users },
  { title: "Power Users", url: "/power-users", icon: Zap },
  { title: "Churn Risk", url: "/churn-risk", icon: AlertTriangle },
];

const configItems = [
  { title: "SDK Keys", url: "/sdk-keys", icon: Key },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Docs", url: "/docs", icon: FileText },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center gap-2.5">
          <CroVewLogo className="w-7 h-7 text-primary" />
          <div>
            <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
              CroVew
            </span>
            <span className="ml-1.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">
              BETA
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-muted-foreground/60 font-medium">
            Views
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {viewItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-muted-foreground/60 font-medium">
            Users
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-muted-foreground/60 font-medium">
            Config
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {configItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-3">
        <div className="text-[11px] text-muted-foreground/50">
          Project: acme-saas
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
