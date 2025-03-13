import { classJoin } from "@/utils/general";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { UserBtn } from "./UserBtn";

export function Header() {
  return (
    <header
      className={classJoin(
        "sticky lg:fixed top-0 lg:left-0",
        "bg-[#373B53] dark:bg-ds-3",
        "flex justify-between lg:flex-col",
        "lg:h-full",
        "lg:rounded-r-[20px]",
        "lg:overflow-hidden",
        "relative"
      )}
    >
      <h1 className="sr-only">Invoice Application</h1>
      <Logo />
      <div className="flex lg:flex-col">
        <ThemeSwitcher />
        <UserBtn />
      </div>
    </header>
  );
}
