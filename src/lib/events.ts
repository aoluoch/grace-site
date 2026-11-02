/**
 * Matches the events page: a gathering is past once its date is before today.
 * Events with no usable date are treated as past, the same way the listing does.
 */
export function isPastEventDate(date: Date | null | undefined): boolean {
  if (!date || Number.isNaN(date.getTime())) return true;
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  return date < startOfToday;
}
