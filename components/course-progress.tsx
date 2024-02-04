interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

const CourseProgress = () => {
  return <div>course progress</div>;
};

export default CourseProgress;
