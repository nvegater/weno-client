import React, { FC, ReactNode, useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance, KeycloakTokenParsed } from "keycloak-js";
import { Badge } from "@chakra-ui/react";

interface AuthWrapperProps {
  children: ReactNode;
}

interface TokenParsedWithCustomAttribute extends KeycloakTokenParsed {
  userType: "visitor" | "owner" | "errorOnCustomAttribute";
}

export const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();

  const [customToken, setCustomToken] =
    useState<TokenParsedWithCustomAttribute | null>(null);

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      const token = keycloak.tokenParsed as TokenParsedWithCustomAttribute;
      setCustomToken({
        ...token,
        userType: token.userType || "errorOnCustomAttribute",
      });
    }
  }, [keycloak.authenticated, initialized]);

  return (
    <div>
      {initialized && (
        <>
          {keycloak.authenticated && (
            <>
              <div>
                Youre logged in, welcome,{" "}
                {JSON.stringify(keycloak.tokenParsed, undefined, 4)}
              </div>

              <div>
                Youre logged in, welcome,{" "}
                {JSON.stringify(
                  customToken ? customToken.userType : "",
                  undefined,
                  4
                )}
              </div>
              <button onClick={() => keycloak.logout()}>Logout</button>
              {children}
            </>
          )}
          {!keycloak.authenticated && (
            <>
              <div>Login pls</div>
              <button onClick={() => keycloak.login()} color="red">
                Login
              </button>
              <Badge colorScheme="red">Not logged in</Badge>
            </>
          )}
        </>
      )}
    </div>
  );
};
