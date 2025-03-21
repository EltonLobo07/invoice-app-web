import type { ResponsiveTextType } from "@/types/home";
import { NoResourceMessage, ResponsiveText } from "../general";

type Props = {
  newInvoiceLinkText: ResponsiveTextType;
};

export function NoInvoiceMessage(props: Props) {
  return (
    <NoResourceMessage
      description={
        <span className="inline-block max-w-[13rem]">
          Create a new invoice by clicking the{" "}
          <strong>
            <ResponsiveText {...props.newInvoiceLinkText} />
          </strong>{" "}
          button and get started
        </span>
      }
    />
  );
}
