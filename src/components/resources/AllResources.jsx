import { Link } from "react-router-dom";
import { CiEdit} from "react-icons/ci";
import { useAuth } from "../../context/AuthContext";
 
import { IoMdAdd } from "react-icons/io";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useDeleteResource } from "../../hooks/educationalresources/useDeleteResources";
import useGetAllResources from "../../hooks/educationalresources/useGetAllResources";
import { MdDeleteOutline } from "react-icons/md";

export const AllResources = () => {
  const { user } = useAuth();
  const { resources = [], loading, refetch } = useGetAllResources();
  const { deleteResource, loading: deleting } = useDeleteResource();

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this resource?");
    if (!confirmed) return;

    await deleteResource(id);
    refetch(); // refresh the list after successful deletion
  };

  if (loading) return <LoadingSpinner message="Loading" />;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-green-900">Tips</h1>

        {user?.role === "admin" && (
          <Link
            to="/resources/add"
            className="flex items-center gap-2 bg-green-900 text-white px-4 py-2 hover:bg-green-700 transition"
          >
            <IoMdAdd className="text-xl" />
            <span className="text-sm font-medium">Add</span>
          </Link>
        )}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div
            key={resource._id}
            className="relative bg-green-200/20 rounded-sm shadow-md p-6"
          >
             
            {user?.role === "admin" && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Link
                  to={`/resources/edit/${resource._id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <CiEdit className="text-2xl" />
                </Link>
                <button
                  onClick={() => handleDelete(resource._id)}
                  disabled={deleting}
                  className="text-red-600 hover:text-red-800"
                >
                  <MdDeleteOutline className="text-2xl" />
                </button>
              </div>
            )}

            <img
              src={resource.image || "https://via.placeholder.com/400x200"}
              alt={resource.title}
              className="h-40 w-full object-cover rounded-xl mb-4"
            />

            <span className="text-xs font-semibold text-gray-500 uppercase">
              {resource.category}
            </span>

            <h2 className="text-xl font-bold text-green-900 pt-2 pb-2">
              {resource.title}
            </h2>

            <p className="text-gray-700 mb-3">{resource.fact}</p>

            {resource.tip && (
              <p className="text-green-600 font-medium">Tip: {resource.tip}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
