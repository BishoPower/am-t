"use client";

import { useState, useCallback } from "react";

type AuthMode = "signin" | "signup";

export const useAuthPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");

  const openSignIn = useCallback(() => {
    setMode("signin");
    setIsOpen(true);
  }, []);

  const openSignUp = useCallback(() => {
    setMode("signup");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const switchMode = useCallback((newMode: AuthMode) => {
    setMode(newMode);
  }, []);

  return {
    isOpen,
    mode,
    openSignIn,
    openSignUp,
    close,
    switchMode,
  };
};
