/* Signal Atelier style: one focused editorial route with clear escape paths and content-first navigation. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Vite's relative base allows this bundle to be served from either the custom
// domain root or the GitHub Pages project subpath. Derive Wouter's base from
// the emitted entry chunk so `/new-ui/` maps to the application's `/` route.
const routerBase = new URL(import.meta.url).pathname.replace(/\/assets\/[^/]+$/, "/");

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <WouterRouter base={routerBase}>
            <Routes />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
