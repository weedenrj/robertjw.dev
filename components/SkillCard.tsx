import clsx from "clsx";
import Image from "next/image";
import { Skill } from "constants/types";

export type SkillCardProps = {
  skill: Skill
} & React.HTMLAttributes<HTMLDivElement>

export function SkillCard({
  skill,

  className,
  ...rest
}: SkillCardProps) {
  return (
    <div
      className={clsx('flex gap-4 rounded-xl p-6 border-dark-border',
        'bg-opacity-20 dark:border-2 dark:bg-transparent',
        skill.bgColor
      )}
      {...rest}
    >
      <Image
        className="block object-contain w-10 h-10"
        width={40}
        height={40}
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
