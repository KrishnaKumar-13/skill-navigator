import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Roadmaps from "./pages/Roadmaps";
import RoadmapDetail from "./pages/RoadmapDetail";
import DailyTasks from "./pages/DailyTasks";
import Achievements from "./pages/Achievements";
import Resources from "./pages/Resources";
import ProgressTracker from "./pages/ProgressTracker";
import PersonalizedPaths from "./pages/PersonalizedPaths";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route path="/roadmap/:slug" element={<RoadmapDetail />} />
            <Route path="/daily-tasks" element={<DailyTasks />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/progress" element={<ProgressTracker />} />
            <Route path="/personalized" element={<PersonalizedPaths />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
