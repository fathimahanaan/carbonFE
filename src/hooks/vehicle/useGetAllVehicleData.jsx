import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../utils/constants";

const useGetAllVehicleData = () => {
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const getAllVehicleData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${base_url}/api/v1/vehicle/getAllVehicleData`,
        {
          withCredentials: true,
        }
      );

      setVehicles(res.data);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch vehicle data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllVehicleData();
  }, []);

  return { loading, vehicles, refetch: getAllVehicleData };
};

export default useGetAllVehicleData;
