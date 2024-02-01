import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";

const ChapterIdPage = async ({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.videoUrl, chapter.descroption];

  const totalRequiredFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalRequiredFields}`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-6">
      <aside className="flex items-center justify-between ">
        <div className="w-full">
          <Link
            href={"#"}
            className="flex items-center text-sm hover:opacity-75 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course Setup
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Chapter Creation</h1>
              <span className="text-sm text-slate-700">
                Complete all fields {completionText}
              </span>
            </div>
          </div>
        </div>
      </aside>
      <article className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <section>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customise your chapter</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
          </section>
          <section>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h2 className="text-xl">Access Setting</h2>
            </div>
            <ChapterAccessForm
              chapterId={params.chapterId}
              courseId={params.courseId}
              initialData={chapter}
            />
          </section>
        </div>
        <section>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Video} />
            <h2 className="text-xl">Add a video</h2>
          </div>
        </section>
      </article>
    </div>
  );
};

export default ChapterIdPage;
