import AdminDashboard from "../../components/dashboard/AdminDashboard";
import UserDashboard from "../../components/dashboard/WeeklyGraph";
import { useAuth } from "../../context/AuthContext";
import UserDashboardPage from "./UserDashboardPage";
 

export const DashboardPage = () => {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return <AdminDashboard />;
  }

  return <UserDashboardPage/>
};
