"use client";

import { createOnSubmit, useFormAction } from "@/utils/form";
import { signup } from "./actions";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { SignupSchema } from "./schemas";
import { classJoin } from "@/utils/general";
import { LabelledInputWithErrMsg } from "./LabelledInputWithErrMsg";
import { SubmitBtn } from "./SubmitBtn";

export function SignupForm() {
  const { formAction, formRef, formIsSubmitting } = useFormAction({
    action: signup,
    initialFormState: {},
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(SignupSchema),
    defaultValues: {},
  });

  const onSubmit = createOnSubmit({
    formRef,
    schema: SignupSchema,
    submit: handleSubmit(() => {}),
  });

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      className={classJoin(
        "p-8",
        "bg-white dark:bg-ds-12",
        "rounded-md",
        "border border-ds-5 dark:border-ds-4",
        "w-full max-w-md"
      )}
    >
      <LabelledInputWithErrMsg
        $label="Username"
        $errorMsg={errors["username"]?.message}
        $padding="sm"
        type="text"
        {...register("username")}
      />
      <LabelledInputWithErrMsg
        $label="Email"
        $errorMsg={errors["email"]?.message}
        $padding="sm"
        type="email"
        {...register("email")}
      />
      <LabelledInputWithErrMsg
        $label="Password"
        $errorMsg={errors["password"]?.message}
        $padding="sm"
        type="password"
        {...register("password")}
      />
      <LabelledInputWithErrMsg
        $label="Password confirmation"
        $errorMsg={errors["passwordConfirmation"]?.message}
        $padding="sm"
        type="password"
        {...register("passwordConfirmation")}
      />
      <SubmitBtn isFormSubmitting={formIsSubmitting} />
    </form>
  );
}
