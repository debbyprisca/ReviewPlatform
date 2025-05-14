import React, { createContext, useState, useContext } from 'react';

// Create context with default values
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  logout: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Mock user data
const mockUser = {
  id: '1',
  address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  username: 'traveler123',
  reviewCount: 8,
  avatarUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
  joinedDate: '2023-06-15',
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    try {
      // This would be replaced with actual wallet connection logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};