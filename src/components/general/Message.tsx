import { classJoin, type HeadingLvl } from "@/utils/general";
import React from "react";

type Props = {
  img: React.ReactNode;
  title: string;
  headingLvl: HeadingLvl;
  description: string;
  action?: React.ReactNode;
  hFull?: boolean;
};

export function Message(props: Props) {
  const Heading = `h${props.headingLvl}` as const;

  return (
    <div
      className={classJoin(
        "max-w-app mx-auto",
        "flex flex-col justify-center items-center",
        "grow",
        "text-center",
        props.hFull && "h-full"
      )}
    >
      {props.img}
      <Heading
        className={classJoin(
          "typography-heading-m",
          "text-ds-8 dark:text-white",
          "mt-[4.125rem] mb-6"
        )}
      >
        {props.title}
      </Heading>
      <p
        className={classJoin(
          "typography-body",
          "text-ds-6 dark:text-ds-5",
          props.action ? "mb-3" : ""
        )}
      >
        {props.description}
      </p>
      {props.action}
    </div>
  );
}
