"use client";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface CategoryItemProps {
  label: string;
  value: string;
  icon?: IconType;
}

const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
  return (
    <button
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition"
        //TODO: CHANGE STYLE IF ACTIVE
      )}
      type="button"
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}

      <div className="truncate">{label}</div>
    </button>
  );
};

export default CategoryItem;
