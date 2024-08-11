import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <nav>
        <Topbar />
      </nav>
      <section className="grid grid-cols-12">
        <div className="hidden md:block md:col-span-3">
          <LeftSidebar />
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="h-[calc(100vh-120px)] sm:h-screen overflow-y-scroll scrollbar">
            <Outlet />
          </div>
          <Bottombar />
        </div>
      </section>
    </>
  );
};

export default RootLayout;
