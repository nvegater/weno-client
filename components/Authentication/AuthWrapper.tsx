import React, { FC, ReactNode, useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance, KeycloakTokenParsed } from "keycloak-js";
import { Badge } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface AuthWrapperProps {
  children: ReactNode;
}

interface TokenParsedWithCustomAttribute extends KeycloakTokenParsed {
  userType: "visitor" | "owner" | "errorOnCustomAttribute";
}

export const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const [t] = useTranslation("global");
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
                {t("welcomeHeading")}{" "}
                {JSON.stringify(keycloak.tokenParsed, undefined, 4)}
              </div>

              <div>
                {t("welcomeHeading")}{" "}
                {JSON.stringify(
                  customToken ? customToken.userType : "",
                  undefined,
                  4
                )}
              </div>
              <button onClick={() => keycloak.logout()}>{t("logOut")}</button>
              {children}
            </>
          )}
          {!keycloak.authenticated && (
            <>
              <div>{t("LogInPlease")}</div>
              <button onClick={() => keycloak.login()} color="red">
                {t("LogIn")}
              </button>
              <Badge colorScheme="red">{t("notLoggedIn")}</Badge>
            </>
          )}
        </>
      )}
    </div>
  );
};
