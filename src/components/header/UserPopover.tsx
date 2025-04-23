"use client";

import * as Ariakit from "@ariakit/react";
import { classJoin } from "@/utils/general";
import { User } from "@/schemas";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { UserCircle, XCircle } from "@/icons";
import { useStoreContext } from "@/providers/StoreProvider";
import { useRouter } from "@/hooks";
import Link from "next/link";

type Props = {
  user: User;
};

export function UserPopover({ user: { username } }: Props) {
  const logout = useStoreContext((s) => s.logout);
  const router = useRouter();
  const store = Ariakit.usePopoverStore();
  const open = Ariakit.useStoreState(store, "open");

  return (
    <Ariakit.PopoverProvider store={store}>
      <Ariakit.PopoverDisclosure
        className={classJoin(
          "border-[#494E6E] border-l-[1px] lg:border-l-0 lg:border-t-[1px]",
          "text-ds-7 dark:text-[#858BB2]",
          "flex items-center justify-center",
          "hover:bg-ds-7/15 dark:hover:bg-[#858BB2]/15",
          "px-24px md:px-32px",
          "lg:py-24px",
          "lg:rounded-br-[inherit]"
        )}
      >
        <UserCircle />
      </Ariakit.PopoverDisclosure>
      <AnimatePresence>
        {open && (
          <Ariakit.Popover
            alwaysVisible={true}
            render={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={classJoin(
                  "bg-ds-1 text-white p-2",
                  "rounded-sm",
                  "flex flex-col",
                  "origin-[--popover-transform-origin]"
                )}
              />
            }
          >
            <Ariakit.PopoverArrow className="fill-white" />
            <Ariakit.PopoverHeading className="sr-only">
              username & logout action
            </Ariakit.PopoverHeading>
            <Ariakit.Button
              onClick={() => store.setOpen(false)}
              className={classJoin(
                "relative",
                "ml-auto mb-4",
                "text-white/75 hover:text-white"
              )}
            >
              <span className="sr-only">close popover</span>
              <XCircle />
            </Ariakit.Button>
            <p
              className={classJoin(
                "flex gap-x-2 items-center",
                "text-xl",
                "relative",
                "mb-2"
              )}
            >
              <span className="sr-only">hi</span>
              <span
                aria-hidden={true}
                className="inline-block animate-wave origin-[80%_90%]"
              >
                👋
              </span>
              <span className="font-bold">{username}</span>
            </p>
            <Ariakit.Button
              onClick={() => {
                router.push("/login");
                logout();
              }}
              className={classJoin(
                "bg-ds-4 hover:bg-white text-ds-5 hover:text-black",
                "rounded-sm",
                "w-full",
                "py-1 px-2",
                "text-sm",
                "mb-1"
              )}
            >
              Log out
            </Ariakit.Button>
            <Link
              prefetch={false}
              href="/login"
              className={classJoin(
                "bg-ds-4 hover:bg-white text-ds-5 hover:text-black",
                "rounded-sm",
                "w-full",
                "py-1 px-2",
                "text-sm",
                "text-center",
                "mb-1"
              )}
            >
              Sign in
            </Link>
            <Link
              prefetch={false}
              href="/signup"
              className={classJoin(
                "bg-ds-4 hover:bg-white text-ds-5 hover:text-black",
                "rounded-sm",
                "w-full",
                "py-1 px-2",
                "text-sm",
                "text-center"
              )}
            >
              Sign up
            </Link>
          </Ariakit.Popover>
        )}
      </AnimatePresence>
    </Ariakit.PopoverProvider>
  );
}
