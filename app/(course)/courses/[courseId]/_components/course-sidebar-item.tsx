"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

const CourseSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // prettier-ignore
  const Icon = isLocked ?  Lock : (isCompleted ? CheckCircle : PlayCircle)

  const isActive = pathname.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center pl-6 text-slate-500 font-[500] hover:bg-slate-50 text-sm",
        isActive && " border-r-slate-600 border-r-4 bg-slate-200/20",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-50"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          className={cn(
            " text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700"
          )}
        />
        {label}
      </div>
    </button>
  );
};

export default CourseSidebarItem;
