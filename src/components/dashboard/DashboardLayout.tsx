import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Users, Bell, MessageSquare, UserCircle, Settings, LogOut, Search, Menu, X, ChevronDown, Cpu, Bot, Shield, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sampleNotifications } from '@/data/mockData';
import { FloatingChatBot } from '@/components/dashboard/FloatingChatBot';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    ...(user?.role === 'client' ? [
      { icon: Search, label: 'Discover', path: '/dashboard/influencers' },
      { icon: Cpu, label: 'AI Matching', path: '/dashboard/ai-matching' },
      { icon: Bot, label: 'AI Assistant', path: '/dashboard/ai-assistant' },
    ] : user?.role === 'influencer' ? [
      { icon: Bell, label: 'Manage Requests', path: '/dashboard/requests' },
      { icon: Users, label: 'My Bookings', path: '/dashboard/bookings' },
    ] : [
      { icon: Shield, label: 'Admin Panel', path: '/dashboard/admin' },
    ]),
    { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages' },
    { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
    { icon: UserCircle, label: 'Profile', path: '/dashboard/profile' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);
  const { theme, setTheme } = useTheme();
  const unreadNotifs = sampleNotifications.filter(n => !n.read).length;

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-sidebar transform transition-all duration-500 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 h-20 px-8 border-b border-sidebar-border/50">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <img src="/whisk_udaan_setu.png" alt="Whisk Udaan Setu" className="h-12 w-12 rounded-full object-cover border-2 border-white/20" />
            </motion.div>
            <button className="lg:hidden ml-auto text-white/70 hover:text-white transition-colors" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
            {menuItems.map((item, idx) => {
              const active = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={active ? 'sidebar-item-active' : 'sidebar-item'}
                  >
                    <item.icon className={`w-5 h-5 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="text-[15px] font-semibold">{item.label}</span>
                    {item.label === 'Notifications' && unreadNotifs > 0 && (
                      <span className="ml-auto bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">
                        {unreadNotifs}
                      </span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="p-6 border-t border-sidebar-border/50">
            <button onClick={handleLogout} className="sidebar-item w-full hover:bg-destructive/10 hover:text-destructive group transition-all duration-300">
              <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <span className="text-[15px] font-semibold">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-20 border-b border-white/40 dark:border-border/40 bg-white/70 dark:bg-card/70 backdrop-blur-xl flex items-center justify-between px-6 lg:px-10 sticky top-0 z-20">
          <div className="flex items-center gap-6 flex-1">
            <button className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-sidebar-accent rounded-xl transition-colors" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative max-w-md w-full hidden sm:block group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search influencers, campaigns..."
                className="pl-12 h-11 w-full bg-gray-50/50 dark:bg-muted/20 border-gray-200/50 dark:border-border/50 focus:bg-white dark:focus:bg-card rounded-xl transition-all shadow-sm focus:shadow-md outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300 group"
            >
              {theme === 'dark' ? (
                <Sun className="w-5.5 h-5.5 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5.5 h-5.5 group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotifDropdown(!notifDropdown); setProfileDropdown(false); }}
                className={`relative p-2.5 rounded-xl transition-all duration-300 ${notifDropdown ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                <Bell className="w-5.5 h-5.5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full ring-2 ring-white dark:ring-card" />
                )}
              </button>

              <AnimatePresence>
                {notifDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-14 w-80 bg-white dark:bg-card border border-gray-100 dark:border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-50 dark:border-border flex items-center justify-between">
                      <h3 className="font-bold text-base">Notifications</h3>
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">New</span>
                    </div>
                    <div className="max-h-[320px] overflow-auto custom-scrollbar">
                      {sampleNotifications.slice(0, 4).map(n => (
                        <div key={n.id} className={`p-4 border-b border-gray-50 dark:border-border/50 hover:bg-gray-50/80 dark:hover:bg-muted/30 transition-colors cursor-pointer ${!n.read ? 'bg-primary/[0.02]' : ''}`}>
                          <p className="text-sm font-semibold leading-tight">{n.title}</p>
                          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{n.description}</p>
                          <p className="text-[10px] font-medium text-muted-foreground/60 mt-2 uppercase tracking-wide">{n.timestamp}</p>
                        </div>
                      ))}
                    </div>
                    <Link to="/dashboard/notifications" onClick={() => setNotifDropdown(false)} className="block p-4 text-center text-sm text-primary font-bold hover:bg-gray-50 dark:hover:bg-muted/50 transition-colors">
                      View All Activity
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => { setProfileDropdown(!profileDropdown); setNotifDropdown(false); }}
                className={`flex items-center gap-3 p-1.5 pr-3 rounded-xl transition-all duration-300 ${profileDropdown ? 'bg-gray-100 dark:bg-muted' : 'hover:bg-gray-50 dark:hover:bg-muted'}`}
              >
                <div className="relative">
                  <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-white dark:ring-card shadow-sm" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-card" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-bold leading-none">{user?.name}</p>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-1">{user?.role}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${profileDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {profileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-14 w-56 bg-white dark:bg-card border border-gray-100 dark:border-border rounded-2xl shadow-2xl z-50 p-2"
                  >
                    <Link to="/dashboard/profile" onClick={() => setProfileDropdown(false)} className="flex items-center gap-3 p-3 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-muted transition-all rounded-xl">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary"><UserCircle className="w-4.5 h-4.5" /></div> Profile Settings
                    </Link>
                    <Link to="/dashboard/settings" onClick={() => setProfileDropdown(false)} className="flex items-center gap-3 p-3 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-muted transition-all rounded-xl">
                      <div className="p-2 bg-secondary/10 rounded-lg text-secondary"><Settings className="w-4.5 h-4.5" /></div> Account Preferences
                    </Link>
                    <div className="my-2 border-t border-gray-50 dark:border-border/50" />
                    <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-sm font-semibold hover:bg-destructive/10 text-destructive transition-all rounded-xl w-full">
                      <div className="p-2 bg-destructive/10 rounded-lg"><LogOut className="w-4.5 h-4.5" /></div> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          <Outlet />
        </main>
      </div>
      <FloatingChatBot />
    </div>
  );
}
