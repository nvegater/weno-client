import React, { FC, ReactNode } from "react";
import { NavBarWithSubmenu } from "../NavbarWithSubmenu/NavBarWithSubmenu";
import { KeycloakLoginOptions } from "keycloak-js";
import { ContextHeader, ParsedTokenExtended } from "../Authentication/useAuth";

export interface NavBarProps {
  authenticated: boolean;
  loginFn: (options?: KeycloakLoginOptions) => void;
  logoutFn: () => void;
  tokenInfo: ParsedTokenExtended | null;
  contextHeader: ContextHeader;
}
export interface WenoLayoutProps extends NavBarProps {
  children: ReactNode;
}
export const WenoLayout: FC<WenoLayoutProps> = ({
  children,
  logoutFn,
  loginFn,
  tokenInfo,
  authenticated,
  contextHeader,
}) => {
  return (
    <>
      <NavBarWithSubmenu
        contextHeader={contextHeader}
        logoutFn={logoutFn}
        loginFn={loginFn}
        tokenInfo={tokenInfo}
        authenticated={authenticated}
      />
      {children}
    </>
  );
};
