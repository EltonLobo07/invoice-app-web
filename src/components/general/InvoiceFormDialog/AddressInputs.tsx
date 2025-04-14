import { LabelledInputWithErrMsg } from "@/components/general";
import type { FormInputProps } from "./types";

type Props = Record<
  "streetAddressProps" | "cityProps" | "postCodeProps" | "countryProps",
  FormInputProps
>;

export function AddressInputs(props: Props) {
  return (
    <>
      <LabelledInputWithErrMsg
        $label="Street Address"
        $labelInputGap="lg"
        $padding="lg"
        {...props.streetAddressProps}
      />
      <div className="flex gap-x-[1.4375rem] items-center">
        <LabelledInputWithErrMsg
          $label="City"
          $labelInputGap="lg"
          $padding="lg"
          $flexGrow={true}
          {...props.cityProps}
        />
        <LabelledInputWithErrMsg
          $label="Post Code"
          $labelInputGap="lg"
          $padding="lg"
          $flexGrow={true}
          {...props.postCodeProps}
        />
      </div>
      <LabelledInputWithErrMsg
        $label="Country"
        $labelInputGap="lg"
        $padding="lg"
        $marginBottomZero={true}
        {...props.countryProps}
      />
    </>
  );
}
