import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, UserRole } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authMode: 'signin' | 'signup';
  setAuthMode: (mode: 'signin' | 'signup') => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const login = useCallback((_email: string, _password: string, role: UserRole) => {
    setUser({
      id: 'user-1',
      name: role === 'client' ? 'Arjun Mehta' : 'Priya Kapoor',
      email: _email,
      role,
      avatar: role === 'client'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
        : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      bio: role === 'client' ? 'Founder of TechStart India, looking for influencer partnerships.' : 'Fashion & lifestyle creator from Mumbai with 500K+ followers.',
      company: role === 'client' ? 'TechStart India' : undefined,
      city: role === 'client' ? 'Bangalore' : 'Mumbai',
      niche: role === 'influencer' ? 'Fashion' : undefined,
      followers: role === 'influencer' ? 520000 : undefined,
      rating: role === 'influencer' ? 4.8 : undefined,
      roleLabel: role === 'influencer' ? 'Premium Creator' : 'Brand Owner',
      experienceLevel: 'Professional',
      favoriteItems: role === 'influencer' ? ['ZARA', 'H&M', 'Nike'] : ['Pavan Hari', 'Ananya', 'Divya'],
      primaryGenre: role === 'influencer' ? 'Lifestyle' : 'E-commerce',
      softwareOrEquipment: role === 'influencer' ? 'Sony A7IV, Final Cut Pro' : 'CRM Dashboard, Shopify',
      preferredMood: 'Cinematic',
      availability: true,
      badges: ['Top Collaborator', 'Verified'],
      tags: role === 'influencer' ? ['Fashion', 'Lifestyle', 'Reels'] : ['Tech', 'Marketing', 'Scale'],
      isPremium: true,
      region: 'India'
    });
    setShowAuthModal(false);
  }, []);

  const signup = useCallback((name: string, email: string, _password: string, role: UserRole) => {
    setUser({
      id: 'user-1',
      name,
      email,
      role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff&size=200&bold=true`,
      bio: '',
      city: '',
    });
    setShowAuthModal(false);
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      updateUser,
      logout,
      showAuthModal,
      setShowAuthModal,
      authMode,
      setAuthMode
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
