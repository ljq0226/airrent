import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export const PriceTypeOptions = [
  { value: "DAILY", label: "日租" },
  { value: "WEEKLY", label: "周租" },
  { value: "MONTHLY", label: "月租" },
  { value: "QUARTERLY", label: "季租" },
  { value: "YEARLY", label: "年租" },
];
type PriceType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

export const PriceTypeMap: Record<PriceType, string> = {
  'DAILY': "日租",
  'WEEKLY': "周租",
  'MONTHLY': "月租",
  'QUARTERLY': "季租",
  'YEARLY': "年租",
}
export const RentTypeOptions = [
  { value: 0, label: "整租" },
  { value: 1, label: "合租" },
];
export const HouseDirection = [
  {value:'朝东',label:'朝东'},
  {value:'朝南',label:'朝南'},
  {value:'朝西',label:'朝西'},
  {value:'朝北',label:'朝北'},
]


export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "CMS",
    href: "/cms",
    icon: "dashboard",
    label: "cms",
    role:'LANDLORD'
  },
  {
    title:'房源管理',
    href:"/cms/listing",
    icon:'hotel',
    label:'listing'
  },
  {
    title: "User",
    href: "/cms/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Employee",
    href: "/cms/employee",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Profile",
    href: "/cms/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Kanban",
    href: "/cms/kanban",
    icon: "kanban",
    label: "kanban",
  },
  {
    title: "Login",
    href: "/",
    icon: "login",
    label: "login",
  },
];
