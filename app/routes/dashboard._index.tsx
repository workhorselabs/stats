import { ChartAreaInteractive } from "~/components/chart-area-interactive";
import { DataTable } from "~/components/data-table";
import {
  DayProgress,
  MonthProgress,
  WeekProgress,
  YearProgress,
} from "~/components/progress-dots";
import ProgressDotsSwitcher from "~/components/progress-dots-switcher";
import { SectionCards } from "~/components/section-cards";
import { data } from "~/lib/data";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <ProgressDotsSwitcher />
          </div>
          <div className="px-4 lg:px-6">
            <YearProgress />
          </div>
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-13 gap-[3px]">
              <WeekProgress />
            </div>
          </div>
          <div className="px-4 lg:px-6">
            <MonthProgress />
          </div>
          <div className="px-4 lg:px-6">
            <DayProgress />
          </div>
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
