import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryTree from "../Components/CategoryTree";
import PostsTable from "../Components/PostsTable";
import UserDetails from "../Components/UserDetails";

const Home = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row items-start p-4 gap-4 justify-between w-full">
      <div className="flex flex-col justify-between h-[650px]">
        <CategoryTree />
        <UserDetails />
      </div>
      <div className="flex-grow">
        <PostsTable />
      </div>
    </div>
  );
};

export default Home;
