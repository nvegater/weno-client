import { useKeycloak } from "@react-keycloak/ssr";
import Keycloak, {
  KeycloakInstance,
  KeycloakLoginOptions,
  KeycloakLogoutOptions,
  KeycloakTokenParsed,
} from "keycloak-js";
import { useMemo } from "react";

export interface ParsedTokenExtended extends KeycloakTokenParsed {
  preferred_username: string;
  email: string;
  userType: "owner" | "visitor";
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
  logout: (options?: Keycloak.KeycloakLogoutOptions) => void;
}

type UseAuthHook = () => UseAuthHookResult;

export const parseKeycloakToken = (token: KeycloakTokenParsed) => {
  return {
    ...token,
    // @ts-ignore
    preferred_username: token.preferred_username,
    // @ts-ignore
    email: token.email,
    // @ts-ignore
    userType: token.userType,
  };
};

const useAuth: UseAuthHook = () => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();

  const getContextHeader: ContextHeader = useMemo(
    () => ({
      fetchOptions: {
        headers: {
          Authorization: "Bearer " + keycloak.token,
        },
      },
    }),
    [keycloak.token]
  );

  const tokenInfo: ParsedTokenExtended | null = keycloak.tokenParsed
    ? parseKeycloakToken(keycloak.tokenParsed)
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

  const logout: (options?: Keycloak.KeycloakLogoutOptions) => void = (
    options?: KeycloakLogoutOptions
  ) => {
    keycloak.logout({ ...options });
  };

  return {
    contextHeader: getContextHeader,
    tokenInfo,
    loading: !initialized && !keycloak.authenticated,
    notAuthenticated: initialized && !keycloak.authenticated,
    authenticated: initialized && keycloak.authenticated,
    isOwner,
    isVisitor,
    register,
    login,
    logout,
  };
};

export default useAuth;
