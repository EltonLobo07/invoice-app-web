import { classJoin } from "@/utils/general";

type Props = {
  children: string;
};

export function Legend(props: Props) {
  return (
    <legend
      className={classJoin("text-ds-1", "typography-heading-s-var", "mb-6")}
    >
      {props.children}
    </legend>
  );
}
