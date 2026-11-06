import React, { createContext, useContext, useState } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { DEFAULT_USER } from '../utils/sampleData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Pre-seed demo user if no users registered yet
  const [users, setUsers] = useState(() => {
    const saved = getStorageItem('pulsefit_accounts', null);
    if (saved && Array.isArray(saved) && saved.length > 0) {
      return saved;
    }
    const initialAccounts = [
      {
        ...DEFAULT_USER,
        password: 'password123',
      },
    ];
    setStorageItem('pulsefit_accounts', initialAccounts);
    return initialAccounts;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const active = getStorageItem('pulsefit_current_user', null);
    if (active) return active;
    // Default to the demo user logged in on initial landing
    return DEFAULT_USER;
  });

  const login = (email, password) => {
    const userFound = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (!userFound) {
      return { success: false, message: 'No account found with this email.' };
    }

    if (userFound.password && userFound.password !== password) {
      return { success: false, message: 'Invalid password. Try again.' };
    }

    const { password: _, ...userSafe } = userFound;
    setCurrentUser(userSafe);
    setStorageItem('pulsefit_current_user', userSafe);
    return { success: true, user: userSafe };
  };

  const register = (registrationData) => {
    const email = registrationData.email.toLowerCase().trim();
    const existing = users.find((u) => u.email.toLowerCase() === email);
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      ...DEFAULT_USER,
      ...registrationData,
      id: 'usr_' + Date.now(),
      email,
      memberSince: new Date().toISOString().split('T')[0],
      avatar:
        registrationData.avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(registrationData.name || 'User')}`,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setStorageItem('pulsefit_accounts', updatedUsers);

    const { password: _, ...userSafe } = newUser;
    setCurrentUser(userSafe);
    setStorageItem('pulsefit_current_user', userSafe);

    return { success: true, user: userSafe };
  };

  const logout = () => {
    setCurrentUser(null);
    setStorageItem('pulsefit_current_user', null);
  };

  const loginAsDemo = () => {
    setCurrentUser(DEFAULT_USER);
    setStorageItem('pulsefit_current_user', DEFAULT_USER);
    return { success: true, user: DEFAULT_USER };
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setStorageItem('pulsefit_current_user', updated);

    // Also update in accounts list
    const updatedAccounts = users.map((u) =>
      u.id === currentUser.id ? { ...u, ...updatedFields } : u
    );
    setUsers(updatedAccounts);
    setStorageItem('pulsefit_accounts', updatedAccounts);

    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        loginAsDemo,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

