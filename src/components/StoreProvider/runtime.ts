import type { User } from "@/schemas";
import type { StoreSetter, ToastWithoutId } from "./types";

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

export function createSetUser(set: StoreSetter): (user: User | null) => void {
  return function (user: User | null) {
    set({ user });
  };
}
