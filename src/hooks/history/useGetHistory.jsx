import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { base_url } from "../../utils/constants";

const useGetHistory = (keyword) => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    setLoading(true);
    try {
      let url = `${base_url}/history/viewHistory`;

      if (keyword && keyword.trim() !== "") {
        url += `?keyword=${encodeURIComponent(keyword)}`;
      }

      const res = await axios.get(url, {
        withCredentials: true,
      });

      setHistory(res.data.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, [keyword]);  

  return { loading, history };
};

export default useGetHistory;