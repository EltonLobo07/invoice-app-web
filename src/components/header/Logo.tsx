import { AppLogo } from "@/icons";
import { classJoin } from "@/utils/general";

export function Logo() {
  return (
    <div
      className={classJoin(
        "relative",
        "p-[22px] md:p-[24.5px] lg:p-[31.5px]",
        "bg-ds-1",
        "overflow-hidden",
        "rounded-r-[20px]",
        "isolate"
      )}
    >
      <div
        className={classJoin(
          "absolute w-full h-1/2 top-1/2 left-0 z-0",
          "bg-ds-2",
          "rounded-tl-[20px]"
        )}
      />
      <div className="relative z-10 flex items-center justify-center">
        <AppLogo />
      </div>
    </div>
  );
}
