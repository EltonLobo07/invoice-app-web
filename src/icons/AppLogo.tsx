import { classJoin } from "@/utils/general";

export function AppLogo() {
  return (
    <svg
      aria-hidden={true}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      // width="28"
      // height="26"
      className={classJoin(
        "w-[28px] tabAndUp:w-[31px] laptopAndUp:w-40px",
        "h-[28px] tabAndUp:h-[31px] laptopAndUp:h-40px"
      )}
    >
      <path
        fill="#FFF"
        fillRule="evenodd"
        d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
      ></path>
    </svg>
  );
}
