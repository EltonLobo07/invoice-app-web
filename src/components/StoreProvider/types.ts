import type { StateCreator } from "zustand";

type StoreState = {
  isDarkTheme: boolean;
};

type StoreActions = {
  toggleIsDarkTheme: () => void;
};

export type Store = StoreState & StoreActions;

export type StoreSetter = Parameters<StateCreator<Store>>[0];

export type StoreGetter = Parameters<StateCreator<Store>>[1];
