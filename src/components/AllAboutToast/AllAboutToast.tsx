import * as RPToast from "@radix-ui/react-toast";
import { classJoin } from "@/utils/general";
import { Toast } from "./Toast";
// import { classJoin } from "@/utils/general";

export function AllAboutToast() {
  return (
    <RPToast.Provider>
      <Toast />
      <RPToast.Viewport className={classJoin("fixed top-0 right-0", "p-2")} />
    </RPToast.Provider>
  );
}
