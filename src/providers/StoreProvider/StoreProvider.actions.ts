import type { User } from "@/schemas";
import type { StoreSetter, ToastWithoutId } from "./StorePovider.types";
import Cookies from "js-cookie";
import { USER_JWT_COOKIE_NAME } from "@/constants/general";

export function createToggleIsDarkTheme(set: StoreSetter): () => void {
  return function () {
    set(({ isDarkTheme }) => ({ isDarkTheme: !isDarkTheme }));
  };
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

export function createLogin(
  set: StoreSetter
): (user: User, jwt: string) => void {
  return function (user, jwt) {
    set({ user });
    Cookies.set(USER_JWT_COOKIE_NAME, jwt);
  };
}

export function createLogout(set: StoreSetter): () => void {
  return function () {
    set({ user: null });
    Cookies.remove(USER_JWT_COOKIE_NAME);
  };
}

export function createSetUser(set: StoreSetter): (user: User | null) => void {
  return function (user: User | null) {
    set({ user });
  };
}
