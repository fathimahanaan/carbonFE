import React, { useState } from "react";
import useGetAllUser from "../../hooks/auth/useGetAllUser";
import LoadingSpinner from "../LoadingSpinner";
import useDeleteUser from "../../hooks/auth/useDeleteUser";

export default function AdminDashboard() {
  const { options, loading, getUserOptions } = useGetAllUser();
  const { deleteUser, loading: deleteLoading } = useDeleteUser();

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-50">
        <LoadingSpinner className="text-green-700 text-lg" />
      </div>
    );
  }

  const totalUsers = options.users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = options.users.slice(
    startIndex,
    startIndex + usersPerPage,
  );

  const goNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const goPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const success = await deleteUser(id);

    if (success) {
      await getUserOptions();
    }
  };

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <div className="bg-white max-w-2xl p-6 shadow-lg text-center border-l-8 border-yellow-400">
        <p className="text-5xl text-blue-500 font-bold">{totalUsers}</p>
        <p className="text-sm text-yellow-500 font-semibold mt-1">
          Registered Users
        </p>

        <h2 className="text-blue-900 text-xl font-semibold mb-4 text-center">
          Users Joined
        </h2>

        <ul className="divide-y divide-blue-200 max-h-64 overflow-y-auto">
          {currentUsers.length === 0 ? (
            <li className="py-2 text-yellow-500 text-center">No users yet</li>
          ) : (
            currentUsers.map((user) => (
              <li
                key={user._id}
                className="py-2 flex justify-between items-center"
              >
                <div>
                  <p className="text-blue-800">{user.name}</p>
                  <p className="text-yellow-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(user._id)}
                  disabled={deleteLoading}
                  className="px-3 py-1 text-sm text-red-400  hover hover:text-red-600  "
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={goPrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-200"
          >
            Previous
          </button>

          <span className="flex items-center text-gray-600 font-semibold">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            onClick={goNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500/80 text-white rounded disabled:bg-blue-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
 //gfhfg
 