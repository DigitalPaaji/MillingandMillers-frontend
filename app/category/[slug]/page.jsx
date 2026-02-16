import React, { Suspense } from "react";
import CategoryCompo from "./CategoryCompo";
import FiltrerData from "./FiltrerData";
import NewsPageSkeleton from "@/app/components/NewsPageSkeleton ";

export default async function  Page ({ params, searchParams }) {
  const {slug} = await params;

  const {page} = await searchParams;
  const {subcat} = await searchParams || null;
  const {monthyear} = await searchParams || null;




  return (
    <div className="flex md:p-6 lg:p-10 gap-4">
        <Suspense fallback={<div><NewsPageSkeleton /></div>}>
        <div className="">
        
<FiltrerData  slug={slug}  subcat={subcat} monthyear={monthyear} />
        </div>
           </Suspense>
      <Suspense fallback={<div><NewsPageSkeleton /></div>}>
        <CategoryCompo
          slug={slug}
          page={Number(page || 1)}
          subcat={subcat}
          monthyear={monthyear}
        />
      </Suspense>
    </div>
  );
}
