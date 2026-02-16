import React from 'react'
import EditArticles from './EditArticles';

const page =async ({params}) => {
    const {slug} = await params;
  return (
    <div>

<EditArticles slug={slug} />

    </div>
  )
}

export default page