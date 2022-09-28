import { DefaultSession } from "next-auth";

declare module "next-auth" {
  export type User = {
    id?: string;
    isOwner?: string;
    email?: string;
    preferred_username?: string;
  } & DefaultSession["user"];

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: User;
  }
}
