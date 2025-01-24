import React, { createContext, useState, useContext, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../services/Api";

const AuthContext = createContext(null);
var BASE_URL = "https://hcmsaserver.onrender.com/api";
const LOCAL_URL = "http://localhost:5001/api";
var BASE_URL = LOCAL_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("userToken");
      const storedUser = await AsyncStorage.getItem("userData");

      if (storedToken && storedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    if (!refreshToken) {
      handleTokenError();
      return null;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      await AsyncStorage.setItem("userToken", data.access);
      return data.access;
    } catch (err) {
      handleTokenError();
      return null;
    }
  };

  const handleTokenError = async () => {
    await AsyncStorage.multiRemove(["userToken", "refresh_token"]);
    setError("Your session has expired. Please log in again.");
    setIsAuthenticated(false);
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setIsAuthenticated(true);
      setUser(data.user);

      await AsyncStorage.setItem("userToken", data.token);
      await AsyncStorage.setItem("refresh_token", data.refresh);
      await AsyncStorage.setItem("userData", JSON.stringify(data.user));

      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/auth/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setIsAuthenticated(true);
      setUser(data.user);

      await AsyncStorage.setItem("userToken", data.token);
      await AsyncStorage.setItem("refresh_token", data.refresh);
      await AsyncStorage.setItem("userData", JSON.stringify(data.user));

      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        "userToken",
        "refresh_token",
        "userData",
      ]);
      setUser(null);
      setIsAuthenticated(false);
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
    isAuthenticated,
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
