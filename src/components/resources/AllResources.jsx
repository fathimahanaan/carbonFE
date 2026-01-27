import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { useAuth } from "../../context/AuthContext";
import useGetAllResources from "../../hooks/educationalresources/useGetAllResources";

export const AllResources = () => {
  const { user } = useAuth(); // ✅ FIXED
  const { resources = [], loading } = useGetAllResources(); // ✅ FIXED + safe default
console.log("RESOURCES FROM HOOK:", resources, "LOADING:", loading);
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-green-900">Tips</h1>

        {/* Admin Only */}
        {user?.role === "admin" && (
          <Link
            to="/resources/add"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            <CiEdit className="text-xl" />
            <span className="text-sm font-medium">Add Resource</span>
          </Link>
        )}
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-600">Loading resources...</p>}

      {/* Resources Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div
              key={resource._id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <img
                src={resource.image || "https://via.placeholder.com/400x200"}
                alt={resource.title}
                className="h-40 w-full object-cover rounded-xl mb-4"
              />

              <span className="text-xs font-semibold text-gray-500 uppercase">
                {resource.category}
              </span>

              <h2 className="text-xl font-bold text-gray-900 mt-2 mb-2">
                {resource.title}
              </h2>

              <p className="text-gray-700 mb-3">{resource.fact}</p>

              {resource.tip && (
                <p className="text-green-600 font-medium">
                  Tip: {resource.tip}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
