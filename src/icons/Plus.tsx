type Props = {
  className?: string;
};

export function Plus(props: Props) {
  return (
    <svg
      aria-hidden={true}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      className={props.className}
    >
      <circle cx="16" cy="16" r="16" fill="#fff"></circle>
      <path
        fill="currentColor"
        d="M17.313 21.023v-3.71h3.71v-2.58h-3.71v-3.71h-2.58v3.71h-3.71v2.58h3.71v3.71z"
      ></path>
    </svg>
  );
}
