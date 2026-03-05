import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../utils/constants";

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${base_url}/auth/users/${id}`,
        { withCredentials: true }
      );

      toast.success(res?.data?.message || "User deleted successfully");
      return true;  
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete user"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading };
};

export default useDeleteUser;