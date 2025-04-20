import { CustomProps } from "@/utils/general";

type Props = Omit<
  React.ComponentPropsWithRef<"button">,
  "type" | "onClick" | "aria-disabled"
> &
  CustomProps<{
    isFormSubmitting?: boolean;
  }>;

export function SubmitBtn({ $isFormSubmitting, ...buttonProps }: Props) {
  return (
    <button
      {...buttonProps}
      type="submit"
      onClick={(e) => {
        if ($isFormSubmitting) {
          e.preventDefault();
        }
      }}
      aria-disabled={$isFormSubmitting}
    />
  );
}
