import { ReactNode } from "react";

interface TabLayoutProps {
  children: ReactNode;
}
function TabLayout({ children }: TabLayoutProps) {
  return <div className="mx-2 my-2 mt-8 sm:mx-12">{children}</div>;
}

export default TabLayout;
