import { classJoin } from "@/utils/general";
import { Dt } from "./Dt";
import { getUIAmount } from "@/utils/general/runtime";

type Props = {
  value: number;
};

export function InvoiceAmount(props: Props) {
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
        {getUIAmount(props.value)}
      </dd>
    </>
  );
}
