import { getToken } from "./auth";

const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = getToken();

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};

export { makeAuthenticatedRequest };
