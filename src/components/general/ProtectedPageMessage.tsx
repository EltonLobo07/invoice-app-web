import { classJoin, type HeadingLvl } from "@/utils/general";
import { Message } from "./Message";
import Link from "next/link";

type Props = {
  headingLvl?: HeadingLvl;
};

export function ProtectedPageMessage(props: Props) {
  return (
    <Message
      title="This page is protected"
      description="You need to be logged in to view this page"
      action={
        <Link
          href="/login"
          className={classJoin(
            "bg-ds-1 hover:bg-ds-2",
            "text-white",
            "rounded-sm",
            "px-16px py-3",
            "typography-heading-s-var",
            "flex justify-center items-center gap-x-1"
          )}
        >
          Login page
        </Link>
      }
      headingLvl={props.headingLvl ?? 2}
      img={null}
      hFull={true}
    />
  );
}
