import Characters from "@/features/characters";
import LightCones from "@/features/lightcones";
import Relics from "@/features/relics";
import MainLayout from "@/components/layouts/main-layout";
import { createHashRouter } from "react-router-dom";

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
    ],
  },
]);
