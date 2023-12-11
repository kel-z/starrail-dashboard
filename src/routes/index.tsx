import Characters from "@/features/characters";
import LightCones from "@/features/light-cones";
import Relics from "@/features/relics";
import MainLayout from "@/components/layouts/main-layout";
import { createHashRouter } from "react-router-dom";
import Settings from "@/features/settings";

export const routes = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "light-cones",
        element: <LightCones />,
      },
      {
        path: "relics",
        element: <Relics />,
      },
      {
        path: "characters",
        element: <Characters />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
