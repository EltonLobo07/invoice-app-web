import { classJoin } from "@/utils/general";

type DtProps = {
  children: string;
};

export function Dt(props: DtProps) {
  return (
    <dt
      className={classJoin(
        "text-ds-7 dark:text-ds-5",
        "typography-body-md",
        "mb-[0.8125rem]"
      )}
    >
      {props.children}
    </dt>
  );
}
