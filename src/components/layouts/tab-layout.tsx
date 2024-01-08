import { ReactNode } from "react";

interface TabLayoutProps {
  children: ReactNode;
}
function TabLayout({ children }: TabLayoutProps) {
  return (
    <div className="mb-2 mt-8 flex w-full justify-center px-2 sm:px-12">
      <div className="w-full max-w-[1600px]">{children}</div>
    </div>
  );
}

export default TabLayout;
