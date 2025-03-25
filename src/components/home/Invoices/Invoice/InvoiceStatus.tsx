import type { InvoiceStatus as InvoiceStatusType } from "@/types/home";
import { Dt } from "./Dt";
import { InvoiceStatusDD } from "@/components/general";

type Props = {
  value: InvoiceStatusType;
};

export function InvoiceStatus(props: Props) {
  return (
    <>
      <Dt>Status</Dt>
      <InvoiceStatusDD value={props.value} />
    </>
  );
}
