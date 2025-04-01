import { classJoin, getUIDateString } from "@/utils/general";
import { Dt } from "./Dt";

type Props = {
  value: Date;
};

export function InvoiceDueDate(props: Props) {
  return (
    <>
      <Dt>Due date</Dt>
      <dd
        className={classJoin(
          "relative",
          "text-ds-6 dark:text-ds-5",
          "typography-body-md",
          "whitespace-nowrap"
        )}
      >
        <span aria-hidden={true}>{"Due "}</span>
        <span>{getUIDateString(props.value)}</span>
      </dd>
    </>
  );
}
