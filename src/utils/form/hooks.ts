import type { FormAction, FormState, GenericFormSchema } from "./types";
import React from "react";

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
  const id = React.useId();
  const getId = React.useCallback((name: string) => `${id}-${name}`, [id]);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  return {
    formState,
    formAction,
    formIsSubmitting,
    formRef,
    getId,
  };
}
