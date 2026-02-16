"use client";

import { useSearchParams } from "next/navigation";
import ArticalCompo from "./ArticalCompo";

export default function ArticlesWrapper() {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page") || "1";

  return <ArticalCompo page={pageNumber} />;
}
