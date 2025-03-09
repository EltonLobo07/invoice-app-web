import React from "react";

type Args = {
  reset: () => void;
  formState: { type?: "success" | "error" };
};

export function useResetOnSuccess({ reset, formState }: Args) {
  React.useEffect(() => {
    if (formState.type === "success") {
      reset();
    }
  }, [reset, formState]);
}
