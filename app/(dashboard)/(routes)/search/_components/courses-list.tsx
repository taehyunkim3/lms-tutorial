import { CourseWithProgressWithCategory } from "@/actions/get-courses";
import { Category, Course } from "@prisma/client";

const CoursesList = ({
  courses,
}: {
  courses: CourseWithProgressWithCategory[];
}) => {
  return (
    <div className="">
      {courses.map((course) => (
        <div key={course.id}>{course.title}</div>
      ))}
    </div>
  );
};

export default CoursesList;
