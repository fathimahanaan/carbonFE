 
import {  FaCanadianMapleLeaf} from 'react-icons/fa6';
import { ImHistory } from 'react-icons/im';
import { IoEarthSharp } from 'react-icons/io5';

export const navItems = [
  {
    id: 1,
    icon: <IoEarthSharp />,
    name: "Activity Log",
    path: "/activity",
    role: "user",
    description: "Calculate your emission",
  },
    {
    id: 2,
    icon: <ImHistory />,
    name: "History",
    path: "/history",
    role: "user",
     description: "Your past emissions",
  },
  {
    id: 3,
    icon: <FaCanadianMapleLeaf />,
    name: "Educational Resources",
    path: "/resources",
    role: "all",
    description: "tips and resources",
  },
  
];
