"use client";

import { useFormAction } from "@/utils/form";
import { signup } from "./actions";
import { SignupSchema } from "./schemas";
// import { classJoin } from "@/utils/general";
import { LabelledInputWithErrMsg } from "./LabelledInputWithErrMsg";
import { SubmitBtn } from "./SubmitBtn";
import React from "react";
import { Announcer, useStoreContext } from "@/components";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";

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
      setToast({ type: "Success", message: "Signup was successful" });
      router.push("/login");
    }
  }, [formState, setToast, router]);

  return (
    <>
      <Announcer message={formIsSubmitting ? "submitting form" : undefined} />
      <form onSubmit={handleSubmit(formAction)}>
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
    </>
  );
}
