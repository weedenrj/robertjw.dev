import { Blog } from "constants/types";
import BlogCard from "./BlogCard";
import clsx from "clsx";

export type BlogListProps = {
  availableBlogs: Blog[]
} & React.HTMLAttributes<HTMLDivElement>

export function BlogList({
  availableBlogs,

  className,
  ...rest
}: BlogListProps) {
  return (
    <div className={clsx("grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-[30px]", className)} {...rest}>
      {availableBlogs.map((item) => (
        <div key={item.id} className="">
          <BlogCard details={item} />
        </div>
      ))}
    </div>
  );
}

export default BlogList
