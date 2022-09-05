type Args = Array<
  string | string[] | Record<string, boolean> | undefined | null
>;

export function classNames(...args: Args) {
  return args
    .map((arg) => {
      if (!arg) {
        return "";
      }
      if (typeof arg === "string") {
        return arg;
      }
      if (Array.isArray(arg)) {
        return arg.join(" ");
      }
      return Object.entries(arg)
        .filter((entry) => entry[1])
        .map((entry) => entry[0])
        .join(" ");
    })
    .join(" ");
}
