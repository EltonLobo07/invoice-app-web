"use client";

import {
  Select,
  SelectItem,
  SelectItemCheck,
  SelectLabel,
  SelectPopover,
  SelectProvider,
} from "@ariakit/react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { classJoin } from "@/utils/general";
import { ResponsiveText } from "../general";
import { ArrowDown, Check } from "@/icons";

const INVOICE_STATUSES = ["draft", "pending", "paid"] as const;
const STATUSES_SEARCH_PARAM = "statuses";

const invoiceStatuesSt = new Set<string>(INVOICE_STATUSES);
function isInvoiceStatus(status: string): status is InvoiceStatus {
  return invoiceStatuesSt.has(status);
}

type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export function InvoiceStatusSelect() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedStatues, setSelectedStatues] = useState<InvoiceStatus[]>(() =>
    (searchParams.get(STATUSES_SEARCH_PARAM) ?? "")
      .split(",")
      .filter(isInvoiceStatus)
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (statuses: InvoiceStatus[]) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (statuses.length === 0) {
      newSearchParams.delete(STATUSES_SEARCH_PARAM);
    } else {
      newSearchParams.set(STATUSES_SEARCH_PARAM, statuses.join(","));
    }
    const searchParamsStr = newSearchParams.toString();
    router.replace(
      `${pathname}${searchParamsStr.length > 0 ? "?" : ""}${searchParamsStr}`
    );
    setSelectedStatues(statuses);
  };

  return (
    <div className="relative">
      <SelectProvider
        open={isOpen}
        setOpen={setIsOpen}
        value={selectedStatues}
        setValue={handleSelect}
      >
        <SelectLabel className="sr-only">invoice status</SelectLabel>
        <Select
          className={classJoin(
            "flex items-center gap-x-[11px] md:gap-x-[14px]",
            "typography-heading-s-var",
            "text-ds-8 dark:text-white"
          )}
        >
          <ResponsiveText default="Filter" md="Filter by status" />
          <ArrowDown
            className={classJoin(
              "shrink-0",
              "text-ds-1",
              "inline-block",
              "transition-transform",
              "duration-300",
              isOpen ? "motion-safe:rotate-180" : "motion-safe:rotate-0"
            )}
          />
        </Select>
        <AnimatePresence>
          {isOpen && (
            <SelectPopover
              render={
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                />
              }
              gutter={20}
              alwaysVisible={true}
              className={classJoin(
                "bg-white dark:bg-ds-4",
                "p-24px",
                "rounded-[8px]",
                "min-w-[192px]",
                "shadow-[0px_10px_20px_0px_#48549F40] dark:shadow-[0px_10px_20px_0px_#00000040]",
                "flex flex-col gap-y-[0.9375rem]"
              )}
            >
              {INVOICE_STATUSES.map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                  className={classJoin(
                    "flex gap-x-[13px] items-center",
                    "cursor-default rounded-[2px]",
                    "data-[active-item=true]:ring-2 ring-ds-1 ring-offset-2 dark:ring-offset-ds-3",
                    "group"
                  )}
                >
                  <SelectItemCheck
                    className={classJoin(
                      "bg-ds-5 dark:bg-ds-3 group-aria-selected:bg-ds-1",
                      "rounded-[2px]",
                      "flex items-center justify-center"
                    )}
                  >
                    <Check />
                  </SelectItemCheck>
                  <span
                    className={classJoin(
                      "typography-heading-s-var",
                      "text-ds-8 dark:text-white",
                      "capitalize"
                    )}
                  >
                    {status}
                  </span>
                </SelectItem>
              ))}
            </SelectPopover>
          )}
        </AnimatePresence>
      </SelectProvider>
    </div>
  );
}
