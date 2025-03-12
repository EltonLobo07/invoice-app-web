"use client";

import { classJoin } from "@/utils/general";
import Link from "next/link";
import { useStoreContext } from "../StoreProvider";

type Props = {
  heading: string;
  alternative: {
    href: string;
    text: string;
  };
  children: React.ReactNode;
};

export function AuthLayout(props: Props) {
  return (
    <div
      className={classJoin(
        "h-full",
        "px-32px",
        "flex flex-col justify-center items-center gap-y-8"
      )}
    >
      <ThemeBtn />
      <div className="flex flex-col gap-y-2 items-center">
        <h2 className="typography-heading-l">{props.heading}</h2>
        <p className="font-medium text-base text-gray-600 dark:text-gray-300">
          Or{" "}
          <Link
            href={props.alternative.href}
            className={classJoin(
              "underline",
              "hover:text-black dark:hover:text-white"
            )}
          >
            {props.alternative.text}
          </Link>
        </p>
      </div>
      <div
        className={classJoin(
          "p-8",
          "bg-white dark:bg-ds-12",
          "rounded-md",
          "border border-ds-5 dark:border-ds-4",
          "w-full max-w-md"
        )}
      >
        {props.children}
      </div>
    </div>
  );
}

function ThemeBtn() {
  const isDarkTheme = useStoreContext((s) => s.isDarkTheme);
  const toggleIsDarkTheme = useStoreContext((s) => s.toggleIsDarkTheme);

  return (
    <button
      type="button"
      onClick={toggleIsDarkTheme}
      className="fixed right-4 bottom-4 bg-black text-white p-2 rounded-md"
    >
      {isDarkTheme ? "Light" : "Dark"}
    </button>
  );
}
