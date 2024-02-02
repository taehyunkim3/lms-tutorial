import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      courseId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // const publishedChapters = await db.chapter.findMany({
    //   where: {
    //     courseId: params.courseId,
    //     isPublished: true,
    //   },
    // });

    // if (!publishedChapters.length) {
    //   return new NextResponse("Cannot Publish", { status: 400 });
    // }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not Found Course", { status: 404 });
    }

    const hasPublishedCouses = course.chapters?.some(
      (chapter) => chapter.isPublished
    );

    if (
      !hasPublishedCouses ||
      !course.title ||
      !course.description ||
      !course.categoryId ||
      !course.imgUrl
    ) {
      return new NextResponse("Cannot Publish, Missing Required", {
        status: 403,
      });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
