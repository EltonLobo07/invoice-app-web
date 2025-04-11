import { classJoin } from "@/utils/general";

type Props = {
  children: string;
  invalidInput?: boolean;
  mdSrOnlyLabel?: boolean;
} & (
  | { htmlFor: string; as?: undefined }
  | {
      htmlFor?: undefined;
      as?: (props: {
        htmlFor?: string;
        className: string;
        children: string;
      }) => React.ReactNode;
    }
);

export function Label(props: Props) {
  const LabelComponent = props.as ?? "label";

  return (
    <LabelComponent
      htmlFor={props.htmlFor}
      className={classJoin(
        props.mdSrOnlyLabel && "md:sr-only",
        props.invalidInput ? "text-ds-9" : "text-ds-7 dark:text-ds-6",
        "typography-body-md"
      )}
    >
      {props.children}
    </LabelComponent>
  );
}
