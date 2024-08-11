import { bottombarLinks } from "@/constants";
import Icon from "@mdi/react";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
    const { pathname } = useLocation();
    return (
      <div className="bg-slate-800 p-1 block sm:hidden sticky bottom-0 w-full z-20">
        <div className="flex justify-between">
          {bottombarLinks.map((sidebar) => (
            <div key={sidebar.label} className={pathname === sidebar.route ? "active" : ""}>
              <Link to={sidebar.route} className="flex flex-col gap-1 py-1 px-4 items-center">
                <Icon path={sidebar.icon} size={0.8} />
                <p className="text-sm">{sidebar.label}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Bottombar;
