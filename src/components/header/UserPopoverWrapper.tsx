"use client";

import { useStoreContext } from "@/providers/StoreProvider";
import { UserPopover } from "./UserPopover";

export function UserPopoverWrapper() {
  const user = useStoreContext((s) => s.user);

  return user && <UserPopover user={user} />;
}
