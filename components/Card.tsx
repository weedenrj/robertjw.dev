import clsx from "clsx";
import { Education, Experience } from "tina/__generated__/types";

export type CardProps = {
  details: Experience | Education
} & React.HTMLAttributes<HTMLDivElement>

export function Card({
  details,

  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={clsx(className, details.bgColor, "dark:bg-transparent py-4 pl-5 pr-3 ",
        `space-y-2 mb-6 rounded-lg dark:border-dark-border dark:border-2`
      )}
      {...rest}
    >
      <span className="text-tiny text-text-primary dark:text-dark-text">
        {details.year}
      </span>
      <h3 className="text-xl dark:text-white">{details.title}</h3>
      <p className="dark:text-dark-text">{details.subTitle}</p>
    </div>
  );
};

export default Card;
