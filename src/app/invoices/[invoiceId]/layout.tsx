import { classJoin } from "@/utils/general";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <div className={classJoin("h-full overflow-y-auto", "bg-inherit")}>
      {props.children}
    </div>
  );
}
