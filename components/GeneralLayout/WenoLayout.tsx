import React, { FC, ReactNode } from "react";
import { NavBarWithSubmenu } from "../NavbarWithSubmenu/NavBarWithSubmenu";

export interface NavBarProps {
  authenticated: boolean;
  loginFn: (options?: any) => void;
  logoutFn: () => void;
  email: string;
  preferred_username: string;
  isVisitor: boolean;
  isOwner: boolean;
}
export interface WenoLayoutProps extends NavBarProps {
  children: ReactNode;
}
export const WenoLayout: FC<WenoLayoutProps> = ({
  children,
  logoutFn,
  loginFn,
  authenticated,
  email,
  preferred_username,
  isVisitor,
  isOwner,
}) => {
  return (
    <>
      <NavBarWithSubmenu
        logoutFn={logoutFn}
        loginFn={loginFn}
        authenticated={authenticated}
        email={email}
        preferred_username={preferred_username}
        isVisitor={isVisitor}
        isOwner={isOwner}
      />
      {children}
    </>
  );
};
