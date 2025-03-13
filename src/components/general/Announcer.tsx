type Props = {
  message?: string;
};

export function Announcer(props: Props) {
  return (
    <span aria-live="polite" className="sr-only">
      {props.message}
    </span>
  );
}
