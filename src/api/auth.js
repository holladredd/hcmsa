import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:5000/api";
// const API_URL = "https://hcmsaserver.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Add timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token refresh mechanism
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = AsyncStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await api.post("/refresh-token", { refreshToken });
          AsyncStorage.setItem("token", data.accessToken);
          error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;
          return api(error.config);
        } catch (refreshError) {
          auth.logout();
        }
      }
    }
    return Promise.reject(error);
  }
);

// Create authentication service
export const auth = {
  signin: async ({ email, password }) => {
    try {
      //   const response = await api.post("/users/signin", { email, password });
      //   console.log("Auth Response:", response.data);
      //   console.log("Sending request with:", { email, password });
      console.log("Login credentials:", { email, password }); // Log email for verification

      const response = await api.post("/users/signin", {
        email: email.trim().toLowerCase(),
        password,
      });
      console.log("Response received:", response);
      //   if (response.data.token) {
      //     await AsyncStorage.setItem("token", response.data.token);
      //     //await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      //     await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      //   }
      if (response.data && response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        console.log("Login successful:", response.status);
        return response.data;
      }

      throw new Error("Invalid response format");
    } catch (error) {
      //   console.log("Auth Error:", error.response?.data);
      //   throw new Error(error.response?.data?.message || "Authentication failed");
      console.log("Full error:", error);
      console.log("Error response:", error.response);
      console.log("Error message:", error.message);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Network error occurred"
      );
    }
  },

  signup: async ({ name, email, password }) => {
    try {
      console.log("Attempting signup to:", `${API_URL}/users/signup`);
      const response = await api.post("/users/signup", {
        name,
        email: email.trim().toLowerCase(),
        password,
      });
      if (response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        //  await  AsyncStorage.setItem("refreshToken", response.data.refreshToken);
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  //   getCurrentUser: async () => {
  //     const user = await AsyncStorage.getItem("user");
  //     return user ? JSON.parse(user) : null;
  //   },
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put("/users/profile", userData);
    return response.data;
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    //await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("user");
  },
};
export default api;
