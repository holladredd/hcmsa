import { saveToken } from "../../services/auth";

const Signup = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
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
      setError("Signup failed");
    }
  };

  // Rest of your component code
};
