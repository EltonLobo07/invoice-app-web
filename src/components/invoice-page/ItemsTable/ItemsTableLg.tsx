import { classJoin, getUIAmount } from "@/utils/general/runtime";
import type { Items } from "./ItemsTable";

type Props = {
  items: Items[];
};

export function ItemsTableLg(props: Props) {
  return (
    <table className={classJoin("hidden md:table", "mt-7")}>
      <caption className="sr-only">Items</caption>
      <thead>
        <tr
          className={classJoin(
            "bg-[#F9FAFE] dark:bg-ds-4",
            "rounded-t-lg",
            "typography-body-lg",
            "text-ds-7 dark:text-ds-5"
          )}
        >
          <th
            className={classJoin(
              "pl-32px py-8",
              "text-left",
              "rounded-tl-[inherit]"
            )}
          >
            Item Name
          </th>
          <th className={classJoin("py-8", "text-center")}>QTY.</th>
          <th className={classJoin("py-8", "text-right")}>Price</th>
          <th
            className={classJoin(
              "pr-32px py-8",
              "text-right",
              "rounded-tr-[inherit]"
            )}
          >
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item) => (
          <tr
            key={item.id}
            className={classJoin(
              "bg-[#F9FAFE] dark:bg-ds-4",
              "typography-heading-s-var"
            )}
          >
            <td
              className={classJoin(
                "pl-32px",
                "pb-8",
                "pr-4",
                "text-ds-8 dark:text-white"
                // "w-[50.16%]"
              )}
            >
              {item.name}
            </td>
            <td
              className={classJoin(
                "text-center",
                "text-ds-7 dark:text-ds-5",
                "pb-8"
                // "w-[13.57%]"
              )}
            >
              {item.quantity}
            </td>
            <td
              className={classJoin(
                "text-right",
                "text-ds-7 dark:text-ds-5",
                "pb-8",
                "pl-4",
                "whitespace-nowrap"
                // "w-[21.77%]"
              )}
            >
              {getUIAmount(item.price)}
            </td>
            <td
              className={classJoin(
                "pr-32px",
                "pl-4",
                "text-right",
                "text-ds-8 dark:text-white",
                "pb-8",
                "whitespace-nowrap"
                // "w-[14.51%]"
              )}
            >
              {getUIAmount(item.quantity * item.price)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr
          className={classJoin(
            "rounded-b-lg",
            "bg-ds-[#373B53] dark:bg-ds-8",
            "text-white"
          )}
        >
          <td
            colSpan={3}
            className={classJoin(
              "pl-32px",
              "rounded-bl-[inherit]",
              "typography-body-lg"
            )}
          >
            Grand Total
          </td>
          <td
            className={classJoin(
              "pr-32px",
              "rounded-br-[inherit]",
              "typography-heading-m",
              "text-right",
              "pt-[1.6875rem]",
              "pb-[1.3125rem]",
              "whitespace-nowrap"
            )}
          >
            {getUIAmount(
              props.items.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
