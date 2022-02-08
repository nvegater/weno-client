import { useKeycloak } from "@react-keycloak/ssr";
import {
  KeycloakInstance,
  KeycloakLoginOptions,
  KeycloakTokenParsed,
} from "keycloak-js";
import { useMemo, useState } from "react";
import { useWineryQuery } from "../../graphql/generated/graphql";
import { useEffectOnChange } from "../utils/react-utils";

export interface ParsedTokenExtended extends KeycloakTokenParsed {
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
  urlAlias: string | null;
  register: (options?: Keycloak.KeycloakLoginOptions) => void;
  login: (options?: Keycloak.KeycloakLoginOptions) => void;
  logout: () => void;
}

type UseAuthHook = () => UseAuthHookResult;

const useAuth: UseAuthHook = () => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const [urlAlias, setUrlAlias] = useState<string | null>(null);

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

  const tokenInfo: ParsedTokenExtended | null = keycloak.tokenParsed
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

  const [{ data: wineryResponse }] = useWineryQuery({
    variables: {
      getWineryInputs: {
        creatorUsername: tokenInfo?.preferred_username
          ? tokenInfo.preferred_username
          : null,
      },
    },
    pause:
      !Boolean(tokenInfo) ||
      (Boolean(tokenInfo) && tokenInfo.userType === "visitor"),
    context: contextHeader,
    requestPolicy: "cache-first",
  });

  useEffectOnChange(() => {
    if (tokenInfo.userType === "owner") {
      setUrlAlias(wineryResponse?.winery?.winery.urlAlias ?? null);
    }
  }, [wineryResponse]);

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

  const logout: () => void = () => {
    keycloak.logout();
  };

  return {
    contextHeader,
    tokenInfo,
    loading: !initialized && !keycloak.authenticated,
    notAuthenticated: initialized && !keycloak.authenticated,
    authenticated: initialized && keycloak.authenticated,
    isOwner,
    isVisitor,
    urlAlias: urlAlias,
    register,
    login,
    logout,
  };
};

export default useAuth;
