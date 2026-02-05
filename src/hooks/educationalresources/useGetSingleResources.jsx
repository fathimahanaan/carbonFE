import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useGetSingleResources(id) {
  const [loading, setLoading] = useState(false);
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const getResource = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `${base_url}/resources/${id}`,
          { withCredentials: true }
        );

        setResource(res.data || {});
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    getResource();
  }, [id]);

  return { loading, resource };
}
