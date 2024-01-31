import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      courseId: string;
      attachmentId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("허가되지 않은 접근", { status: 401 });
    }
    const { courseId, attachmentId } = params;
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("허가되지 않은 접근", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        id: attachmentId,
        courseId,
      },
    });
    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[COURSE_ID_ATTACHMENTS_ATTACHMENT_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
