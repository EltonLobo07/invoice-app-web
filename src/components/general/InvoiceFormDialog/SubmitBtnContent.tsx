import { classJoin } from "@/utils/general";
import { Spinner } from "@/components/general";

type Props = {
  isBtnSubmitting?: boolean;
  children: string;
};

export function SubmitBtnContent(props: Props) {
  return (
    <>
      <span
        className={classJoin(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "transition-opacity duration-300",
          props.isBtnSubmitting ? "opacity-100" : "opacity-0"
        )}
      >
        <Spinner isLoading={props.isBtnSubmitting} />
      </span>
      <span
        className={classJoin(
          props.isBtnSubmitting ? "opacity-0" : "opacity-100",
          "transition-opacity duration-300",
          "relative"
        )}
      >
        {props.children}
      </span>
    </>
  );
}
