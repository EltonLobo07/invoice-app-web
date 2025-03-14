type Props = {
  className?: string;
};

export function ArrowDown(props: Props) {
  return (
    <svg
      aria-hidden={true}
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="7"
      className={props.className}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="m1 1 4.228 4.228L9.456 1"
      ></path>
    </svg>
  );
}
