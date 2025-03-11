import type { StateCreator } from "zustand";

export type Toast = { id: string; message: string; type: "Success" | "Error" };
export type ToastWithoutId = Omit<Toast, "id">;

type StoreState = {
  toast: Toast | null;
  isDarkTheme: boolean;
};

type StoreActions = {
  setToast: (toast: ToastWithoutId | null) => void;
  toggleIsDarkTheme: () => void;
};

export type Store = StoreState & StoreActions;

export type StoreSetter = Parameters<StateCreator<Store>>[0];

export type StoreGetter = Parameters<StateCreator<Store>>[1];
