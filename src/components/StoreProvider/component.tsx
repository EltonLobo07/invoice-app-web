"use client";

import React from "react";
import { createStore } from "zustand";
import { Store } from "./types";
import { createSetToast, syncCookie, toggleIsDarkTheme } from "./runtime";
import { IS_DARK_THEME_COOKIE_NAME } from "@/constants";
import { StoreContext } from "./context";

type Props = React.PropsWithChildren<{ initialIsDarkTheme: boolean }>;

export function StoreProvider({ children, initialIsDarkTheme }: Props) {
  const store = React.useMemo(
    () =>
      createStore<Store>((set, get) => ({
        isDarkTheme: initialIsDarkTheme ?? false,
        toast: null,
        toggleIsDarkTheme: syncCookie(
          set,
          get,
          IS_DARK_THEME_COOKIE_NAME,
          toggleIsDarkTheme
        ),
        setToast: createSetToast(set),
      })),
    [initialIsDarkTheme]
  );

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
