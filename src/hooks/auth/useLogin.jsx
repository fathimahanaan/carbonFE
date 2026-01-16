import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../utils/constants";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async ({userId, password }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${base_url}/auth/login`,
        {  userId,password },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Logged in successfully");

      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.msg ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
