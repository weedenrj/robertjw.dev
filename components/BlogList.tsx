import { Blogs } from "tina/__generated__/types";
import BlogCard from "./BlogCard";
import clsx from "clsx";

export type BlogListProps = {
  availableBlogs: Blogs[]
} & React.HTMLAttributes<HTMLDivElement>

export function BlogList({
  availableBlogs,

  className,
  ...rest
}: BlogListProps) {
  return (
    <div className={clsx(className, "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mt-[30px]",
      "grid gap-x-10 gap-y-7 mb-6"
    )}
      {...rest}
    >
      {availableBlogs.filter(Boolean).map((item, index) => (
        <BlogCard key={index} blog={item} />
      ))}
    </div>
  )
}

export default BlogList;
