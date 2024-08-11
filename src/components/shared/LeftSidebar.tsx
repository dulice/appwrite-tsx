import { sidebarLinks } from "@/constants";
import Icon from "@mdi/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { mdiLogout } from "@mdi/js";
import { useUserLogout } from "@/lib/react-query/queries";
import Loader from "./Loader";

const LeftSidebar = () => {
  const { user, setIsAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const { mutateAsync, isPending: isLogginout } = useUserLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await mutateAsync();
    setIsAuthenticated(false);
    navigate("/signin");
  };
  return (
    <div className="leftSideBar">
      <div className="flex gap-2 my-4">
        <Link to={`/profile/${user.id}`}>
          <img src={user.imageUrl} alt="" className="avatar" />
        </Link>
        <div>
          <p>{user.name}</p>
          <p className="text-secondary">@{user.username}</p>
        </div>
      </div>
      {sidebarLinks.map((sidebar) => (
        <div
          key={sidebar.label}
          className={pathname === sidebar.route ? "active" : ""}
        >
          <Link to={sidebar.route} className="flex flex-1 gap-4 p-4">
            <Icon path={sidebar.icon} size={1} />
            <p>{sidebar.label}</p>
          </Link>
        </div>
      ))}
      <Button onClick={handleLogout} className="bg-transparent hover:bg-transparent absolute bottom-0">
        {isLogginout ? <Loader /> : <Icon path={mdiLogout} size={1} />}
        Logout
      </Button>
    </div>
  );
};

export default LeftSidebar;
