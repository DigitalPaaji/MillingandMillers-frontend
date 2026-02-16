import React from 'react'
import ArticalCompo from './ArticalCompo';

const page = async({params}) => {
    const {slug} = await params;

  return (
<ArticalCompo slug={slug} />
  )
}

export default page