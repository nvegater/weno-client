import React, { FC, ReactNode } from "react";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { Badge } from "@chakra-ui/react";

interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
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
