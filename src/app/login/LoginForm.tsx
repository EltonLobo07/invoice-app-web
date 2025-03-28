"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { LoginSchema } from "./login.schema";
import { useFormAction } from "@/utils/form";
import { login } from "./login.action";
import React from "react";
import { useStoreContext } from "@/providers/StoreProvider";
import {
  Announcer,
  LabelledInputWithErrMsg,
  LabelledPasswordWithErrMsg,
} from "@/components/general";
import { SubmitBtn } from "@/components/auth";
import { useRouter } from "@/hooks";

export function LoginForm() {
  const { formState, formAction, formIsSubmitting } = useFormAction({
    action: login,
    initialFormState: {},
  });
  const setToast = useStoreContext((s) => s.setToast);
  const loginFromStore = useStoreContext((s) => s.login);
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
      const {
        message,
        data: { user, jwt },
      } = formState;
      setToast({ type: "Success", message });
      loginFromStore(user, jwt);
      router.push("/");
    }
  }, [formState, setToast, loginFromStore, router]);

  return (
    <>
      <Announcer message={formIsSubmitting ? "submitting form" : undefined} />
      <form onSubmit={handleSubmit(formAction)}>
        <LabelledInputWithErrMsg
          $label="Email"
          $errorMsg={errors["email"]?.message}
          $padding="sm"
          type="email"
          autoFocus={true}
          {...register("email")}
        />
        <LabelledPasswordWithErrMsg
          $label="Password"
          $errorMsg={errors["password"]?.message}
          $padding="sm"
          {...register("password")}
        />
        <SubmitBtn isFormSubmitting={formIsSubmitting} />
      </form>
    </>
  );
}
