import { SearchForm } from "@/components/search-form";
import { requesthVideoTranscription } from "./actions";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <div className="flex h-full w-full items-center justify-center">
        <SearchForm onSubmit={requesthVideoTranscription} />
      </div>
    </div>
  );
}
