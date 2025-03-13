import React from "react";
import { StoreContext } from "./StoreContext";
import type { Store } from "./StorePovider.types";
import { useStore } from "zustand";

export function useStoreContext<T>(selector: (store: Store) => T) {
  const fromContext = React.useContext(StoreContext);
  if (fromContext === null) {
    throw new Error("`useStoreContext` must be used within a `StoreProvider`");
  }
  return useStore(fromContext, selector);
}
