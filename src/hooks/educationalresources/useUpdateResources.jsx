import { useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useUpdateResources() {
  const [loading, setLoading] = useState(false);
  /* eslint-disable */
  const [resource, setResource] = useState(null);

  const updateResources = async (id, data) => {
    if (!id) return;

    setLoading(true);

    try {
      await axios.patch(`${base_url}/resources/${id}`, data, {
        withCredentials: true,
      });
      toast.success("Resource updated successfully!");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return { updateResources, loading };
}
