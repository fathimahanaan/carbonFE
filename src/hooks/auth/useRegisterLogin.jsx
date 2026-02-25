import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";

const useRegisterLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const register = async ({ password }) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${base_url}/auth/register`,
        { password },
        { withCredentials: true }
      );
 
      setUser({
        userId: res.data.userId,
        name: res.data.name,
        role: "user",
      });

    toast.success(`${res.data.message || "Registered successfully"}\nYour User ID: ${res.data.userId}`, {
      autoClose: 8000,
    });

      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        err?.response?.data?.msg ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

export default useRegisterLogin;