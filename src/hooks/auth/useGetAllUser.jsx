import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../utils/constants";

export const useGetAllUser = () => {
  const [options, setOptions] = useState({
    users: [],
  });

  const [loading, setLoading] = useState(false);

  const getUserOptions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}/auth/getUsers`, {
        withCredentials: true,
      });

      setOptions({
        users: res.data || [],
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to load users",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserOptions();
  }, []);

  return { options, loading, getUserOptions };
};

export default useGetAllUser;
