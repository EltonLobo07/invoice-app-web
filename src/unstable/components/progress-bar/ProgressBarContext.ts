"use client";

import React from "react";
import type { useProgress } from "./useProgress";

export const ProgressBarContext = React.createContext<ReturnType<
  typeof useProgress
> | null>(null);
