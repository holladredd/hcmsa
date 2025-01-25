import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeContext = createContext(null);
const BASE_URL = "https://hcmsaserver.onrender.com/api";

export const HomeProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/users/`, {
        methodd: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setUserDetails(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const updateUserProfile = async (updatedData) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/users/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      setUserDetails(data);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const createAppointment = async (appointmentData) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/appointments/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });
      const data = await response.json();
      setAppointments([...appointments, data]);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const refreshHomeData = async () => {
    setLoading(true);
    await Promise.all([
      fetchAppointments(),
      fetchNotifications(),
      fetchUserDetails(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    refreshHomeData();
  }, []);

  const value = {
    appointments,
    notifications,
    userDetails,
    loading,
    error,
    createAppointment,
    refreshHomeData,
    fetchAppointments,
    fetchNotifications,
    fetchUserDetails,
    updateUserProfile,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHome must be used within a HomeProvider");
  }
  return context;
};
