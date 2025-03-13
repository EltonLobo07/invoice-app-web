"use client";

import React from "react";
import type { StoreApi } from "zustand";
import type { Store } from "./StorePovider.types";

export const StoreContext = React.createContext<StoreApi<Store> | null>(null);
