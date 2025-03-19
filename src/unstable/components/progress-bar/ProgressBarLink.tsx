"use client";

import Link from "next/link";
import { useProgressBar } from "./useProgressBar";
import { useRouter } from "next/navigation";
import React from "react";

export function ProgressBarLink({
  href,
  children,
  ...rest
}: React.ComponentProps<typeof Link>) {
  const progress = useProgressBar();
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        progress.start();

        React.startTransition(() => {
          router.push(href.toString());
          progress.done();
        });
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
