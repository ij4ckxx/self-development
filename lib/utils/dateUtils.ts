// Date utilities (Plain functions, no classes)

export function getTodayDateString(): string {
  // Returns formatted YYYY-MM-DD (Defaults to current system date 2026-10-01)
  const now = new Date();
  // Check if invalid or future
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatFriendlyDate(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function formatShortDate(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function getAdjacentDate(dateStr: string, offsetDays: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + offsetDays);
  const resY = date.getFullYear();
  const resM = String(date.getMonth() + 1).padStart(2, "0");
  const resD = String(date.getDate()).padStart(2, "0");
  return `${resY}-${resM}-${resD}`;
}

export function isSameDay(dateStr1: string, dateStr2: string): boolean {
  return dateStr1 === dateStr2;
}

export function generateCalendarDays(year: number, monthIndex: number) {
  // 0-indexed month
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const totalDays = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 is Sunday

  const days: { date: string; dayNumber: number; isCurrentMonth: boolean }[] = [];

  // Previous month trailing days
  const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevMonthLastDay - i;
    const m = String(monthIndex === 0 ? 12 : monthIndex).padStart(2, "0");
    const y = monthIndex === 0 ? year - 1 : year;
    days.push({
      date: `${y}-${m}-${String(dayNum).padStart(2, "0")}`,
      dayNumber: dayNum,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    const m = String(monthIndex + 1).padStart(2, "0");
    days.push({
      date: `${year}-${m}-${String(i).padStart(2, "0")}`,
      dayNumber: i,
      isCurrentMonth: true,
    });
  }

  // Next month leading days to complete grid (multiples of 7)
  const remaining = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    const m = String(monthIndex + 2 > 12 ? 1 : monthIndex + 2).padStart(2, "0");
    const y = monthIndex + 1 >= 12 ? year + 1 : year;
    days.push({
      date: `${y}-${m}-${String(i).padStart(2, "0")}`,
      dayNumber: i,
      isCurrentMonth: false,
    });
  }

  return days;
}
