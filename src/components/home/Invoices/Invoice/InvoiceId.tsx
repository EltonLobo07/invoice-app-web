import { Dt } from "./Dt";

type Props = {
  value: string;
};

export function InvoiceId(props: Props) {
  return (
    <>
      <Dt>invoice id</Dt>
      <dd className="typography-heading-s-var">
        <span className="text-ds-7">#</span>
        <span className="text-ds-8 dark:text-white">{props.value}</span>
      </dd>
    </>
  );
}
