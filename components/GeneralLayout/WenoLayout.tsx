import React, { FC, ReactNode } from "react";
import { NavBarWithSubmenu } from "../NavbarWithSubmenu/NavBarWithSubmenu";
import { KeycloakLoginOptions } from "keycloak-js";
import { ParsedTokenExtended } from "../Authentication/useAuth";

export interface NavBarProps {
  authenticated: boolean;
  loginFn: (options?: KeycloakLoginOptions) => void;
  logoutFn: () => void;
  tokenInfo: ParsedTokenExtended | null;
  urlAlias: string | null;
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
  urlAlias,
}) => {
  return (
    <>
      <NavBarWithSubmenu
        logoutFn={logoutFn}
        loginFn={loginFn}
        tokenInfo={tokenInfo}
        authenticated={authenticated}
        urlAlias={urlAlias}
      />
      {children}
    </>
  );
};
