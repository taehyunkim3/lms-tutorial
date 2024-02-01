"use client";

import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { File, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course, Attachment } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: initialData?.attachments || [],
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.log("error", error);
      toast.error("저장에 실패했습니다");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("삭제되었습니다");
      router.refresh();
    } catch (error) {
      console.log("error", error);
      toast.error("삭제에 실패했습니다");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        Course Attachment
        <Button variant={"ghost"} onClick={toggleEditing}>
          {isEditing && <>cancel</>}
          {!isEditing && !initialData.attachments && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.attachments && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Attachment
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <div className="text-sm mt-2 text-slate-500 italic">
              No Attachment
            </div>
          )}
        </>
      )}
      {!isEditing && initialData.attachments.length > 0 && (
        <div className="space-y-2">
          {initialData.attachments.map((attachment: Attachment) => (
            <div
              key={attachment.id}
              className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
            >
              <File className="h-4 w-4 mr-2" />
              <p className="text-xs line-clamp-1"> {attachment.name}</p>
              {deletingId === attachment.id ? (
                <div>
                  <Loader2 className="h-4 w-4 mr-2" />
                </div>
              ) : (
                <button
                  className="ml-auto hover:opacity-75 transition"
                  onClick={() => onDelete(attachment.id)}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({
                  url,
                });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything you want to share with your students.
          </div>
        </div>
      )}
    </div>
  );
};
