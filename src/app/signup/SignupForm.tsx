"use client";

import { useFormAction } from "@/utils/form";
import { signup } from "./signup.action";
import { SignupSchema } from "./signup.schema";
import React from "react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useStoreContext } from "@/providers/StoreProvider";
import {
  Announcer,
  LabelledInputWithErrMsg,
  LabelledPasswordWithErrMsg,
} from "@/components/general";
import { SubmitBtn } from "@/components/auth";
import { useRouter } from "@/hooks";

export function SignupForm() {
  const { formState, formIsSubmitting, formAction } = useFormAction({
    action: signup,
    initialFormState: {},
  });
  const setToast = useStoreContext((s) => s.setToast);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(SignupSchema),
    defaultValues: {},
  });

  React.useEffect(() => {
    if (formState.type === "error") {
      setToast({ type: "Error", message: formState.message });
    }
  }, [formState, setToast]);

  React.useEffect(() => {
    if (formState.type === "success") {
      setToast({ type: "Success", message: formState.message });
      router.push("/login");
    }
  }, [formState, setToast, router]);

  return (
    <>
      <Announcer message={formIsSubmitting ? "submitting form" : undefined} />
      <form onSubmit={handleSubmit((input) => formAction({ input }))}>
        <LabelledInputWithErrMsg
          $label="Username"
          $errorMsg={errors["username"]?.message}
          $padding="sm"
          type="text"
          autoFocus={true}
          {...register("username")}
        />
        <LabelledInputWithErrMsg
          $label="Email"
          $errorMsg={errors["email"]?.message}
          $padding="sm"
          type="email"
          {...register("email")}
        />
        <LabelledPasswordWithErrMsg
          $label="Password"
          $errorMsg={errors["password"]?.message}
          $padding="sm"
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
    </>
  );
}
