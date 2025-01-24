import { saveToken } from "../../services/auth";

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (data.token) {
        saveToken(data.token);
        // Redirect to dashboard or home
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Login failed");
    }
  };

  // Rest of your component code
};
