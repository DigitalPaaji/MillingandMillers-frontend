import { Suspense } from "react";
import TopLine from "@/app/components/admin/TopLine";
import ArticlesWrapper from "./ArticlesWrapper";

export default function Page() {
  return (
    <div className="px-5 py-5">
      <TopLine title="Articals" link="/admin/articles/create" />

      <Suspense fallback={<div>loading ...</div>}>
        <ArticlesWrapper />
      </Suspense>
    </div>
  );
}
