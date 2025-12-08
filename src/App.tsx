/**
 * Main Application Component
 * 
 * This is the root component that sets up:
 * - React Query for data fetching and caching
 * - Toast notifications (Toaster and Sonner)
 * - Tooltip provider for UI tooltips
 * - React Router for navigation
 * - Authentication Provider
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Page imports
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Portfolios from "./pages/Portfolios";
import Templates from "./pages/Templates";
import TemplateEditor from "./pages/TemplateEditor";
import PublicPortfolio from "./pages/PublicPortfolio";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Subscriptions from "./pages/Subscriptions";
import NotFound from "./pages/NotFound";

// Initialize React Query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/portfolio/:portfolioId" element={<PublicPortfolio />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/portfolios" element={<Portfolios />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/editor/template/:templateId" element={<TemplateEditor />} />
            <Route path="/editor/portfolio/:portfolioId" element={<TemplateEditor />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            
            {/* 404 catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
