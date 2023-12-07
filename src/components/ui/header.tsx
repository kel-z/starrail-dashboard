import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Tab } from "@/types/app";
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
      path: "/hsr-inventory/light-cones",
    },
    relics: {
      name: "Relics",
      path: "/hsr-inventory/relics",
    },
    characters: {
      name: "Characters",
      path: "/hsr-inventory/characters",
    },
  };

  return (
    <div className="border-b-accent flex h-12 items-center gap-3 border-b">
      <div className="hidden h-5 items-center gap-2 sm:flex">
        <div className=" text-primary-foreground ml-5 text-lg font-bold">
          HSR Inventory Viewer
        </div>
        <Separator orientation="vertical" />
        <NavigationMenu>
          <NavigationMenuList>
            {Object.values(navItems).map((value) => (
              <NavigationMenuItem key={value?.name}>
                <NavLink
                  to={value?.path}
                  className={({ isActive }) =>
                    `bg-background hover:bg-accent inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${
                      isActive ? "text-primary" : "text-primary-foreground"
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
