import { formatRelative, format } from "date-fns";
import { be as locale } from "date-fns/locale/be";

export const date = (date) => date && format(date, "P", { locale });

export const dateRelative = (date) =>
  date && formatRelative(date, new Date(), { locale });

export const minSec = (ms) => {
  const sec = (ms / 1000) | 0;
  const minStr = Math.floor(sec / 60);
  const secStr = (sec % 60).toFixed(0).padStart(2, "0");

  return minStr + ":" + secStr;
};
