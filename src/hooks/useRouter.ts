import { startHolyLoader } from "holy-loader";
import { useRouter as useNextRouter } from "next/navigation";
import React from "react";

type NextRouter = ReturnType<typeof useNextRouter>;

export function useRouter() {
  const nextRouter = useNextRouter();
  return React.useMemo(() => {
    return {
      push(...params: Parameters<NextRouter["push"]>) {
        startHolyLoader();
        nextRouter.push(...params);
      },
      replace(...params: Parameters<NextRouter["replace"]>) {
        startHolyLoader();
        nextRouter.replace(...params);
      },
      refresh() {
        nextRouter.refresh();
      },
    };
  }, [nextRouter]);
}
