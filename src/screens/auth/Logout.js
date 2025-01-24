import { removeToken } from "../../services/auth";

const handleLogout = () => {
  removeToken();
  navigate("/login");
};
