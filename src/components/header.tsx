import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Tab } from "@/types/app-types";
import { NavLink } from "react-router-dom";

function Header() {
  const navItems: {
    [key in Tab]?: {
      name: string;
      path: string;
    };
  } = {
    "light-cones": {
      name: "Light Cones",
      path: "light-cones",
    },
    relics: {
      name: "Relics",
      path: "relics",
    },
    characters: {
      name: "Characters",
      path: "characters",
    },
    settings: {
      name: "Settings",
      path: "settings",
    },
  };

  return (
    <div className="flex h-fit w-full items-center gap-3 border-b">
      <div className="flex w-full items-center justify-center gap-2 md:justify-start">
        <div className=" mx-5 hidden text-lg font-bold md:block">
          Star Rail Dashboard
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex-wrap justify-start">
            {Object.values(navItems).map((value) => (
              <NavigationMenuItem key={value?.name}>
                <NavLink
                  to={value?.path}
                  className={({ isActive }) =>
                    `inline-flex h-10 w-max items-center justify-center rounded-md px-3 py-2 text-sm transition-colors duration-300 hover:text-foreground disabled:pointer-events-none disabled:opacity-50 ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`
                  }
                  end
                >
                  {value?.name}
                </NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

export default Header;
