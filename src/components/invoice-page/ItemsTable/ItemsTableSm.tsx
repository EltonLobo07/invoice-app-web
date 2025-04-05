import { classJoin } from "@/utils/general";
import type { Items } from "./ItemsTable";
import { getUIAmount } from "@/utils/general/runtime";

type Props = {
  items: Items[];
};

export function ItemsTableSm(props: Props) {
  return (
    <table
      role="table"
      className={classJoin(
        "relative",
        "md:hidden",
        "max-w-full overflow-auto",
        "block"
      )}
    >
      <caption className="sr-only">Items</caption>
      <thead className="sr-only">
        <tr>
          <th>Name</th>
          <th>Quantity and price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody role="rowgroup" className="block max-w-full overflow-auto">
        {props.items.map((item, index) => (
          <tr
            key={item.id}
            role="row"
            className={classJoin(
              "bg-[#F9FAFE] dark:bg-ds-4",
              "grid grid-cols-[repeat(2,minmax(min-content,1fr))] grid-rows-2 gap-x-2",
              "max-w-full overflow-x-auto",
              "p-6",
              index === 0 && "rounded-t-lg"
            )}
          >
            <td
              className={classJoin(
                "text-ds-8 dark:text-white",
                "typography-heading-s-var",
                "row-start-1 row-end-2 col-start-1 col-end-2",
                "mb-2"
              )}
            >
              {item.name}
            </td>
            <td
              className={classJoin(
                "text-ds-7 dark:text-ds-6",
                "typography-heading-s-var",
                "row-start-2 row-end-3 col-start-1 col-end-2",
                "whitespace-nowrap"
              )}
            >
              <span>
                {item.quantity}
                <span aria-hidden={true} className="inline-block mx-1">
                  x
                </span>
                <span className="sr-only">times</span>
              </span>
              {getUIAmount(item.price)}
            </td>
            <td
              className={classJoin(
                "text-ds-8 dark:text-white",
                "typography-heading-s-var",
                "row-start-1 -row-end-1 -col-start-2 -col-end-1",
                "justify-self-end self-center",
                "whitespace-nowrap"
              )}
            >
              {getUIAmount(item.quantity * item.price)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot role="rowgroup" className="block">
        <tr
          role="row"
          className={classJoin(
            "flex justify-between gap-x-4",
            "px-6",
            "pt-[1.625rem]",
            "pb-[1.375rem]",
            "bg-[#373B53] dark:bg-ds-8",
            "rounded-b-lg",
            "w-full overflow-x-auto"
          )}
        >
          <th
            colSpan={2}
            className={classJoin(
              "typography-body-lg",
              "text-white",
              "whitespace-nowrap"
            )}
          >
            Grand Total
          </th>
          <td
            className={classJoin(
              "typography-heading-m",
              "text-white",
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
