import * as RPToast from "@radix-ui/react-toast";
import { classJoin } from "@/utils/general";
import { Toast } from "./Toast";

export function GlobalToast() {
  return (
    <RPToast.Provider>
      <Toast />
      <RPToast.Viewport
        data-global-toast-viewport
        className={classJoin("fixed top-0 right-0", "p-2", "z-40")}
      />
    </RPToast.Provider>
  );
}
