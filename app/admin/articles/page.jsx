"use client"
import TopLine from '@/app/components/admin/TopLine'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import ArticalCompo from './ArticalCompo'

const page = () => {
const searchParams = useSearchParams();

const pageNumber = searchParams.get("page") || 1;


  return (
    <div className='px-5 py-5'>

  <TopLine title="Articals" link="/admin/articles/create" />
   

<Suspense fallback={<div>loading ...</div>}>
<ArticalCompo page={pageNumber} />

</Suspense>
    </div>
  )
}

export default page