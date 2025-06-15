"use client";

import React, { ReactNode, useEffect } from "react";
import useAuthStore from "@/stores/authStore";
import { usePathname } from "next/navigation";
import { getAuthMy } from "@/services/auth/getAuthMy";

const AuthProvider = ({
  initialAuth,
  children,
}: {
  initialAuth: boolean;
  children: ReactNode;
}) => {
  const { setIsAuthenticated, logout } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    setIsAuthenticated(initialAuth);
  }, [initialAuth, setIsAuthenticated]);

  useEffect(() => {
    if (!initialAuth) return;

    const checkAuthOnRouteChange = async () => {
      try {
        const result = await getAuthMy();
        if (result.result.shouldLogout) {
          logout();
        }
      } catch (error) {
        console.error("인증 확인 실패:", error);
      }
    };

    checkAuthOnRouteChange();
  }, [pathname, initialAuth, logout]);

  return <>{children}</>;
};

export default AuthProvider;
