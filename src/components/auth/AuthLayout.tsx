import { classJoin } from "@/utils/general";
import Link from "next/link";

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
        "flex flex-col justify-center items-center gap-y-8"
      )}
    >
      <div className="flex flex-col gap-y-2 items-center">
        <h2 className="typography-heading-l">{props.heading}</h2>
        <p className="font-medium text-base text-gray-600 dark:text-gray-300">
          Or{" "}
          <Link
            prefetch={false}
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
