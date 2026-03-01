import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import InfluencersPage from "./pages/InfluencersPage";
import InfluencerProfile from "./pages/InfluencerProfile";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import AIMatchingPage from "./pages/AIMatchingPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import RequestsPage from "./pages/RequestsPage";
import BookingsPage from "./pages/BookingsPage";
import { AuthModal } from "./components/auth/AuthModal";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="influencers" element={<InfluencersPage />} />
          <Route path="influencer/:id" element={<InfluencerProfile />} />
          <Route path="ai-matching" element={<AIMatchingPage />} />
          <Route path="ai-assistant" element={<AIAssistantPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="admin" element={<div className="p-20 text-center"><h1 className="text-4xl font-display font-bold mb-4">Admin Command Center</h1><p className="text-muted-foreground">Authorized personnel only. This feature is currently in production.</p></div>} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AuthModal />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="influencematch-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
