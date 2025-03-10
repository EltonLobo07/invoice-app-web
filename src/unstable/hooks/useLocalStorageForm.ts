import { valibotResolver } from "@hookform/resolvers/valibot";
import React from "react";
import {
  type DefaultValues,
  type FieldValues,
  type UseFormProps,
  useForm,
} from "react-hook-form";
import * as v from "valibot";

type Args<
  TFieldValues extends FieldValues,
  TDefaultValues extends DefaultValues<TFieldValues>,
  TContext
> = {
  lsKey: string;
  formSchema: v.GenericSchema<TFieldValues>;
  localStorageSchema: v.GenericSchema<TDefaultValues>;
  defaultValues?: UseFormProps<TFieldValues, TContext>["defaultValues"];
};

export function useLocalStorageForm<
  TFieldValues extends FieldValues,
  TDefaultValues extends DefaultValues<TFieldValues>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any
>(args: Args<TFieldValues, TDefaultValues, TContext>) {
  const [loading, setLoading] = React.useState(true);
  const { reset, ...restUseFormVals } = useForm({
    resolver: valibotResolver(args.formSchema),
    defaultValues: args.defaultValues,
  });

  React.useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoading(false);
      const formFromLS = localStorage.getItem(args.lsKey);
      if (formFromLS === null) {
        return;
      }
      try {
        const parsedForm = v.parse(
          args.localStorageSchema,
          JSON.parse(formFromLS),
          {
            abortEarly: true,
          }
        );
        reset(parsedForm);
      } catch {
        return;
      }
    })();
  }, [args.lsKey, args.localStorageSchema, reset]);

  return { loading, notLoading: !loading, reset, ...restUseFormVals };
}
