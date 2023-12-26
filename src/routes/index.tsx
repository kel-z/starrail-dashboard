import { CharactersPage } from "@/features/characters";
import { LightConesPage } from "@/features/light-cones";
import { RelicsPage } from "@/features/relics";
import MainLayout from "@/components/layouts/main-layout";
import { createHashRouter } from "react-router-dom";
import { SettingsPage } from "@/features/settings";

const routes = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "light-cones",
        element: <LightConesPage />,
      },
      {
        path: "relics",
        element: <RelicsPage />,
      },
      {
        path: "characters",
        element: <CharactersPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

export default routes;
