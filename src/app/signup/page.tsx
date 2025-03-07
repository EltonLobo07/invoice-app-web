"use client";

import Link from "next/link";
import { SignupForm } from "./SignupForm";
import { classJoin } from "@/utils/general";
import { useStoreContext } from "@/components";

export default function Page() {
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
        <h2 className="typography-heading-l">Sign up</h2>
        <p className="font-medium text-base text-gray-600 dark:text-gray-300">
          Or{" "}
          <Link
            href={"/login"}
            className={classJoin(
              "underline",
              "hover:text-black dark:hover:text-white"
            )}
          >
            sign in to your existing account
          </Link>
        </p>
      </div>
      <SignupForm />
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
