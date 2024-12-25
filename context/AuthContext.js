import React, { createContext, useState, useContext } from "react";
import { auth } from "../Api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.getCurrentUser());
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userData = await auth.signin({ email, password });
      setUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, username, email, password) => {
    setLoading(true);
    try {
      const userData = await auth.signup({ name, username, email, password });
      setUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    auth.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
