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

export function getUIDateString(date: Date): string {
  const [year, , day] = date.toISOString().split("T")[0].split("-");
  return [
    day,
    new Intl.DateTimeFormat("en", { month: "short" }).format(date),
    year,
  ].join(" ");
}

export function getMillisecondsFromDays(days: number): number {
  return days * 24 * 60 * 60 * 1000;
}

export function getUIAmount(value: number): string {
  const [currency, ...rest] = value.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });
  return [currency, " ", ...rest].join("");
}
