import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, AuthSession } from '../types';
import {
  DEFAULT_STUDENT_PROFILE,
  hashPassword,
  generateSecureToken,
  saveSession,
  loadSession,
  clearSession,
  saveUserProfile,
  loadUserProfile,
  sanitizeInput,
} from '../services/security';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: () => void;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const session = loadSession();
    if (session) {
      return loadUserProfile();
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return loadSession() !== null;
  });

  // Verify session on mount
  useEffect(() => {
    const session = loadSession();
    if (session) {
      setUser(loadUserProfile());
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback(async (email: string, password: string, rememberMe: boolean) => {
    const cleanEmail = sanitizeInput(email).toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Ingresa un correo electrónico válido' };
    }
    if (!password || password.length < 4) {
      return { success: false, error: 'La contraseña debe tener al menos 4 caracteres' };
    }

    // Secure password hashing
    const passHash = await hashPassword(password);
    const token = generateSecureToken();
    const expiresAt = Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000);

    const session: AuthSession = {
      token,
      userId: 'usr_hb84920',
      expiresAt,
      rememberMe,
    };
    saveSession(session);

    // Load or create profile
    let current = loadUserProfile();
    if (cleanEmail === DEFAULT_STUDENT_PROFILE.email) {
      current = {
        ...DEFAULT_STUDENT_PROFILE,
        lastLogin: new Date().toISOString(),
        passwordHash: passHash,
      };
    } else {
      current = {
        ...current,
        email: cleanEmail,
        lastLogin: new Date().toISOString(),
        passwordHash: passHash,
      };
    }

    saveUserProfile(current);
    setUser(current);
    setIsAuthenticated(true);

    return { success: true };
  }, []);

  const loginAsGuest = useCallback(() => {
    const guestUser: UserProfile = {
      id: 'usr_guest_' + Date.now(),
      name: 'Invitado Universitario',
      email: 'invitado@universidad.edu',
      code: '#GUEST-MODE',
      occupation: 'Visitante Académico',
      mealPlan: 'Exploración de Recetas',
      healthGoal: 'Conocer opciones de desayunos saludables',
      isVerified: false,
      memberSince: 'Septiembre 2026',
      avatarUrl: DEFAULT_STUDENT_PROFILE.avatarUrl,
      role: 'guest',
      lastLogin: new Date().toISOString(),
    };

    const session: AuthSession = {
      token: generateSecureToken(),
      userId: guestUser.id,
      expiresAt: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
      rememberMe: false,
    };

    saveSession(session);
    setUser(guestUser);
    setIsAuthenticated(true);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email).toLowerCase();

    if (!cleanName || cleanName.length < 3) {
      return { success: false, error: 'Ingresa un nombre completo válido' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Ingresa un correo institucional o personal válido' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'La contraseña de registro debe tener al menos 6 caracteres' };
    }

    const passHash = await hashPassword(password);
    const newCode = '#HB-' + Math.floor(10000 + Math.random() * 90000);

    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      code: newCode,
      occupation: 'Estudiante Universitario',
      mealPlan: 'Estilo Saludable & Vitalidad',
      healthGoal: 'Energía matutina y concentración en clases',
      isVerified: true,
      memberSince: 'Septiembre 2026',
      avatarUrl: DEFAULT_STUDENT_PROFILE.avatarUrl,
      role: 'registered',
      passwordHash: passHash,
      lastLogin: new Date().toISOString(),
    };

    const session: AuthSession = {
      token: generateSecureToken(),
      userId: newUser.id,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      rememberMe: true,
    };

    saveSession(session);
    saveUserProfile(newUser);
    setUser(newUser);
    setIsAuthenticated(true);

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateProfile = useCallback((updatedData: Partial<UserProfile>) => {
    setUser(prev => {
      if (!prev) return null;
      const sanitized: Partial<UserProfile> = {};
      if (updatedData.name !== undefined) sanitized.name = sanitizeInput(updatedData.name);
      if (updatedData.occupation !== undefined) sanitized.occupation = sanitizeInput(updatedData.occupation);
      if (updatedData.mealPlan !== undefined) sanitized.mealPlan = sanitizeInput(updatedData.mealPlan);
      if (updatedData.healthGoal !== undefined) sanitized.healthGoal = sanitizeInput(updatedData.healthGoal);

      const updated = { ...prev, ...sanitized };
      saveUserProfile(updated);
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginAsGuest,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
