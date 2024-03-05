"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  url: z.string().url({
    message: "有効なURLではありません。",
  }),
});

type Props = {
  onSubmit: (
    url: string,
  ) => Promise<{ message: string; video_id: string | null; error: boolean }>;
};

export function SearchForm({ onSubmit }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  const handlePasteButtonClick = useCallback(async () => {
    const text = await navigator.clipboard.readText();
    form.setValue("url", text);
  }, [form]);

  async function _onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await onSubmit(data.url);
      if (res.error) {
        throw new Error(res.message);
      }
      toast({
        title: "リクエストを受け付けました",
      });
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        return;
      }
      toast({
        title: "リクエストに失敗しました",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            {error instanceof Error ? (
              <code className="text-white">{error.message}</code>
            ) : (
              <code className="text-white">不明なエラーが発生しました</code>
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
        className="w-full max-w-3xl space-y-6 md:w-2/3"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="https://www.youtube.com/watch?v=XXXX"
                  className="h-12 w-full"
                  {...field}
                />
              </FormControl>
              <FormDescription>*youtubeのURLを入力してください</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={handlePasteButtonClick}
          >
            ペーストする
          </Button>
          <Button type="submit">送信する</Button>
        </div>
      </form>
    </Form>
  );
}
