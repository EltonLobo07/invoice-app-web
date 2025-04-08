import { LabelledInputWithErrMsg } from "@/components/general";

export function AddressInputs() {
  return (
    <>
      <LabelledInputWithErrMsg
        $label="Street Address"
        $labelInputGap="lg"
        $padding="lg"
      />
      <div className="flex gap-x-[1.4375rem] items-center">
        <LabelledInputWithErrMsg
          $label="City"
          $labelInputGap="lg"
          $padding="lg"
          $flexGrow={true}
        />
        <LabelledInputWithErrMsg
          $label="Post Code"
          $labelInputGap="lg"
          $padding="lg"
          $flexGrow={true}
        />
      </div>
      <LabelledInputWithErrMsg
        $label="Country"
        $labelInputGap="lg"
        $padding="lg"
        $marginBottomZero={true}
      />
    </>
  );
}
