import getChapter from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/videoplayer";

const ChapterIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });

  const isLocked = !chapter?.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  //FIXME: userProgress?.isCompleted 앞에 !가 없어야하는거 아닌가?

  return (
    <div className="mt-[80px] ">
      {userProgress?.isCompleted && (
        <Banner label="이미 수강 완료한 챕터입니다. " variant="success" />
      )}
      {isLocked && (
        <Banner label="수강생에게만 제공되는 강의입니다." variant="warning" />
      )}
      <section className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter?.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
      </section>
    </div>
  );
};

export default ChapterIdPage;
