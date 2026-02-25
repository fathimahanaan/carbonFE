import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${base_url}/auth/logout`,
        {},
        { withCredentials: true }
      );
 
      setUser(null);

      toast.success("Logged out successfully");

      
      navigate("/login");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Logout failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};

export default useLogout;