"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(3, { message: "title is REQUIRED" }).max(255),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      console.log(response);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("코스가 생성되었습니다.");
    } catch (error) {
      console.log("error", error);
      toast.error("코스 생성에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">코스 이름을 넣으세요</h1>
        <p className="text-sm text-slate-600 ">
          코스 이름을 어떻게 정할지 고민하고 계신가요? <br />
          코스 이름은 나중에 변경할 수 있습니다.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>코스 이름</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="코스 이름"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    코스에서 사용할 이름을 입력하세요. 나중에 변경할 수
                    있습니다.
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  취소
                </Button>
              </Link>

              <Button type="submit" disabled={!isValid}>
                계속
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
