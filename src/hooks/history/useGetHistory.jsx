import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../utils/constants";

export default function useGetHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${base_url}/history/viewHistory`, {
          withCredentials: true,
        });

        console.log("🧾 HISTORY API RESPONSE:", res.data);  // ✅ add this
        console.log("📌 HISTORY ARRAY:", res.data.data);    // ✅ add this

        setHistory(res.data.data); // MUST be array
      } catch (err) {
        toast.error(err?.response?.data?.message || err?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { history, loading };
}
