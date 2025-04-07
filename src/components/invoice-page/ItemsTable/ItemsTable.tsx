import { ItemsTableLg } from "./ItemsTableLg";
import { ItemsTableSm } from "./ItemsTableSm";

export type Items = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

type Props = {
  items: Items[];
};

export function ItemsTable(props: Props) {
  return (
    <>
      <ItemsTableSm items={props.items} />
      <ItemsTableLg items={props.items} />
    </>
  );
}
