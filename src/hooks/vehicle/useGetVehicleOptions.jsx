import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../utils/constants";

const useGetVehicleOptions = (activity) => {
  const [options, setOptions] = useState({
    activities: [],
    types: [],
    fuels: [],
    units: [],
  });

  const [loading, setLoading] = useState(false);

  const getVehicleOptions = async () => {
    setLoading(true);
    try {
      // Only send query param when activity is not empty
      const url = activity
        ? `${base_url}/vehicle/option?activity=${encodeURIComponent(activity)}`
        : `${base_url}/vehicle/option`;

      const res = await axios.get(url, { withCredentials: true });

      setOptions(res.data);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to load options"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVehicleOptions();
  }, [activity]);

  return { options, loading };
};

export default useGetVehicleOptions;
