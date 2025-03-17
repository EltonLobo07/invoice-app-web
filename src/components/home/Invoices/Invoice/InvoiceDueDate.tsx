import { classJoin } from "@/utils/general";
import { Dt } from "./Dt";

type Props = {
  value: Date;
};

export function InvoiceDueDate(props: Props) {
  const [year, , day] = props.value.toISOString().split("T")[0].split("-");
  const formattedDate = [
    day,
    new Intl.DateTimeFormat("en", { month: "short" }).format(props.value),
    year,
  ].join(" ");

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
        <span>{formattedDate}</span>
      </dd>
    </>
  );
}
