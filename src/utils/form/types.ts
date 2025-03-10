import * as v from "valibot";

export type GenericFormSchema = v.GenericSchema<Record<string, unknown>>;

export type FormState<TSuccessData = unknown, TFailedData = unknown> =
  | { type?: undefined; message?: undefined; data?: undefined }
  | {
      type: "success";
      message?: string;
      data?: TSuccessData;
    }
  | {
      type: "error";
      message: string;
      data?: TFailedData;
    };

export type FormErrors<TSchema extends GenericFormSchema> = Partial<
  Record<v.IssueDotPath<TSchema>, string>
>;

export type FormAction<
  TSchema extends GenericFormSchema,
  TSuccessData = unknown,
  TFailedData = unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TParams extends any[] = []
> = (
  ...params: [
    ...TParams,
    FormState<TSuccessData, TFailedData>,
    v.InferInput<TSchema>
  ]
) => Promise<FormState<TSchema>>;
