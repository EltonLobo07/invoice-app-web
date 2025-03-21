import { classJoin } from "@/utils/general";
import Link from "next/link";

type Props = {
  href: string;
  children: string;
};

export function BtnLikeLink(props: Props) {
  return (
    <Link
      prefetch={false}
      href={props.href}
      className={classJoin(
        "bg-ds-1 hover:bg-ds-2",
        "text-white",
        "rounded-sm",
        "px-16px py-3",
        "typography-heading-s-var",
        "flex justify-center items-center gap-x-1"
      )}
    >
      {props.children}
    </Link>
  );
}
