import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";
import GodView from "@/pages/god-view";
import NotFound from "@/pages/not-found";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={GodView} />
      {/* Other routes render a coming-soon placeholder */}
      <Route path="/analytics" component={ComingSoon} />
      <Route path="/geography" component={ComingSoon} />
      <Route path="/retention" component={ComingSoon} />
      <Route path="/users" component={ComingSoon} />
      <Route path="/power-users" component={ComingSoon} />
      <Route path="/churn-risk" component={ComingSoon} />
      <Route path="/sdk-keys" component={ComingSoon} />
      <Route path="/settings" component={ComingSoon} />
      <Route path="/docs" component={ComingSoon} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ComingSoon() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">Coming soon</p>
        <p className="text-xs text-muted-foreground/60 mt-1">This view is under development</p>
      </div>
    </div>
  );
}

export default function App() {
  const style = {
    "--sidebar-width": "14rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 min-w-0">
              <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-semibold text-foreground">God View</h1>
                    <span className="text-[11px] text-muted-foreground/60">·</span>
                    <span className="text-[11px] text-muted-foreground">acme-saas</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                    <span className="text-[11px] font-medium text-emerald-400">Connected</span>
                  </span>
                </div>
              </header>
              <main className="flex-1 overflow-hidden">
                <Router hook={useHashLocation}>
                  <AppRouter />
                </Router>
              </main>
              <PerplexityAttribution />
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
