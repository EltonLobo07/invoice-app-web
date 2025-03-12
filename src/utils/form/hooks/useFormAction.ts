import type { FormAction, FormState, GenericFormSchema } from "../types";
import React from "react";
import * as v from "valibot";

type Args<
  TSchema extends GenericFormSchema,
  TSuccessData = unknown,
  TFailedData = unknown
> = {
  action: FormAction<TSchema, TSuccessData, TFailedData>;
  initialFormState: FormState<TSuccessData, TFailedData>;
};

export function useFormAction<
  TSchema extends GenericFormSchema,
  TSuccessData = unknown,
  TFailedData = unknown
>(args: Args<TSchema, TSuccessData, TFailedData>) {
  const [formState, formAction, formIsSubmitting] = React.useActionState(
    args.action,
    args.initialFormState
  );
  const [, startTransition] = React.useTransition();
  const wrappedFormAction = React.useCallback(
    (data: v.InferInput<TSchema>) => {
      startTransition(() => formAction(data));
    },
    [startTransition, formAction]
  );

  return {
    formState,
    formAction: wrappedFormAction,
    formIsSubmitting,
  };
}
