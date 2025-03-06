type BaseSerializable = string | number | boolean | null;

export type Serializable =
  | BaseSerializable
  | Array<Serializable>
  | ReadonlyArray<Serializable>
  | { [K: string | number]: Serializable };

export type SerializableInit<T extends Serializable> = T | (() => T);
