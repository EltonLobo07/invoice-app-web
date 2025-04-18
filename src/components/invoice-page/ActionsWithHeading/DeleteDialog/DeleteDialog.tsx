"use client";

import React from "react";
import { deleteInvoice } from "./deleteInvoice.action";
import { useStoreContext } from "@/providers/StoreProvider";
import {
  ConfirmActionDialog,
  useConfirmActionDialogState,
} from "../ConfirmActionDialog";

type Props = {
  invoiceId: string;
  jwt: string;
};

export function DeleteDialog(props: Props) {
  const { hideDialog, ...restConfirmActionDialogState } =
    useConfirmActionDialogState();
  const [formState, formAction, isFormSubmitting] = React.useActionState(
    deleteInvoice.bind(null, props.jwt),
    {}
  );
  const setToast = useStoreContext((s) => s.setToast);

  React.useEffect(() => {
    if (formState.type === "error" || formState.type === "success") {
      hideDialog();
      setToast({ type: "Error", message: formState.message });
    }
  }, [formState, hideDialog, setToast]);

  return (
    <ConfirmActionDialog
      theme="danger"
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
