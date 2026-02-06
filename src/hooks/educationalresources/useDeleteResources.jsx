import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../utils/constants";

export const useDeleteResource = () => {
  const [loading, setLoading] = useState(false);

  const deleteResource = async (id) => {
    if (!id) return;

    setLoading(true);

   
    console.log("Delete URL:", `${base_url}/resources/${id}`);

    try {
      const res = await axios.delete(`${base_url}/resources/${id}`, {
        withCredentials: true,
      });

      console.log("Delete response:", res.data);
      toast.success("Resource successfully deleted!");
    } catch (err) {
      console.log("Delete error:", err.response?.data || err.message);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { deleteResource, loading };
};
