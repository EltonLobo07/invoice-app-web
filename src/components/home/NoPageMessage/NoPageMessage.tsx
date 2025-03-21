import { NoResourceMessage } from "@/components/general";
import { InitialPageLink } from "./InitialPageLink";

export function NoPageMessage() {
  return <NoResourceMessage description={<InitialPageLink />} />;
}
