import { classJoin } from "@/utils/general";

type InvoiceAddressDDProps = {
  street: string;
  city: string;
  postCode: string;
  country: string;
  textAlignRight?: boolean;
};

export function InvoiceAddress(props: InvoiceAddressDDProps) {
  return (
    <span
      className={classJoin(
        "flex flex-col",
        props.textAlignRight && "text-right",
        "text-ds-7 dark:text-ds-5",
        "typography-body-lg",
        "max-w-full overflow-x-hidden break-words hyphens-auto"
      )}
    >
      <span>{props.street}</span>
      <span>{props.city}</span>
      <span>{props.postCode}</span>
      <span>{props.country}</span>
    </span>
  );
}
