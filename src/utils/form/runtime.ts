import * as v from "valibot";
import type { FormErrors, GenericFormSchema } from "./types";

type AtLeastOne<T> = [T, ...T[]];

export function getFormErrors<TSchema extends GenericFormSchema>(
  issues: AtLeastOne<v.InferIssue<TSchema>>
): FormErrors<TSchema> {
  const formErrors: FormErrors<TSchema> = {};
  const { nested } = v.flatten<TSchema>(issues);
  if (nested === undefined) {
    return formErrors;
  }
  for (const k of Object.keys(nested)) {
    const error = nested[k as keyof typeof nested]?.[0];
    if (error === undefined) {
      continue;
    }
    formErrors[k as keyof typeof formErrors] = error;
  }
  return formErrors;
}

export function toObject(formData: FormData): Record<string, string> {
  const res: Record<string, string> = {};
  for (const [k, v] of formData.entries()) {
    res[k] = v.toString();
  }
  return res;
}

function isParseSuccessful(schema: v.GenericSchema, data: unknown): boolean {
  return v.safeParse(schema, data, { abortEarly: true }).success;
}

type CreateOnSubmitArgs = {
  schema: GenericFormSchema;
  submit: () => void;
  formRef: React.RefObject<HTMLFormElement | null>;
};

export function createOnSubmit({
  schema,
  submit,
  formRef,
}: CreateOnSubmitArgs): (e: React.FormEvent<HTMLFormElement>) => void {
  return (e: React.FormEvent<HTMLFormElement>) => {
    if (!isParseSuccessful(schema, toObject(new FormData(e.currentTarget)))) {
      e.preventDefault();
      submit();
      return;
    }
    formRef.current?.requestSubmit();
  };
}

// export function getSubmissionId(): string {
//   return crypto.randomUUID();
// }
