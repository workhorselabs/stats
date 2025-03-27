import { RotateCw } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

function getTotalDaysInYear(year: number): number {
  return new Date(year, 11, 31).getDate() === 31 ? 366 : 365;
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getCurrentHour(): number {
  return new Date().getHours();
}

function getCurrentWeek(): number {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 1);
  const diff = today.getTime() - start.getTime();
  return Math.ceil((diff / (1000 * 60 * 60 * 24) + start.getDay() + 1) / 7);
}

function getTotalDaysInMonth(): number {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
}

export default function ProgressDotsSwitcher() {
  const [view, setView] = useState<"Year" | "Month" | "Week" | "Day">("Year");
  const [useRowStructure, setUseRowStructure] = useState(false);
  const today = new Date();

  const { count, current, label } = useMemo(() => {
    switch (view) {
      case "Year":
        const totalDays = getTotalDaysInYear(today.getFullYear());
        return {
          count: totalDays,
          current: getDayOfYear(today),
          label: "Year",
        };
      case "Month":
        const totalMonthDays = getTotalDaysInMonth();
        return {
          count: totalMonthDays,
          current: today.getDate(),
          label: "Month",
        };
      case "Week":
        return {
          count: 52,
          current: getCurrentWeek(),
          label: "Week",
        };
      case "Day":
        return {
          count: 24,
          current: getCurrentHour(),
          label: "Day",
        };
    }
  }, [view, today]);

  const progress = Math.floor((current / count) * 100);
  const dots = Array.from({ length: count }, (_, i) => ({
    isToday: i === current,
    isPast: i < current,
  }));

  const getGridStyle = () => {
    if (!useRowStructure) {
      return {
        gridTemplateColumns: `repeat(${Math.min(count, 31)}, minmax(0, 1fr))`,
      };
    }

    switch (view) {
      case "Year":
        return {
          gridTemplateColumns: "repeat(31, minmax(0, 1fr))",
          gridTemplateRows: "repeat(12, minmax(0, 1fr))",
        };
      case "Month":
        return {
          gridTemplateColumns: "repeat(11, minmax(0, 1fr))",
          gridTemplateRows: "repeat(3, minmax(0, 1fr))",
        };
      case "Week":
        return {
          gridTemplateColumns: "repeat(13, minmax(0, 1fr))",
          gridTemplateRows: "repeat(4, minmax(0, 1fr))",
        };
      case "Day":
        return {
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          gridTemplateRows: "repeat(4, minmax(0, 1fr))",
        };
    }
  };

  return (
    <div className="rounded-xl border bg-background p-4 shadow-md w-fit">
      <div className={"mb-2"}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setUseRowStructure(!useRowStructure)}
        >
          <RotateCw />
        </Button>
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2">
          {["Year", "Month", "Week", "Day"].map((v) => (
            <button
              key={v}
              className={cn(
                "text-xs px-2 py-1 rounded-md border",
                v === view
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
              onClick={() => setView(v as any)}
            >
              {v}
            </button>
          ))}
        </div>

        <span className="text-sm text-muted-foreground font-semibold">
          {progress}%
        </span>
      </div>
      <div className="grid gap-[3px]" style={getGridStyle()}>
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
