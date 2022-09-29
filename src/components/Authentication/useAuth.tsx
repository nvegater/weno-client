import { useSession, signIn, signOut } from "next-auth/react";

export type ContextHeader = {
  fetchOptions: { headers: { Authorization: string } };
};

interface UseAuthHookResult {
  authenticated: boolean;
  loading: boolean;
  notAuthenticated: boolean;
  isOwner: boolean;
  isVisitor: boolean;
  register: (options?: any) => void;
  login: (options?: any) => void;
  logout: () => void;
  email: string;
  preferred_username: string;
}

type UseAuthHook = () => UseAuthHookResult;

const useAuth: UseAuthHook = () => {
  const { data, status } = useSession();
  status;

  const register: (options?: any) => void = (options?: any) => {
    signIn();
  };

  const login: (options?: any) => void = (options?: any) => {
    signIn();
  };

  const logout: () => void = () => {
    signOut();
  };

  return {
    loading: status == "loading",
    notAuthenticated: status == "unauthenticated",
    authenticated: status == "authenticated",
    isOwner: Boolean(data?.user.isOwner),
    isVisitor: !Boolean(data?.user.isOwner),
    email: data?.user?.email ?? "",
    preferred_username: data?.user?.preferred_username ?? "",
    register,
    login,
    logout,
  };
};

export default useAuth;
