import { classJoin } from "@/utils/general";

export function UserBtn() {
  return (
    <button
      type="button"
      className={classJoin(
        "border-[#494E6E] border-l-[1px] lg:border-l-0 lg:border-t-[1px]",
        "flex items-center justify-center",
        "hover:bg-ds-7/15 dark:hover:bg-[#858BB2]/15",
        "px-24px md:px-32px",
        "lg:py-24px"
      )}
    >
      <span
        className={classJoin(
          "inline-block w-32px h-32px lg:w-40px lg:h-40px",
          "rounded-full",
          "bg-yellow-500"
        )}
      />
    </button>
  );
}
