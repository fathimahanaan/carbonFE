import { useState, useEffect } from "react";
import axios from "axios";

export default function useDailyEmissionGraph() {
  const [loading, setLoading] = useState(false);
  const [emissions, setEmissions] = useState([]);

  const getDailyEmissions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/history/dailyEmission",
        { withCredentials: true }
      );

      const data = res.data.data;
      setEmissions([
        { name: "Vehicle", value: data.vehicle },
        { name: "Food", value: data.food },
        { name: "Energy", value: data.energy },
      ]);
    } catch (err) {
      console.error("Error fetching daily emissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDailyEmissions();
  }, []);

  return { emissions, loading, refetch: getDailyEmissions };
}
