import { useState, useEffect } from "react";
import axios from "axios";

export default function useDailyPrediction() {
  const [loading, setLoading] = useState(false);
  const [predicted, setPredicted] = useState([]);

  const fetchPrediction = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/history/dailyprediction", { withCredentials: true });
      setPredicted(res.data.predicted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
  }, []);

  return { predicted, loading, refetch: fetchPrediction };
}
