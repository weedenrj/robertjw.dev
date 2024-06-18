import clsx from "clsx";

export type TagProps = {
  tagName: string
} & React.HTMLAttributes<HTMLButtonElement>

export function Tag({
  tagName,

  className,
  ...rest
}: TagProps) {
  return (
    <button className={clsx("resume-btn cursor-default rounded-lg",
      "bg-light-bg-six pl-5 pr-5 pt-2 pb-2 text-text-primary dark:bg-dark-bg-two",
      "dark:text-main-text")}
      {...rest}
    >
      {tagName}
    </button>
  );
};

export default Tag;
