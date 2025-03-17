type Props = {
  children: string;
};

export function Dt(props: Props) {
  return <dt className="sr-only">{props.children}</dt>;
}
