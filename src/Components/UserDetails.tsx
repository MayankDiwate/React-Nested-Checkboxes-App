import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const parsedUserData = JSON.parse(userData!);

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-slate-50 p-2 rounded-md">
      <div className="flex items-center justify-between">
        <div className="font-bold text-lg">{parsedUserData.name}</div>
        <LogOut onClick={logOut} size={22} className="cursor-pointer" />
      </div>
      <div className="text-sm">{parsedUserData.email}</div>
      <div className="text-sm">{parsedUserData.phone}</div>
    </div>
  );
};

export default UserDetails;
