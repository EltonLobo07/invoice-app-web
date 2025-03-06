"use client";

import type { Serializable } from "@/utils";
import React from "react";
import {
  createStore,
  useStore,
  type StateCreator,
  type StoreApi,
} from "zustand";
import Cookies from "js-cookie";
import { DARK_THEME_CLASS_NAME, IS_DARK_THEME_COOKIE_NAME } from "@/constants";

// ------------ component ------------
export function StoreProvider({ children, initialIsDarkTheme }: Props) {
  const store = React.useMemo(
    () =>
      createStore<Store>((set, get) => ({
        isDarkTheme: initialIsDarkTheme ?? false,
        toggleIsDarkTheme: syncCookie(
          set,
          get,
          IS_DARK_THEME_COOKIE_NAME,
          toggleIsDarkTheme
        ),
      })),
    [initialIsDarkTheme]
  );

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

// ------------ hook ------------
export function useStoreContext<T>(selector: (store: Store) => T) {
  const fromContext = React.useContext(StoreContext);
  if (fromContext === null) {
    throw new Error("`useStoreContext` must be used within a `StoreProvider`");
  }
  return useStore(fromContext, selector);
}

// ------------ types ------------
type StoreState = {
  isDarkTheme: boolean;
};

type StoreActions = {
  toggleIsDarkTheme: () => void;
};

type Store = StoreState & StoreActions;

type StoreSetter = Parameters<StateCreator<Store>>[0];

type StoreGetter = Parameters<StateCreator<Store>>[1];

type Props = React.PropsWithChildren<{ initialIsDarkTheme: boolean }>;

// ------------ context ------------
const StoreContext = React.createContext<StoreApi<Store> | null>(null);

// ------------ action creators ------------
function toggleIsDarkTheme(set: StoreSetter, get: StoreGetter): boolean {
  set(({ isDarkTheme }) => ({ isDarkTheme: !isDarkTheme }));
  const { isDarkTheme: newIsDarkTheme } = get();
  const rootClassList = document.documentElement.classList;
  if (newIsDarkTheme) {
    rootClassList.add(DARK_THEME_CLASS_NAME);
  } else {
    rootClassList.remove(DARK_THEME_CLASS_NAME);
  }
  return newIsDarkTheme;
}

// ------------ middleware ------------
function syncCookie(
  set: StoreSetter,
  get: StoreGetter,
  cookieName: string,
  fn: (set: StoreSetter, get: StoreGetter) => Serializable
) {
  return () => Cookies.set(cookieName, JSON.stringify(fn(set, get)));
}
