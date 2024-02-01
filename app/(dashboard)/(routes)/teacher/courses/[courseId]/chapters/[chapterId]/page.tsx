const ChapterIdPage = async ({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) => {
  return (
    <div>
      chapterIdPage
      <p>chapterId: {params.chapterId}</p>
      <p>courseId: {params.courseId}</p>
    </div>
  );
};

export default ChapterIdPage;
