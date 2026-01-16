import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../utils/constants";
 

const useCalculateAllEmissions = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const calculateEmissions = async ({
    vehicleData,
    foodItems,
    energyData,
  }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${base_url}/api/v1/history/calculate`,
        {
          vehicleData,
          foodItems,
          energyData,
        },
        {
          withCredentials: true, 
        }
      );

      setResult(res.data.data);
      toast.success("Emissions calculated successfully");
      return res.data.data;
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to calculate emissions"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    result,
    calculateEmissions,
  };
};

export default useCalculateAllEmissions;
