type Props = {
  strokeCurrentColor?: boolean;
};

export function Check(props: Props) {
  return (
    <svg
      aria-hidden={true}
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="8"
    >
      <path
        fill="none"
        stroke={props.strokeCurrentColor ? "currentColor" : "#FFF"}
        strokeWidth="2"
        d="m1.5 4.5 2.124 2.124L8.97 1.28"
      ></path>
    </svg>
  );
}
