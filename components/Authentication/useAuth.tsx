import { useKeycloak } from "@react-keycloak/ssr";
import {
  KeycloakInstance,
  KeycloakLoginOptions,
  KeycloakTokenParsed,
} from "keycloak-js";
import { useMemo } from "react";

interface ParsedTokenExtended extends KeycloakTokenParsed {
  preferred_username: string | null;
  email: string | null;
  userType: "owner" | "visitor" | null;
}

export type ContextHeader = {
  fetchOptions: { headers: { Authorization: string } };
};

interface UseAuthHookResult {
  contextHeader: ContextHeader;
  tokenInfo: ParsedTokenExtended | null;
  authenticated: boolean;
  loading: boolean;
  notAuthenticated: boolean;
  isOwner: boolean;
  isVisitor: boolean;
  register: (options?: Keycloak.KeycloakLoginOptions) => void;
  login: (options?: Keycloak.KeycloakLoginOptions) => void;
}

type UseAuthHook = () => UseAuthHookResult;

const useAuth: UseAuthHook = () => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();

  const contextHeader: ContextHeader = useMemo(
    () => ({
      fetchOptions: {
        headers: {
          Authorization: "Bearer " + keycloak.token,
        },
      },
    }),
    [keycloak.token]
  );

  const tokenInfo: ParsedTokenExtended = keycloak.tokenParsed
    ? {
        ...keycloak.tokenParsed,
        // @ts-ignore
        preferred_username: keycloak.tokenParsed.preferred_username || null,
        // @ts-ignore
        email: keycloak.tokenParsed.email,
        // @ts-ignore
        userType: keycloak.tokenParsed.userType,
      }
    : null;

  const isOwner = tokenInfo && tokenInfo.userType === "owner";
  const isVisitor = tokenInfo && tokenInfo.userType === "visitor";

  const register: (options?: Keycloak.KeycloakLoginOptions) => void = (
    options?: KeycloakLoginOptions
  ) => {
    keycloak.register({ ...options });
  };

  const login: (options?: Keycloak.KeycloakLoginOptions) => void = (
    options?: KeycloakLoginOptions
  ) => {
    keycloak.login({ ...options });
  };

  return {
    contextHeader,
    tokenInfo,
    loading: !initialized && !keycloak.authenticated,
    notAuthenticated: initialized && !keycloak.authenticated,
    authenticated: initialized && keycloak.authenticated,
    isOwner,
    isVisitor,
    register,
    login,
  };
};

export default useAuth;
