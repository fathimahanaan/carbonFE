import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AddResourceHeader = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
  navigate("/resources")
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <button
        onClick={handleGoBack}
        className="flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold"
      >
        <IoMdArrowRoundBack className="text-xl" />
        Go Back
      </button>
    </div>
  );
};

export default AddResourceHeader;
