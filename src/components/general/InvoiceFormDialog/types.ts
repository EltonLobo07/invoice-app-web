import { UseFormRegisterReturn } from "react-hook-form";
import { LabelledInputWithErrMsg } from "@/components/general";

export type FormInputProps = UseFormRegisterReturn<string> &
  Pick<
    React.ComponentPropsWithoutRef<typeof LabelledInputWithErrMsg>,
    "$errorMsg"
  >;
