import type { User } from "@/schemas";
import type { StateCreator } from "zustand";

export type Toast = { id: string; message: string; type: "Success" | "Error" };
export type ToastWithoutId = Omit<Toast, "id">;

type StoreState = {
  toast: Toast | null;
  user: User | null;
  isDarkTheme: boolean;
};

type StoreActions = {
  setToast: (toast: ToastWithoutId | null) => void;
  // setUser: (user: User | null) => void;
  login: (user: User, jwt: string) => void;
  logout: () => void;
  toggleIsDarkTheme: () => void;
};

export type Store = StoreState & StoreActions;

export type StoreSetter = Parameters<StateCreator<Store>>[0];

export type StoreGetter = Parameters<StateCreator<Store>>[1];
