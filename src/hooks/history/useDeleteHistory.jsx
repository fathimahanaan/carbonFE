import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../utils/constants";

export const useDeleteHistory = () => {
  const [loading, setLoading] = useState(false);

  const deleteHistory = async (id) => {
    setLoading(true);

    
    console.log("Delete URL:",`${base_url}/history/deleteHistory/${id}`);

    try {
      const res = await axios.delete(
        `${base_url}/history/deleteHistory/${id}`,
        { withCredentials: true }
      );

      console.log("Delete response:", res.data);
      toast.success("Successfully deleted");
    } catch (err) {
      console.log("Delete error:", err.response?.data || err.message);
      toast.error(
        err?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return { deleteHistory, loading };
};
