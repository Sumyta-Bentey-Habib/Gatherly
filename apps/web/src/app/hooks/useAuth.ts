"use client";

import { useSession, signOut as authSignOut } from "../../lib/auth-client";

export function useAuth() {
  const { data: session, isPending } = useSession();

  const signOut = async () => {
    await authSignOut();
  };

  return {
    user: session?.user,
    role: session?.user?.role,
    isLoading: isPending,
    signOut,
  };
}
