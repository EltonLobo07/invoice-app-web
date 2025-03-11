import type { StoreGetter, StoreSetter, ToastWithoutId } from "./types";
import { Serializable } from "@/utils/serialize";
import Cookies from "js-cookie";
import { DARK_THEME_CLASS_NAME } from "@/constants";

// ------------ action creators ------------
export function toggleIsDarkTheme(set: StoreSetter, get: StoreGetter): boolean {
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

export function createSetToast(
  set: StoreSetter
): (toast: ToastWithoutId | null) => void {
  return function (toast: ToastWithoutId | null) {
    set({
      toast: toast === null ? null : { ...toast, id: crypto.randomUUID() },
    });
  };
}

// ------------ middleware ------------
export function syncCookie(
  set: StoreSetter,
  get: StoreGetter,
  cookieName: string,
  fn: (set: StoreSetter, get: StoreGetter) => Serializable
) {
  return () => Cookies.set(cookieName, JSON.stringify(fn(set, get)));
}
