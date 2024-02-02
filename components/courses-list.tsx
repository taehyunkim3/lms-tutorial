import { CourseWithProgressWithCategory } from "@/actions/get-courses";
import { Category, Course } from "@prisma/client";
import CourseCard from "@/components/course-card";

const CoursesList = ({
  courses,
}: {
  courses: CourseWithProgressWithCategory[];
}) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid=cols-4 2xl:grid-cols-4 gap-4">
        {courses.map((course) => (
          // <div key={course.id}>{course.title}</div>
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imgUrl={course.imgUrl!}
            chapterLength={course.chapters.length}
            price={course.price!}
            progress={course.progress!}
            category={course?.category?.name!}
          />
        ))}
      </div>
      {courses.length === 0 && (
        <p className="text-sm text-muted-foreground text-center mt-10">
          코스가 없습니다
        </p>
      )}
    </div>
  );
};

export default CoursesList;
