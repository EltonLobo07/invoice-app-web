"use client";

import { ProtectedPageMessage } from "@/components/general";
import { useStoreContext } from "@/providers/StoreProvider";

export default function Home() {
  const user = useStoreContext((s) => s.user);

  if (user === null) {
    return <ProtectedPageMessage />;
  }
  return <div>{JSON.stringify(user)}</div>;
}
