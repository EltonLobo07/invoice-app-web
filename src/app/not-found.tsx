import { BtnLikeLink, NoResourceMessage } from "@/components/general";
import { classJoin } from "@/utils/general";

export default function NotFound() {
  return (
    <div
      className={classJoin(
        "px-app",
        "h-full overflow-y-auto",
        "flex justify-center items-center"
      )}
    >
      <NoResourceMessage
        headingLvl={2}
        description={<BtnLikeLink href="/">Invoices</BtnLikeLink>}
      />
    </div>
  );
}
