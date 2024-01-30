import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

const EST_TIMEZONE = "America/Los_Angeles";

export function initializeDayjs() {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  dayjs.tz.setDefault(EST_TIMEZONE);
}

export function daysSinceJan1(date: dayjs.Dayjs): number {
  const jan1 = dayjs.tz("2024-01-01 00:00:00");
  return date.tz().diff(jan1, "day");
}

export function today() {
  return dayjs.tz().startOf("day");
}
