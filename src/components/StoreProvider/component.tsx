"use client";

import React from "react";
import { createStore } from "zustand";
import { Store } from "./types";
import {
  createLogin,
  createLogout,
  createSetToast,
  createToggleIsDarkTheme,
} from "./runtime";
import { DARK_THEME_CLASS_NAME, IS_DARK_THEME_COOKIE_NAME } from "@/constants";
import { StoreContext } from "./context";
import Cookies from "js-cookie";
import type { User } from "@/schemas";

type Props = React.PropsWithChildren<{
  initialIsDarkTheme: boolean;
  initialUser: User | null;
}>;

export function StoreProvider({
  children,
  initialIsDarkTheme,
  initialUser,
}: Props) {
  const store = React.useMemo(
    () =>
      createStore<Store>((set) => ({
        isDarkTheme: initialIsDarkTheme ?? false,
        toast: null,
        user: initialUser,
        toggleIsDarkTheme: createToggleIsDarkTheme(set),
        setToast: createSetToast(set),
        login: createLogin(set),
        logout: createLogout(set),
      })),
    [initialIsDarkTheme, initialUser]
  );

  store.subscribe((cur, prev) => {
    if (cur.isDarkTheme !== prev.isDarkTheme) {
      const rootClassList = document.documentElement.classList;
      if (cur.isDarkTheme) {
        rootClassList.add(DARK_THEME_CLASS_NAME);
      } else {
        rootClassList.remove(DARK_THEME_CLASS_NAME);
      }
      Cookies.set(IS_DARK_THEME_COOKIE_NAME, JSON.stringify(cur.isDarkTheme));
    }
  });

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
