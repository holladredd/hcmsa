import React, { createContext, useState, useContext, useEffect } from "react";
// import { auth } from "../Api";
import { auth } from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const currentUser = auth.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await auth.signin({ email, password });
      setUser(userData);
      return userData;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await auth.signup({ name, username, email, password });
      setUser(userData);
      return userData;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
      setUser(null);
    } catch (error) {
      setError(error);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  if (loading) {
    return null; // Or a loading component
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
