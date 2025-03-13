import { classJoin } from "@/utils/general";

type Props = {
  children: string;
  htmlFor: string;
  invalidInput?: boolean;
};

export function Label(props: Props) {
  return (
    <label
      htmlFor={props.htmlFor}
      className={classJoin(
        props.invalidInput ? "text-ds-9" : "text-ds-7 dark:text-ds-5",
        "font-body-var text-body-var leading-body-var tracking-body"
      )}
    >
      {props.children}
    </label>
  );
}
