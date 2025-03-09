import type { FormAction, FormState, GenericFormSchema } from "../types";
import React from "react";
import * as v from "valibot";

type Args<TSchema extends GenericFormSchema> = {
  action: FormAction<TSchema>;
  initialFormState: FormState<TSchema>;
};

export function useFormAction<TSchema extends GenericFormSchema>(
  args: Args<TSchema>
) {
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
