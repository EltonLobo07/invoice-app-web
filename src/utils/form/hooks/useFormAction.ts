import type { FormAction, FormState, GenericFormSchema } from "../types";
import React from "react";
import * as v from "valibot";

type Args<
  TSchema extends GenericFormSchema,
  TSuccessData = unknown,
  TFailedData = unknown,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  TAdditionalInput extends Record<string, unknown> = {}
> = {
  action: FormAction<TSchema, TSuccessData, TFailedData, [], TAdditionalInput>;
  initialFormState: FormState<TSuccessData, TFailedData>;
};

export function useFormAction<
  TSchema extends GenericFormSchema,
  TSuccessData = unknown,
  TFailedData = unknown,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  TAdditionalInput extends Record<string, unknown> = {}
>(args: Args<TSchema, TSuccessData, TFailedData, TAdditionalInput>) {
  const [formState, formAction, formIsSubmitting] = React.useActionState(
    args.action,
    args.initialFormState
  );
  const [, startTransition] = React.useTransition();
  const wrappedFormAction = React.useCallback(
    (data: { input: v.InferInput<TSchema> } & TAdditionalInput) => {
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
