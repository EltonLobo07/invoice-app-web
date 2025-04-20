"use client";

import { classJoin } from "@/utils/general";
import { LabelledInputWithErrMsg } from "../LabelledInputWithErrMsg";
import { Delete } from "@/icons";
import { FormInputProps } from "./types";
import {
  PathValue,
  useWatch,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type Props<
  TFieldValues extends FieldValues,
  TPriceFieldPath extends FieldPath<TFieldValues>,
  TQuantityFieldPath extends FieldPath<TFieldValues>
> = {
  hideMdInputLabels: boolean;
  index: number;
  allowDeletion: boolean;
  onDelete: () => void;
  control: Control<TFieldValues>;
  priceFormPath: TPriceFieldPath;
  quantityFormPath: TQuantityFieldPath;
  getTotalFieldValue: (params: {
    price: PathValue<TFieldValues, TPriceFieldPath>;
    quantity: PathValue<TFieldValues, TQuantityFieldPath>;
  }) => string;
} & Record<"nameProps" | "quantityProps" | "priceProps", FormInputProps>;

export function ItemInputs<
  TFieldValues extends FieldValues,
  TPriceFieldPath extends FieldPath<TFieldValues>,
  TQuantityFieldPath extends FieldPath<TFieldValues>
>(props: Props<TFieldValues, TPriceFieldPath, TQuantityFieldPath>) {
  const price = useWatch({ control: props.control, name: props.priceFormPath });
  const quantity = useWatch({
    control: props.control,
    name: props.quantityFormPath,
  });

  const deleteBtnJSX = props.allowDeletion ? (
    <button
      type="button"
      onClick={props.onDelete}
      className={classJoin("relative", "text-ds-6", "self-end", "mb-5")}
    >
      <span className="sr-only">delete this item</span>
      <Delete />
    </button>
  ) : null;

  return (
    <>
      <div
        className={classJoin(
          "mb-6 md:mb-0",
          "md:basis-[214px] md:shrink-0 md:grow"
        )}
      >
        <LabelledInputWithErrMsg
          $label="Invoice Name"
          $mdSrOnlyLabel={props.hideMdInputLabels}
          $labelInputGap="lg"
          $padding="lg"
          $marginBottomZero={true}
          {...props.nameProps}
        />
      </div>
      <div
        className={classJoin(
          "grid gap-x-16px items-center",
          deleteBtnJSX !== null
            ? "grid-cols-[repeat(3,minmax(0,1fr))_min-content]"
            : "grid-cols-3"
        )}
      >
        <LabelledInputWithErrMsg
          $label="Qty."
          $mdSrOnlyLabel={props.hideMdInputLabels}
          $labelInputGap="lg"
          $padding="lg"
          type="text"
          inputMode="numeric"
          $marginBottomZero={true}
          {...props.quantityProps}
        />
        <LabelledInputWithErrMsg
          $label="Price"
          $mdSrOnlyLabel={props.hideMdInputLabels}
          $labelInputGap="lg"
          $padding="lg"
          type="text"
          inputMode="numeric"
          $marginBottomZero={true}
          {...props.priceProps}
        />
        <LabelledInputWithErrMsg
          $label="Total"
          $mdSrOnlyLabel={props.hideMdInputLabels}
          $labelInputGap="lg"
          $padding="lg"
          readOnly={true}
          type="text"
          inputMode="numeric"
          $marginBottomZero={true}
          value={props.getTotalFieldValue({ price, quantity })}
        />
        {deleteBtnJSX}
      </div>
    </>
  );
}
