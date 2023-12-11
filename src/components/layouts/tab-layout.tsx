import { ReactNode } from "react";

interface TabLayoutProps {
  children: ReactNode;
}
function TabLayout({ children }: TabLayoutProps) {
  return <div className="mx-12 my-2 mt-8">{children}</div>;
}

export default TabLayout;
