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
import { Loader2 } from "lucide-react";
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
      const loadingToastId = toast({
        description: (
          <div className="flex gap-3">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p>ローディング中</p>
          </div>
        ),
      });
      const res = await onSubmit(data.url);
      if (res.error) {
        throw new Error(res.message);
      }
      loadingToastId.dismiss();
      toast({
        title: "リクエストを受け付けました",
      });
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
