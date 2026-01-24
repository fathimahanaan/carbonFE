import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { base_url } from "../../utils/constants";

const useGetHistory = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${base_url}/history/viewHistory?${Date.now()}`,
        {
          withCredentials: true,
        },
      );

      console.log("🧾 HISTORY API RESPONSE:", res.data);
      console.log("📌 HISTORY ARRAY:", res.data.data);

      setHistory(res.data.data); // MUST be array
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const refetch = () => {
    getHistory();
  };

  return { loading, history, refetch };
};

export default useGetHistory;
