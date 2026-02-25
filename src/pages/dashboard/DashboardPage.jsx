import AdminDashboard from "../../components/dashboard/AdminDashboard";
import UserDashboardPage from "./UserDashboardPage";
import { useAuth } from "../../context/AuthContext";
import useLogout from "../../hooks/auth/useLogout";
 

export const DashboardPage = () => {
  const { user } = useAuth(); 
  const { logout, loading } = useLogout();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-600">MyDashboard</div>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Hello, {user?.name}</span>
 
          {user?.role === "admin" && (
            <span className="text-gray-500 bg-indigo-100 px-3 py-1 rounded-full text-sm font-semibold">
              Admin
            </span>
          )}
          <button
            onClick={logout}
            disabled={loading}  
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </nav>

      <main className="px-6 py-6">
        <span className="text-green-700 font-medium">your userId, {user?.userId}</span>
        {user?.role === "admin" ? <AdminDashboard /> : <UserDashboardPage />}
      </main>
    </div>
  );
};