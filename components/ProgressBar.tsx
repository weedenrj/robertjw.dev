import clsx from "clsx";
import { ProgressBar } from "tina/__generated__/types";

export type ProgressBarProps = {
  details: ProgressBar
} & React.HTMLAttributes<HTMLDivElement>

export function ProgressBar({
  details,

  className,
  ...rest
}: ProgressBarProps) {
  return (
    <div className={clsx(className, "mb-5")}{...rest}>
      <div className="flex justify-between mb-1">
        <span className="font-semibold text-light-title dark:text-main-text">
          {details.title}
        </span>
        <span className="font-semibold text-light-title dark:text-main-text">
          {details.percentage}%
        </span>
      </div>
      <div className="w-full bg-light-bg-four rounded-full h-1 dark:bg-dark-bg-two">
        <div
          className={`${details.bgColor} h-1 rounded-full`}
          style={{ width: `${details.percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
