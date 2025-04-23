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
import { classJoin } from "@/utils/general";

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
    setValue,
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
      <form onSubmit={handleSubmit((input) => formAction({ input }))}>
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
        <button
          type="button"
          onClick={() => {
            setValue("email", "guest_user@gmail.com", {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
            setValue("password", "guest_user@123", {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
          }}
          className={classJoin(
            "bg-[#F9FAFE] hover:bg-ds-5 dark:bg-ds-4 hover:dark:bg-ds-8",
            "text-ds-7 dark:test-ds-5",
            "rounded-sm",
            "px-16px py-3",
            "typography-heading-s-var",
            "w-full",
            "flex justify-center items-center gap-x-1",
            "mt-4"
          )}
        >
          Add guest details
        </button>
      </form>
    </>
  );
}
