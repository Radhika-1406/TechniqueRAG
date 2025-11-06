// Mock authentication utilities
// TODO: Replace with actual backend authentication

export interface User {
  id: string;
  email: string;
  name: string;
  organization?: string;
  accountType: 'individual' | 'company';
  plan: 'free' | 'pro' | 'enterprise';
  lastLogin: string;
}

const AUTH_KEY = 'techniquerag-user';
const SESSION_KEY = 'techniquerag-session';

export const isGuest = (): boolean => {
  return !localStorage.getItem(AUTH_KEY);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const signIn = (email: string, password: string): Promise<User> => {
  // Mock sign-in - replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const user: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        accountType: 'individual',
        plan: 'free',
        lastLogin: new Date().toISOString()
      };
      
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      resolve(user);
    }, 800);
  });
};

export const signUp = (email: string, password: string, name: string): Promise<User> => {
  // Mock sign-up - replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const user: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        accountType: 'individual',
        plan: 'free',
        lastLogin: new Date().toISOString()
      };
      
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      resolve(user);
    }, 800);
  });
};

export const signOut = (): void => {
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.clear();
};

export const continueAsGuest = (): void => {
  sessionStorage.setItem(SESSION_KEY, 'guest');
};

export const updateUser = (updates: Partial<User>): User | null => {
  const user = getCurrentUser();
  if (!user) return null;
  
  const updated = { ...user, ...updates };
  localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
  return updated;
};
