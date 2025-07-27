import clsx from "clsx";
import type { ProgressBar as ProgressBarType } from "constants/types";

export type ProgressBarProps = {
  progressBar: ProgressBarType
} & React.HTMLAttributes<HTMLDivElement>

export function ProgressBar({
  progressBar,

  className,
  ...rest
}: ProgressBarProps) {
  return (
    <div className={clsx(className, "mb-5")}{...rest}>
      <div className="flex justify-between mb-1">
        <span className="font-semibold text-light-title dark:text-main-text">
          {progressBar.title}
        </span>
        <span className="font-semibold text-light-title dark:text-main-text">
          {progressBar.percentage}%
        </span>
      </div>
      <div className="w-full bg-light-bg-four rounded-full h-1 dark:bg-dark-bg-two">
        <div
          className={`${progressBar.bgColor} h-1 rounded-full`}
          style={{ width: `${progressBar.percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
