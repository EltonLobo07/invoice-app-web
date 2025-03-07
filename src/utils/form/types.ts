import * as v from "valibot";

export type GenericFormSchema = v.GenericSchema<Record<string, unknown>>;

export type FormState<
  TSchema extends GenericFormSchema,
  TSuccessData = unknown
> =
  | { type?: undefined; inputState?: undefined }
  | {
      type: "success";
      message?: string;
      data?: TSuccessData;
      inputState?: undefined;
    }
  | FormStateError<TSchema>;

export type FormErrors<TSchema extends GenericFormSchema> = Partial<
  Record<v.IssueDotPath<TSchema>, string>
>;

type FormStateError<TSchema extends GenericFormSchema> = {
  type: "error";
  inputState: Record<string, string>;
} & (
  | {
      formErrors: FormErrors<TSchema>;
      message?: undefined;
    }
  | { message: string; formErrors?: undefined }
);

export type FormAction<
  TSchema extends GenericFormSchema,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TParams extends any[] = []
> = (
  ...params: [...TParams, FormState<TSchema>, FormData]
) => Promise<FormState<TSchema>>;
