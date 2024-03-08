"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  keyword: z.string().url({
    message: "有効なURLではありません。",
  }),
});

export function VideoSearchForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keyword: "",
    },
  });

  async function _onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      form.reset();
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        return;
      }
      toast({
        title: "リクエストに失敗しました",
        description: (
          <pre className="rounded-md py-4">
            {error instanceof Error ? (
              <code className="font-semibold text-white">{error.message}</code>
            ) : (
              <code className="font-semibold text-white">
                不明なエラーが発生しました
              </code>
            )}
          </pre>
        ),
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(_onSubmit)}
        className="flex w-full max-w-3xl gap-3 space-y-6 md:w-2/3"
      >
        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="https://www.youtube.com/watch?v=XXXX"
                  className="h-12 w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">送信する</Button>
      </form>
    </Form>
  );
}
