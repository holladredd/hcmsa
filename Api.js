import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const signup = async (name, username, email, password) => {
  const response = await axios.post(`${API_URL}/users/signup`, {
    name,
    username,
    email,
    password,
  });
  return response.data;
};

export const signin = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/signin`, {
    email,
    password,
  });
  return response.data;
};
export const getHealthcareFacilities = async () => {
  const response = await axios.get(`${API_URL}/healthcare`);
  return response.data;
};

export const createAppointment = async (
  userId,
  healthcareFacilityId,
  date,
  notes
) => {
  const response = await axios.post(`${API_URL}/appointments/schedule`, {
    userId,
    healthcareFacilityId,
    date,
    notes,
  });
  return response.data;
};

export const getForumPosts = async () => {
  const response = await axios.get(`${API_URL}/forum/posts`);
  return response.data;
};

export const createForumPost = async (content, userId) => {
  const response = await axios.post(`${API_URL}/forum/post`, {
    content,
    userId,
  });
  return response.data;
};

export const getPregnancyTimeline = async () => {
  const response = await axios.get(`${API_URL}/timeline`);
  return response.data;
};

export const addMilestone = async (week, milestone) => {
  const response = await axios.post(`${API_URL}/timeline/add`, {
    week,
    milestone,
  });
  return response.data;
};

// For signup:
const handleSignup = async () => {
  try {
    const userData = await signup(name, username, email, password);
    // Handle successful signup
    console.log(userData); // Contains user info and token
  } catch (error) {
    // Handle error
  }
};

// For signin:
const handleSignin = async () => {
  try {
    const userData = await signin(email, password);
    // Handle successful signin
    console.log(userData); // Contains user info and token
  } catch (error) {
    // Handle error
  }
};
