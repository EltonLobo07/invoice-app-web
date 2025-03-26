import { FormSubmitBtn } from "@/components/general";
import { classJoin } from "@/utils/general";

type Props = {
  isFormSubmitting: boolean;
};

export function SubmitBtn(props: Props) {
  return (
    <FormSubmitBtn
      isFormSubmitting={props.isFormSubmitting}
      className={classJoin(
        "hover:bg-ds-2",
        "text-white",
        "rounded-sm",
        "px-16px py-3",
        "typography-heading-s-var",
        "w-full",
        "flex justify-center items-center gap-x-1",
        props.isFormSubmitting ? "cursor-not-allowed bg-ds-2" : "bg-ds-1"
      )}
    >
      Submit
    </FormSubmitBtn>
  );
}
