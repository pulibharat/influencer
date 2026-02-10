import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Users, Bell, MessageSquare, UserCircle, Settings, LogOut, Search, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sampleNotifications } from '@/data/mockData';

const menuItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Users, label: 'Influencers', path: '/dashboard/influencers' },
  { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
  { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages' },
  { icon: UserCircle, label: 'Profile', path: '/dashboard/profile' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);
  const unreadNotifs = sampleNotifications.filter(n => !n.read).length;

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-2 h-16 px-6 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">IM</span>
          </div>
          <span className="font-display text-lg font-bold text-sidebar-foreground">InfluMatch</span>
          <button className="lg:hidden ml-auto text-sidebar-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={active ? 'sidebar-item-active' : 'sidebar-item'}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
                {item.label === 'Notifications' && unreadNotifs > 0 && (
                  <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">{unreadNotifs}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <button onClick={handleLogout} className="sidebar-item w-full">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search influencers, campaigns..." className="pl-10 w-72 bg-muted/50 border-0" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => { setNotifDropdown(!notifDropdown); setProfileDropdown(false); }} className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                )}
              </button>
              {notifDropdown && (
                <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-xl z-50 animate-scale-in">
                  <div className="p-3 border-b border-border">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-auto">
                    {sampleNotifications.slice(0, 4).map(n => (
                      <div key={n.id} className={`p-3 border-b border-border/50 hover:bg-muted/50 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}>
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{n.timestamp}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/dashboard/notifications" onClick={() => setNotifDropdown(false)} className="block p-3 text-center text-sm text-primary font-medium hover:bg-muted/50">
                    View All
                  </Link>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button onClick={() => { setProfileDropdown(!profileDropdown); setNotifDropdown(false); }} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors">
                <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </button>
              {profileDropdown && (
                <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-xl shadow-xl z-50 animate-scale-in">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                  <Link to="/dashboard/profile" onClick={() => setProfileDropdown(false)} className="flex items-center gap-2 p-3 text-sm hover:bg-muted/50 transition-colors">
                    <UserCircle className="w-4 h-4" /> Profile
                  </Link>
                  <Link to="/dashboard/settings" onClick={() => setProfileDropdown(false)} className="flex items-center gap-2 p-3 text-sm hover:bg-muted/50 transition-colors">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 p-3 text-sm hover:bg-muted/50 transition-colors w-full text-destructive">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
