import React, { FC, ReactNode } from "react";
import { NavBarWithSubmenu } from "../NavbarWithSubmenu/NavBarWithSubmenu";

interface WenoLayoutProps {
  children: ReactNode;
}

export const WenoLayout: FC<WenoLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBarWithSubmenu />
      {children}
    </>
  );
};
