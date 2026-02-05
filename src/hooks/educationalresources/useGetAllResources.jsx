import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useGetAllResources() {
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);

  const getAllResources = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${base_url}/resources`, {
        withCredentials: true,
      });

      setResources(res.data);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("🔄 useEffect triggered");
    getAllResources();
  }, []);

  return { resources, loading, refetch: getAllResources };
}
