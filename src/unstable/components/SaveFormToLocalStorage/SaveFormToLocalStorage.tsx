import React from "react";
import { useWatch, type Control } from "react-hook-form";

type Args = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  lsKey: string;
  defaultValuesLoaded: boolean;
};

export function SaveFormToLocalStorage(args: Args) {
  const formValues = useWatch({ control: args.control });
  console.log({ formValues });

  React.useEffect(() => {
    if (!args.defaultValuesLoaded) {
      return;
    }
    try {
      localStorage.setItem(args.lsKey, JSON.stringify(formValues));
    } catch (error) {
      console.error(error);
    }
  }, [args.defaultValuesLoaded, args.lsKey, formValues]);

  return null;
}
