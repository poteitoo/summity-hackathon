import { SearchForm } from "@/components/search-form";
import { requesthVideoTranscription } from "./actions";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <h1 className="text-center text-4xl">Welcome to Summity</h1>
          <h2 className="text-center">
            Youtubeの動画を<span className="kbd">文字起こし</span>して
            <span className="kbd">翻訳・クイズ</span>を作成します。
          </h2>
          <p className="text-center">
            Youtubeで<span className="kbd">英語学習</span>してみましょう！
          </p>
          <SearchForm onSubmit={requesthVideoTranscription} />
        </div>
      </div>
    </div>
  );
}
