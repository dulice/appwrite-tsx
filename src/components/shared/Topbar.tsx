import { useAuth } from "@/context/AuthContext";
import { FcGlobe, FcImport } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useUserLogout } from "@/lib/react-query/queries";
import Loader from "./Loader";
import Icon from "@mdi/react";
import { mdiLogout } from "@mdi/js";

const Topbar = () => {
    const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, user } = useAuth();
  const { mutateAsync, isPending: isLogginout} = useUserLogout();

  const handleLogout = async () => {
    await mutateAsync();
    setIsAuthenticated(false);
    navigate('/signin');
    }

  return (
    <div className="bg-slate-800 px-4 h-14 w-full block sm:hidden">
      <div className="h-full max-w-5xl mx-auto flex justify-between items-center">
        <div className="logo">
          <FcGlobe className="text-3xl" />
          <p>Snapgram</p>
        </div>
        <div className="flex justify-end items-center gap-4">
          {isAuthenticated && (
            <>
              {isLogginout ? <Loader /> : <button onClick={handleLogout}><Icon path={mdiLogout} size={1}/></button>}
              <Link to={`/profile/${user.id}`}>
                <img src={user.imageUrl} alt="profile" className="avatar"/>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
