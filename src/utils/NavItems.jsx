 
import {  FaRegCreditCard} from 'react-icons/fa6';
import { ImHistory } from 'react-icons/im';
import { IoEarthSharp } from 'react-icons/io5';

export const navItems = [
  {
    id: 1,
    icon: <IoEarthSharp />,
    name: "Activity Log",
    path: "/activity",
  },
    {
    id: 2,
    icon: <ImHistory />,
    name: "History",
    path: "/history",
  },
  {
    id: 3,
    icon: <FaRegCreditCard />,
    name: "Subscription",
    path: "/subscription",
  },
];
