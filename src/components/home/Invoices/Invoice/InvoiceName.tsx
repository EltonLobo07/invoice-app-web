import { classJoin } from "@/utils/general";
import { Dt } from "./Dt";

export function InvoiceName(props: { value: string }) {
  return (
    <>
      <Dt>Name</Dt>
      <dd
        className={classJoin(
          "text-[#858BB2] dark:text-white",
          "typography-body-md",
          "max-w-full overflow-x-hidden whitespace-nowrap text-ellipsis"
        )}
      >
        {props.value}
      </dd>
    </>
  );
}
