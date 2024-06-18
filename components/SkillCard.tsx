import clsx from "clsx";
import { Skills } from "tina/__generated__/types";

export type SkillCardProps = {
  skill: Skills
} & React.HTMLAttributes<HTMLDivElement>

export function SkillCard({
  skill,

  className,
  ...rest
}: SkillCardProps) {
  return (
    <div
      className={clsx('flex gap-4 rounded-xl p-6 border-dark-border',
        `bg-opacity-20 dark:border-2 ${skill.bgColor} dark:bg-transparent`
      )}
      {...rest}
    >
      <img
        className="w-10 h-10 object-contain block"
        src={skill.img}
        alt="icon"
      />
      <div className="space-y-2">
        <h3 className="dark:text-white text-[22px] font-semibold">
          {skill.skill}
        </h3>
        <p className="leading-8 text-text-primary dark:text-main-text">
          {skill.about}
        </p>
      </div>
    </div>
  );
};

export default SkillCard;
