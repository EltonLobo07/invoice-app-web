type BaseSerializable = string | number | boolean | null;

export type Serializable =
  | BaseSerializable
  | Array<Serializable>
  | ReadonlyArray<Serializable>
  | { [K: string | number]: Serializable };

export type SerializableInit<T extends Serializable> = T | (() => T);

type ClassJoinParam = string | null | undefined | boolean;

export function classJoin(...classes: Array<ClassJoinParam>): string {
  const res: Array<string> = [];
  for (const classNames of classes) {
    if (typeof classNames !== "string") {
      continue;
    }
    for (const className of classNames.split(/\s/u)) {
      if (className === "") {
        continue;
      }
      res.push(className);
    }
  }
  return res.join(" ");
}
