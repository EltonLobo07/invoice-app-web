"use client";

import { useStoreContext } from "@/components";

export default function Home() {
  const user = useStoreContext((s) => s.user);

  if (user === null) {
    return <div>no user</div>;
  }
  return <div>{JSON.stringify(user)}</div>;
}
