import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../utils/constants";

const useGetEnergyOptions = () => {
  const [options, setOptions] = useState({
    activities: [],
    units: [],
  });
  const [loading, setLoading] = useState(false);

  const getEnergyOptions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}/energy/options`, {
        withCredentials: true,
      });

      setOptions({
        activities: res.data.activities,
        units: res.data.units,
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to load options"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnergyOptions();
  }, []);

  return { options, loading, getEnergyOptions };
};

export default useGetEnergyOptions;
