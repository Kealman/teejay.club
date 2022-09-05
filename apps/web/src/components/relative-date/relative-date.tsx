import {
  isBefore,
  endOfYesterday,
  formatDistance,
  format,
  isSameYear,
} from "date-fns";
import { ru as locale } from "date-fns/locale";
import { memo, useMemo } from "react";

type Props = { date: Date };

export const RelativeDate = memo<Props>(function RelativeDate({ date }) {
  const relativeDate = useMemo(() => {
    const now = new Date();
    return isBefore(date, endOfYesterday())
      ? format(date, isSameYear(now, date) ? "d MMM" : "d MMM yy", { locale })
      : formatDistance(date, now, { locale, addSuffix: true });
  }, [date]);

  return (
    <time dateTime={date.toISOString()} title={date.toLocaleString()}>
      {relativeDate}
    </time>
  );
});
