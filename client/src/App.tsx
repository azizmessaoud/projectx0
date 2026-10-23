/* Signal Atelier style: one focused editorial route with clear escape paths and content-first navigation. */
import { lazy, Suspense } from "react";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// The 404 page and its UI components load only when that route is hit.
const NotFound = lazy(() => import("@/pages/NotFound"));

// Vite's relative base allows this bundle to be served from either the custom
// domain root or the GitHub Pages project subpath. Derive Wouter's base from
// the emitted entry chunk so `/new-ui/` maps to the application's `/` route.
const routerBase = ["/", "./"].includes(import.meta.env.BASE_URL)
  ? ""
  : import.meta.env.BASE_URL.replace(/\/$/, "");

function Routes() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <WouterRouter base={routerBase}>
          <Routes />
        </WouterRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
