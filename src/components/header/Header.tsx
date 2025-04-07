import { classJoin } from "@/utils/general";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { UserPopoverWrapper } from "./UserPopoverWrapper";

export function Header() {
  return (
    <header
      data-app-header
      className={classJoin(
        "sticky lg:fixed top-0 lg:left-0",
        "bg-[#373B53] dark:bg-ds-3",
        "flex justify-between lg:flex-col",
        "lg:h-full",
        "lg:rounded-r-[20px]",
        "relative z-10"
      )}
    >
      <h1 className="sr-only">Invoice Application</h1>
      <Logo />
      <div className={classJoin("flex lg:flex-col", "lg:rounded-br-[inherit]")}>
        <ThemeSwitcher />
        <UserPopoverWrapper />
      </div>
    </header>
  );
}
