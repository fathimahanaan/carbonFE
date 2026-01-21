import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../utils/constants";

export const useGetAllFood = () => {
  const [options, setOptions] = useState({
    foodProducts: [],
  });

  const [loading, setLoading] = useState(false);

  const getFoodOptions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}/food/options`, {
        withCredentials: true,
      });

      console.log("🍔 FOOD OPTIONS API:", res.data);

      setOptions({
        foodProducts: res.data.activities || [],
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load options",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoodOptions();
  }, []);

  return { options, loading, getFoodOptions };
};

export default useGetAllFood;
