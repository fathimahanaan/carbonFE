 
import { FaCalculator, FaRegCreditCard, FaUserGraduate } from 'react-icons/fa6';

export const navItems = [
  {
    id: 1,
    icon: <FaCalculator />,
    name: "Activity Log",
    path: "/activity",
  },
    {
    id: 2,
    icon: <FaUserGraduate />,
    name: "History",
    path: "/students",
  },
  {
    id: 3,
    icon: <FaRegCreditCard />,
    name: "Subscription",
    path: "/subscription",
  },
];
