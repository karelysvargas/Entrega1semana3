/**
 * Security Service for safe user data handling and cryptographic operations.
 * Implements Web Crypto API for SHA-256 password hashing, secure token generation,
 * and input sanitization to safely store user information.
 */

import { AuthSession, UserProfile } from '../types';

const STORAGE_SESSION_KEY = 'hbreakfast_secure_session_v1';
const STORAGE_USERS_KEY = 'hbreakfast_registered_users_v1';
const STORAGE_CURRENT_USER_KEY = 'hbreakfast_current_profile_v1';

// Default mock academic student profile
export const DEFAULT_STUDENT_PROFILE: UserProfile = {
  id: 'usr_hb84920',
  name: 'Carlos Andrés Mendoza Silva',
  email: 'alumno@universidad.edu',
  code: '#HB-84920',
  occupation: 'Diseñador Gráfico & Creativo',
  mealPlan: 'Estilo Saludable & Vitalidad',
  healthGoal: 'Desayunos balanceados y energía diaria',
  isVerified: true,
  memberSince: 'Marzo 2024',
  avatarUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1WRuzEfKKdHLkFhg1EjUAA74XSjB8KmTiZc6P_VcxizJAYpzDqjdHvKkonxkfMdBYdFyjK_JedE_LnWJD5ngApB2CDxCKUdLFud34JLVnbgb9pejnjgwPz2_nH7bQYjTrIZ8gGYViv5T-hDSv2M1nmHDJabUeQB522PpGQdZFdlbYu4ITLR-7omlYfwsfg1XopOpL4DnmTi0QUJl1ZDCAehg277rBknaAAdSx1oVKzx2uYG8JT45xM2qJU',
  role: 'student',
  lastLogin: new Date().toISOString(),
};

/**
 * Hash password safely using SHA-256 via browser Web Crypto API
 */
export async function hashPassword(plainText: string): Promise<string> {
  if (!window.crypto || !window.crypto.subtle) {
    // Basic fallback hash for unsupported environments
    let hash = 0;
    for (let i = 0; i < plainText.length; i++) {
      const char = plainText.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return 'fallback_' + Math.abs(hash).toString(16);
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(plainText + '_healthy_salt_2026');
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate cryptographically secure random session token
 */
export function generateSecureToken(): string {
  const array = new Uint8Array(24);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Input sanitization to prevent XSS in user profile edits
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * Save user session safely with expiration
 */
export function saveSession(session: AuthSession): void {
  try {
    sessionStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    if (session.rememberMe) {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    }
  } catch (e) {
    console.error('Error saving session:', e);
  }
}

/**
 * Load active session and verify expiry
 */
export function loadSession(): AuthSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_SESSION_KEY) || localStorage.getItem(STORAGE_SESSION_KEY);
    if (!raw) return null;
    const session: AuthSession = JSON.parse(raw);
    if (session.expiresAt && Date.now() > session.expiresAt) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

/**
 * Clear session from both session and local storage
 */
export function clearSession(): void {
  try {
    sessionStorage.removeItem(STORAGE_SESSION_KEY);
    localStorage.removeItem(STORAGE_SESSION_KEY);
  } catch (e) {
    console.error('Error clearing session:', e);
  }
}

/**
 * Save current user profile
 */
export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving user profile:', e);
  }
}

/**
 * Load user profile with default fallback
 */
export function loadUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    if (raw) {
      return { ...DEFAULT_STUDENT_PROFILE, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Error reading user profile:', e);
  }
  return DEFAULT_STUDENT_PROFILE;
}
