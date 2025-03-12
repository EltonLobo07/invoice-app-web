"use client";

import {
  Announcer,
  LabelledInputWithErrMsg,
  SubmitBtn,
  useStoreContext,
} from "@/components";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { LoginSchema } from "./schemas";
import { useFormAction } from "@/utils/form";
import { login } from "./actions";
import React from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const { formState, formAction, formIsSubmitting } = useFormAction({
    action: login,
    initialFormState: {},
  });
  const setToast = useStoreContext((s) => s.setToast);
  const setUser = useStoreContext((s) => s.setUser);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(LoginSchema),
    defaultValues: {},
  });

  React.useEffect(() => {
    if (formState.type === "error") {
      setToast({ type: "Error", message: formState.message });
    }
  }, [formState, setToast]);

  React.useEffect(() => {
    if (formState.type === "success") {
      setToast({ type: "Success", message: "Login was successful" });
      setUser(formState.data ?? null);
      router.push("/");
    }
  }, [formState, setToast, setUser, router]);

  return (
    <>
      <Announcer message={formIsSubmitting ? "submitting form" : undefined} />
      <form onSubmit={handleSubmit(formAction)}>
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
        <SubmitBtn isFormSubmitting={formIsSubmitting} />
      </form>
    </>
  );
}
