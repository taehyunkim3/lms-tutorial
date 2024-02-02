"use client";

import { Category } from "@prisma/client";

import {
  FcEngineering,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
  FcBbc,
  FcGraduationCap,
} from "react-icons/fc";

import { IconType } from "react-icons";
import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  음악: FcMusic,
  미술: FcOldTimeCamera,
  스포츠: FcSportsMode,
  수학: FcSalesPerformance,
  프로그래밍: FcMultipleDevices,
  영어: FcBbc,
  과학: FcEngineering,
  기타: FcGraduationCap,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {/* <div className="flex"> */}
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
