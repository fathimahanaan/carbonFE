import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetEmission() {
  const [loading, setLoading] = useState(false);
  const [emissions, setEmissions] = useState([]);

  const fetchEmissions = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/history/emission", { withCredentials: true });
      setEmissions(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmissions();
  }, []);

  return { emissions, loading, refetch: fetchEmissions };
}
