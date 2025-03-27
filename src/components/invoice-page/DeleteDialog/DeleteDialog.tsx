"use client";

import React from "react";
import { deleteInvoice } from "./deleteInvoice.action";
import { useStoreContext } from "@/providers/StoreProvider";
import { useRouter } from "next/navigation";
import { startHolyLoader } from "holy-loader";
import {
  ConfirmActionDialog,
  useConfirmActionDialogState,
} from "../ConfirmActionDialog";

type Props = {
  invoiceId: string;
};

export function DeleteDialog(props: Props) {
  const { hideDialog, ...restConfirmActionDialogState } =
    useConfirmActionDialogState();
  const [formState, formAction, isFormSubmitting] = React.useActionState(
    deleteInvoice,
    {}
  );
  const setToast = useStoreContext((s) => s.setToast);
  const router = useRouter();

  React.useEffect(() => {
    if (formState.type === "error" || formState.type === "success") {
      hideDialog();
      setToast({ type: "Error", message: formState.message });
    }
  }, [formState, hideDialog, setToast]);

  React.useEffect(() => {
    if (formState.type === "success") {
      hideDialog();
      setToast({ type: "Success", message: formState.message });
      startHolyLoader();
      router.push("/");
      router.refresh();
    }
  }, [formState, hideDialog, router, setToast]);

  return (
    <ConfirmActionDialog
      title="Confirm Deletion"
      description={`Are you sure you want to delete invoice #${props.invoiceId}? This action cannot be undone.`}
      submitBtnText="Delete"
      isFormSubmitting={isFormSubmitting}
      formAction={formAction}
      invoiceId={props.invoiceId}
      hideDialog={hideDialog}
      {...restConfirmActionDialogState}
    />
  );
}
