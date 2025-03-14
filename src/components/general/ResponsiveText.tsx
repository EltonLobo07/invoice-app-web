type Props = {
  default: string;
  md: string;
};

export function ResponsiveText(props: Props) {
  return (
    <>
      <span className="md:hidden">{props.default}</span>
      <span className="hidden md:inline">{props.md}</span>
    </>
  );
}
