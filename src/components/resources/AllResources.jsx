import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CiEdit } from "react-icons/ci";

export const AllResources = () => {
  const { user } = useAuth();

  console.log("AllResources user:", user); // 👈 ADD THIS

  return (
    <div>
      AllResources
      {user?.role === "admin" && (
        <Link
          to="/resources/add"
          className="mt-auto text-[#5B93FF] hover:text-[#bed1f9]"
        >
          <CiEdit className="text-blue-600 text-[18px] hover:text-blue-800" />
        </Link>
      )}
    </div>
  );
};
