export interface UserProfile {
  id: string;
  name: string;
  email: string;
  code: string;
  occupation: string;
  mealPlan: string;
  healthGoal: string;
  isVerified: boolean;
  memberSince: string;
  avatarUrl: string;
  role: 'student' | 'guest' | 'registered';
  passwordHash?: string;
  lastLogin?: string;
}

export interface AuthSession {
  token: string;
  userId: string;
  expiresAt: number;
  rememberMe: boolean;
}

export interface RecipeItem {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  kcal: string;
  time: string;
  difficulty: string;
  imageUrl: string;
  imageAlt: string;
  ingredients?: string[];
  steps?: string[];
}

export type FragmentTab = 'perfil' | 'fotos' | 'video' | 'web' | 'botones';

export interface LogCatEntry {
  id: string;
  timestamp: string;
  tag: string;
  message: string;
  type: 'UI_EVENT' | 'LIFECYCLE' | 'NETWORK' | 'AUTH';
}
