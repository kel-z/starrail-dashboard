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
    <div className="flex h-12 w-full items-center gap-3 border-b">
      <div className="hidden h-5 w-full items-center gap-2 sm:flex">
        <div className=" mx-5 text-lg font-bold">Star Rail Dashboard</div>
        <Separator orientation="vertical" />
        <NavigationMenu>
          <NavigationMenuList>
            {Object.values(navItems).map((value) => (
              <NavigationMenuItem key={value?.name}>
                <NavLink
                  to={value?.path}
                  className={({ isActive }) =>
                    `inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-accent"
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
