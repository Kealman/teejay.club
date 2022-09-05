import { formatDistanceStrict } from "date-fns";
import ruLocale from "date-fns/locale/ru";

const locale = {
  ...ruLocale,
  formatDistance: (
    unit: string,
    count: number,
    options: { date: Date; baseDate: Date }
  ) => {
    if (unit === "xSeconds") {
      return "";
    } else if (unit === "xMinutes") {
      return `${count} м.`;
    } else if (unit === "xHours") {
      return `${count} ч.`;
    } else if (unit === "xDays") {
      return `${count} д.`;
    } else if (unit === "xMonths") {
      return `${count} мес.`;
    } else if (unit === "xYears") {
      return ruLocale?.formatDistance?.(unit, count, options);
    }
  },
};

export function formatDistanceShort(date: Date, baseDate: Date) {
  return formatDistanceStrict(date, baseDate, { locale });
}
