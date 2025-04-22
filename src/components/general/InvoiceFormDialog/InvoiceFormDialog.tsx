"use client";

import { useRouter } from "@/hooks";
import { ArrowDown } from "@/icons";
import { classJoin } from "@/utils/general";
import * as Ariakit from "@ariakit/react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { LabelledInputWithErrMsg } from "../LabelledInputWithErrMsg";
import { Legend } from "./Legend";
import { AddressInputs } from "./AddressInputs";
import { PaymentTermSelect } from "./PaymentTermSelect";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  InputInvoiceSchema,
  ItemPriceSchema,
  ItemQuantitySchema,
} from "./schemas";
import * as v from "valibot";
import { ItemInputs } from "./ItemInputs";
import { useFormAction } from "@/utils/form";
import { InvoiceFormAction } from "./invoice-form.action";
import { useStoreContext } from "@/providers/StoreProvider";
import { SubmitBtnContent } from "./SubmitBtnContent";
import { SubmitBtn } from "./SubmitBtn";

type Props = {
  onCloseDeleteSearchParam: string;
  jwt: string;
} & (
  | { type: "create" }
  | {
      type: "edit";
      invoiceId: string;
      invoice: v.InferOutput<typeof InputInvoiceSchema>;
    }
);

export function InvoiceFormDialog(props: Props) {
  const [open, setOpen] = React.useState(true);
  const { formState, formAction, formIsSubmitting } = useFormAction({
    action: InvoiceFormAction.bind(null, props.jwt),
    initialFormState: {},
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setToast = useStoreContext((s) => s.setToast);
  const [recentSubmissionIntent, setRecentSubmissionIntent] = React.useState<
    "save" | "save-as-draft" | null
  >(null);

  const onExitAnimationComplete = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(props.onCloseDeleteSearchParam);
    const newSearchParamStr = newSearchParams.toString();
    router.push(
      `${pathname}${newSearchParamStr === "" ? "" : "?"}${newSearchParamStr}`
    );
  };

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: valibotResolver(InputInvoiceSchema),
    defaultValues:
      props.type === "edit"
        ? props.invoice
        : {
            date: new Date().toISOString().split("T")[0],
            // always set a default value for this field
            // todo: TS doesn't warn if the value is not set (improve type safety)
            paymentTerm: "1",
            // always set a default value for this field
            // todo: TS doesn't warn if the value is not set (improve type safety)
            items: [getNewItemField()],
          },
  });
  const {
    fields: itemFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "items",
  });

  const allowItemDeletion = itemFields.length > 1;
  const errorMsgZIdxOnFocus: `z-${10 | 20 | 30 | 40 | 50}` = `z-10`;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (props.type === "edit") {
      setRecentSubmissionIntent("save");
      handleSubmit((input) =>
        formAction({
          input,
          intent: "edit",
          invoiceId: props.invoiceId,
        })
      )(e);
      return;
    }
    let intent: "save-as-draft" | "save" = "save";
    const { nativeEvent } = e;
    if (nativeEvent instanceof SubmitEvent) {
      const intentFromSubmitter = nativeEvent.submitter?.getAttribute("name");
      intent =
        intentFromSubmitter === "save-as-draft" ||
        intentFromSubmitter === "save"
          ? intentFromSubmitter
          : "save";
    }
    setRecentSubmissionIntent(intent);
    handleSubmit((input) => formAction({ input, intent }))(e);
  };

  const discardBtnJSX = (
    <button
      type="button"
      onClick={() => reset()}
      className={classJoin(
        "pt-[1.125rem]",
        "pb-[0.9375rem]",
        "rounded-3xl",
        "px-12px md:px-16px",
        "typography-heading-s-var",
        "bg-[#F9FAFE] hover:bg-ds-5 dark:bg-ds-4 hover:dark:bg-ds-8",
        "text-ds-7 dark:text-ds-5"
      )}
    >
      Discard
    </button>
  );

  React.useEffect(() => {
    if (formState.type !== "error") {
      return;
    }
    setToast({
      type: "Error",
      message: formState.message,
    });
  }, [formState, setToast]);

  React.useEffect(() => {
    if (formState.type !== "success") {
      return;
    }
    setToast({
      type: "Success",
      message: formState.message,
    });
    setOpen(false);
  }, [formState, setToast]);

  return (
    <AnimatePresence onExitComplete={onExitAnimationComplete}>
      {open && (
        <Ariakit.Dialog
          open={true}
          onClose={() => {
            if (formIsSubmitting) {
              return;
            }
            setOpen(false);
          }}
          getPersistentElements={() => {
            const elements: Element[] = [];
            const globalToastViewPort = document.querySelector(
              "[data-global-toast-viewport]"
            );
            if (globalToastViewPort !== null) {
              elements.push(globalToastViewPort);
            }
            const appHeader = document.querySelector("[data-app-header]");
            if (appHeader !== null) {
              elements.push(appHeader);
            }
            return elements;
          }}
          unmountOnHide={true}
          backdrop={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={classJoin(
                "fixed left-0 top-0 w-full h-full",
                "bg-black/50"
              )}
            />
          }
          render={
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0" }}
              exit={{ x: "-100%" }}
              transition={{
                stiffness: open ? 200 : 250,
                damping: 50,
              }}
              className={classJoin(
                // set top based on the app header's height
                "fixed left-0 top-72px md:top-[77px] lg:top-0 bottom-0",
                // set left padding based on the app header's width
                "pl-24px md:pl-56px lg:pl-[calc(103px+56px)]",
                "pr-24px md:pr-56px",
                "bg-white dark:bg-ds-12",
                "w-full max-w-[min(100%,38.5rem)] lg:max-w-[min(100%,45rem)]",
                "max-h-full overflow-y-auto",
                "isolate"
              )}
            />
          }
        >
          <div
            className={classJoin(
              "pb-[1.375rem] md:pb-[2.875rem]",
              "pt-8 md:pt-[3.6875rem]",
              "bg-inherit",
              "sticky top-0",
              "z-30"
            )}
          >
            <Ariakit.DialogDismiss
              className={classJoin(
                "flex gap-x-6 items-center",
                "mb-[1.625rem]",
                "typography-heading-s-var",
                "text-ds-8 dark:text-white",
                "md:hidden"
              )}
            >
              <ArrowDown className={classJoin("rotate-90", "text-ds-1")} />
              <span>Main page</span>
            </Ariakit.DialogDismiss>
            <Ariakit.DialogHeading
              className={classJoin(
                "text-ds-8 dark:text-white",
                "font-bold",
                "text-2xl",
                "-tracking-[0.03125rem]"
              )}
            >
              {props.type === "create" ? (
                "New Invoice"
              ) : (
                <>
                  <span>{`Edit `}</span>
                  <span className="text-ds-7 dark:text-ds-6">#</span>
                  <span>{props.invoiceId}</span>
                </>
              )}
            </Ariakit.DialogHeading>
          </div>
          <form
            onSubmit={onSubmit}
            className={classJoin("px-2px", "bg-inherit")}
          >
            <fieldset className="mb-8 md:mb-10 min-w-0">
              <Legend>Bill From</Legend>
              <AddressInputs
                errorMsgZIdxOnFocus={errorMsgZIdxOnFocus}
                streetAddressProps={{
                  ...register("billFrom.streetAddress"),
                  $errorMsg: errors.billFrom?.streetAddress?.message,
                }}
                cityProps={{
                  ...register("billFrom.city"),
                  $errorMsg: errors.billFrom?.city?.message,
                }}
                postCodeProps={{
                  ...register("billFrom.postCode"),
                  $errorMsg: errors.billFrom?.postCode?.message,
                }}
                countryProps={{
                  ...register("billFrom.country"),
                  $errorMsg: errors.billFrom?.country?.message,
                }}
              />
            </fieldset>
            <fieldset className="mb-8 md:mb-10 min-w-0">
              <Legend>Bill To</Legend>
              <LabelledInputWithErrMsg
                $label="Client's Name"
                $labelInputGap="lg"
                $padding="lg"
                $errorMsgZIdxOnFocus={errorMsgZIdxOnFocus}
                {...register("billTo.clientName")}
                $errorMsg={errors.billTo?.clientName?.message}
              />
              <LabelledInputWithErrMsg
                $label="Client's Email"
                $labelInputGap="lg"
                $padding="lg"
                type="email"
                $errorMsgZIdxOnFocus={errorMsgZIdxOnFocus}
                {...register("billTo.clientEmail")}
                $errorMsg={errors.billTo?.clientEmail?.message}
              />
              <AddressInputs
                errorMsgZIdxOnFocus={errorMsgZIdxOnFocus}
                streetAddressProps={{
                  ...register("billTo.streetAddress"),
                  $errorMsg: errors.billTo?.streetAddress?.message,
                }}
                cityProps={{
                  ...register("billTo.city"),
                  $errorMsg: errors.billTo?.city?.message,
                }}
                postCodeProps={{
                  ...register("billTo.postCode"),
                  $errorMsg: errors.billTo?.postCode?.message,
                }}
                countryProps={{
                  ...register("billTo.country"),
                  $errorMsg: errors.billTo?.country?.message,
                }}
              />
            </fieldset>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24px">
              <LabelledInputWithErrMsg
                $label="Invoice Date"
                $labelInputGap="lg"
                $padding="lg"
                type="date"
                $errorMsgZIdxOnFocus={errorMsgZIdxOnFocus}
                {...register("date")}
                $errorMsg={errors.date?.message}
              />
              <Controller
                name="paymentTerm"
                control={control}
                render={({ field }) => <PaymentTermSelect {...field} />}
              />
            </div>
            <LabelledInputWithErrMsg
              $label="Project Description"
              $labelInputGap="lg"
              $padding="lg"
              $errorMsgZIdxOnFocus={errorMsgZIdxOnFocus}
              $marginBottomZero={true}
              {...register("projectDescription")}
              $errorMsg={errors.projectDescription?.message}
            />
            <fieldset className="mt-[3.125rem] md:mt-10 min-w-0">
              <legend
                className={classJoin(
                  "text-[#777F98]",
                  "mb-[1.375rem] md:mb-[0.875rem]",
                  "font-bold text-[1.125rem] leading-8 -tracking-[0.02375rem]"
                )}
              >
                Item List
              </legend>
              <ol>
                {itemFields.map((itemField, i) => (
                  <li
                    key={itemField.id}
                    className={classJoin(
                      "mb-[1.875rem] md:mb-4",
                      "md:flex md:gap-x-16px md:items-center"
                    )}
                  >
                    <ItemInputs
                      hideMdInputLabels={i !== 0}
                      index={i}
                      allowDeletion={allowItemDeletion}
                      onDelete={() => remove(i)}
                      control={control}
                      priceFormPath={`items.${i}.price`}
                      quantityFormPath={`items.${i}.quantity`}
                      getTotalFieldValue={({ price, quantity }) => {
                        const priceRes = v.safeParse(ItemPriceSchema, price, {
                          abortEarly: true,
                        });
                        const qtyRes = v.safeParse(
                          ItemQuantitySchema,
                          quantity,
                          { abortEarly: true }
                        );
                        if (!priceRes.success || !qtyRes.success) {
                          return "";
                        }
                        return (
                          Number(priceRes.output) * Number(qtyRes.output)
                        ).toFixed(2);
                      }}
                      errorMsgZIdxOnFocus={errorMsgZIdxOnFocus}
                      nameProps={{
                        ...register(`items.${i}.name`),
                        $errorMsg: errors.items?.[i]?.name?.message,
                      }}
                      quantityProps={{
                        ...register(`items.${i}.quantity`),
                        $errorMsg: errors.items?.[i]?.quantity?.message,
                      }}
                      priceProps={{
                        ...register(`items.${i}.price`),
                        $errorMsg: errors.items?.[i]?.price?.message,
                      }}
                    />
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={() => {
                  append(getNewItemField());
                }}
                className={classJoin(
                  "bg-[#F9FAFE] hover:bg-ds-5 dark:bg-ds-4 hover:dark:bg-ds-8",
                  "text-ds-7 dark:test-ds-5",
                  "pt-[1.125rem]",
                  "pb-[0.9375rem]",
                  "w-full",
                  "rounded-3xl",
                  "typography-heading-s-var",
                  "mb-[5.5rem] md:mb-14"
                )}
              >
                Add New Item
              </button>
            </fieldset>
            <div
              className={classJoin(
                "px-24px",
                "py-5",
                "bg-white dark:bg-ds-3 lg:bg-inherit lg:dark:bg-inherit",
                "sticky bottom-0",
                "-ml-24px md:-ml-56px lg:-ml-[calc(103px+56px)]",
                "-mr-24px md:-mr-56px",
                "pl-24px md:pl-56px lg:pl-[calc(103px+56px)]",
                "pr-24px md:pr-56px",
                "flex items-center gap-2",
                "relative z-30"
              )}
            >
              {props.type === "create" && discardBtnJSX}
              <div
                className={classJoin(
                  "ml-auto",
                  "flex flex-wrap items-center justify-center gap-2"
                )}
              >
                {props.type === "edit" ? (
                  discardBtnJSX
                ) : (
                  <SubmitBtn
                    name="save-as-draft"
                    $isFormSubmitting={formIsSubmitting}
                    className={classJoin(
                      "pt-[1.125rem]",
                      "pb-[0.9375rem]",
                      "rounded-3xl",
                      "px-12px md:px-16px",
                      "typography-heading-s-var",
                      "bg-[#373B53]",
                      "text-ds-6 dark:text-ds-5",
                      "whitespace-nowrap",
                      "relative",
                      formIsSubmitting &&
                        recentSubmissionIntent !== "save-as-draft" &&
                        "opacity-50",
                      !formIsSubmitting && "hover:bg-ds-8 dark:hover:bg-ds-3"
                    )}
                  >
                    <SubmitBtnContent
                      isBtnSubmitting={
                        formIsSubmitting &&
                        recentSubmissionIntent === "save-as-draft"
                      }
                    >
                      Save as Draft
                    </SubmitBtnContent>
                  </SubmitBtn>
                )}
                <SubmitBtn
                  name="save"
                  $isFormSubmitting={formIsSubmitting}
                  className={classJoin(
                    "pt-[1.125rem]",
                    "pb-[0.9375rem]",
                    "rounded-3xl",
                    "px-12px md:px-16px",
                    "typography-heading-s-var",
                    "bg-ds-1",
                    "text-white",
                    "whitespace-nowrap",
                    "relative",
                    formIsSubmitting &&
                      recentSubmissionIntent !== "save" &&
                      "opacity-50",
                    !formIsSubmitting && "hover:bg-ds-2"
                  )}
                >
                  <SubmitBtnContent
                    isBtnSubmitting={
                      formIsSubmitting && recentSubmissionIntent === "save"
                    }
                  >
                    {props.type === "edit" ? "Save Changes" : "Save & Send"}
                  </SubmitBtnContent>
                </SubmitBtn>
              </div>
            </div>
          </form>
        </Ariakit.Dialog>
      )}
    </AnimatePresence>
  );
}

function getNewItemField() {
  return { id: crypto.randomUUID(), name: "", quantity: "", price: "" };
}
