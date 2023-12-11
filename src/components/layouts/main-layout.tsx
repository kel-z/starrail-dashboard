import { Outlet } from "react-router-dom";
import Header from "../ui/header";

function MainLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
