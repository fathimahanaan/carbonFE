import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/constants";
import { toast } from "react-toastify";

export default function useGetWeeklyGraph() {
  const [weeklyEmissions, setWeeklyEmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeeklyEmissions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${base_url}/history/weekly`, {
          withCredentials: true,
        });

        if (res.data?.success) {
 
          const formatted = res.data.data.map((record) => ({
            date: record.date, 
            emission: record.emission,
          }));

          setWeeklyEmissions(formatted);
        } else {
          setWeeklyEmissions([]);
          toast.error("Failed to fetch weekly emissions");
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || err?.message || "Something went wrong");
        console.error("Error fetching weekly emissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyEmissions();
  }, []);

  return { weeklyEmissions, loading };
}
