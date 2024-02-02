// key={chapter.id}
// id={chapter.id}
// label={chapter.title}
// isCompleted={!!chapter?.userProgress?.[0]?.isCompleted}
// courseId={course.id}
// isLocked={!chapter.isFree && !purchase}

type CourseSidebarItem = {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
};

const CourseSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItem) => {
  return <div>course sidebar item</div>;
};

export default CourseSidebarItem;
