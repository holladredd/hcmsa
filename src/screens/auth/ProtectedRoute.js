import React, { useEffect } from "react";
import { getToken } from "../../services/auth";
import { useNavigation } from "@react-navigation/native";

const ProtectedRoute = ({ children }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (!token) {
        navigation.navigate("Login");
      }
    };
    checkAuth();
  }, [navigation]);

  return children;
};
export default ProtectedRoute;
