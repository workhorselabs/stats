import { useMemo } from "react";
import { cn } from "~/lib/utils";

function getTotalDaysInYear(year: number): number {
  return new Date(year, 11, 31).getDate() === 31 ? 366 : 365;
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function YearProgress() {
  const today = new Date();
  const currentDay = getDayOfYear(today);
  const totalDays = getTotalDaysInYear(today.getFullYear());
  const progress = Math.floor((currentDay / totalDays) * 100);

  const dots = useMemo(() => {
    return Array.from({ length: totalDays }, (_, i) => ({
      isToday: i === currentDay,
      isPast: i < currentDay,
    }));
  }, [currentDay, totalDays]);

  return (
    <div className="rounded-xl border bg-background p-4 shadow-md w-fit">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold">Year</span>
        <span className="text-sm text-muted-foreground font-semibold">
          {progress}%
        </span>
      </div>
      <div
        className="grid gap-[3px]"
        style={{
          gridTemplateColumns: "repeat(31, minmax(0, 1fr))",
        }}
      >
        {dots.map((dot, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              dot.isToday
                ? "bg-primary"
                : dot.isPast
                ? "bg-foreground"
                : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function WeekProgress() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 1);
  const diff = today.getTime() - start.getTime();
  const currentWeek = Math.ceil(
    (diff / (1000 * 60 * 60 * 24) + start.getDay() + 1) / 7
  );
  const totalWeeks = 52;
  const progress = Math.floor((currentWeek / totalWeeks) * 100);

  const dots = Array.from({ length: totalWeeks }, (_, i) => ({
    isToday: i + 1 === currentWeek,
    isPast: i + 1 < currentWeek,
  }));

  return (
    <div className="rounded-xl border bg-background p-4 shadow-md w-fit">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold">Week</span>
        <span className="text-sm text-muted-foreground font-semibold">
          {progress}%
        </span>
      </div>
      {/* <div className="grid grid-cols-13 gap-[3px]"> */}
      <div
        className="grid gap-[3px]"
        style={{
          gridTemplateColumns: "repeat(13, minmax(0, 1fr))",
          gridTemplateRows: "repeat(4, minmax(0, 1fr))",
        }}
      >
        {dots.map((dot, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              dot.isToday
                ? "bg-primary"
                : dot.isPast
                ? "bg-foreground"
                : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function DayProgress() {
  const now = new Date();
  const currentHour = now.getHours();
  const progress = Math.floor((currentHour / 24) * 100);

  const dots = Array.from({ length: 24 }, (_, i) => ({
    isCurrent: i === currentHour,
    isPast: i < currentHour,
  }));

  return (
    <div className="rounded-xl border bg-background p-4 shadow-md w-fit">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold">Day</span>
        <span className="text-sm text-muted-foreground font-semibold">
          {progress}%
        </span>
      </div>
      <div className="grid grid-cols-12 gap-[3px]">
        {dots.map((dot, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              dot.isCurrent
                ? "bg-primary"
                : dot.isPast
                ? "bg-foreground"
                : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function MonthProgress() {
  const today = new Date();
  const currentDay = today.getDate();
  const totalDays = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const progress = Math.floor((currentDay / totalDays) * 100);

  const dots = Array.from({ length: totalDays }, (_, i) => ({
    isToday: i + 1 === currentDay,
    isPast: i + 1 < currentDay,
  }));

  return (
    <div className="rounded-xl border bg-background p-4 shadow-md w-fit">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold">Month</span>
        <span className="text-sm text-muted-foreground font-semibold">
          {progress}%
        </span>
      </div>
      <div className="grid grid-cols-10 gap-[3px]">
        {dots.map((dot, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              dot.isToday
                ? "bg-primary"
                : dot.isPast
                ? "bg-foreground"
                : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}
