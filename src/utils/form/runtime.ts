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

export function getSubmissionId(): string {
  return crypto.randomUUID();
}

export function toObject(formData: FormData): Record<string, string> {
  const res: Record<string, string> = {};
  for (const [k, v] of formData.entries()) {
    res[k] = v.toString();
  }
  return res;
}
