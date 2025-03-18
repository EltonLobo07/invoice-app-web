import { classJoin } from "@/utils/general";
import { Dt } from "./Dt";

type Props = {
  value: number;
};

export function InvoiceAmount(props: Props) {
  const [currency, ...rest] = props.value.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <>
      <Dt>Amount</Dt>
      <dd
        className={classJoin(
          "typography-heading-s",
          "text-ds-8 dark:text-white",
          "whitespace-nowrap max-w-full overflow-x-hidden text-ellipsis"
        )}
      >
        {`${currency} `}
        {rest.join("")}
      </dd>
    </>
  );
}
