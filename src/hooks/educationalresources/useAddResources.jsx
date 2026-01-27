import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../utils/constants";
 

export default function useAddResources() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const addResources = async ({
  category,
  title,
  fact,
  tip,
  image,
}) => {
  setLoading(true);

  try {
    await axios.post(
      `${base_url}/resources/`,
      {
        category: category.trim(), // ✅ important
        title,
        fact,
        tip,
        image,
      },
      { withCredentials: true }
    );

    toast.success("Resources added successfully 🌱");
    navigate("/resources");
  } catch (err) {
    toast.error(
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

  return { loading, addResources };
}
