import { Outlet } from "react-router-dom";
import Header from "../ui/header";

function MainLayout() {
  return (
    <div className="h-screen bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
