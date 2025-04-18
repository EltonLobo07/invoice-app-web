"use client";

import React from "react";
import { useStoreContext } from "@/providers/StoreProvider";
import {
  ConfirmActionDialog,
  useConfirmActionDialogState,
} from "../ConfirmActionDialog";
import { markInvoiceAsPaid } from "./markInvoiceAsPaid.action";

type Props = {
  invoiceId: string;
  jwt: string;
};

export function MarkAsPaidDialog(props: Props) {
  const { hideDialog, ...restConfirmActionDialogState } =
    useConfirmActionDialogState();
  const [formState, formAction, isFormSubmitting] = React.useActionState(
    markInvoiceAsPaid.bind(null, props.jwt),
    {}
  );
  const setToast = useStoreContext((s) => s.setToast);

  React.useEffect(() => {
    if (formState.type === "error") {
      hideDialog();
      setToast({ type: "Error", message: formState.message });
    }
  }, [formState, hideDialog, setToast]);

  return (
    <ConfirmActionDialog
      theme="primary"
      title="Confirm Status Change"
      description={`Are you sure you want to change the status of invoice #${props.invoiceId} to "Paid"? This action cannot be undone.`}
      submitBtnText="Mark as Paid"
      isFormSubmitting={isFormSubmitting}
      formAction={formAction}
      invoiceId={props.invoiceId}
      hideDialog={hideDialog}
      {...restConfirmActionDialogState}
    />
  );
}
