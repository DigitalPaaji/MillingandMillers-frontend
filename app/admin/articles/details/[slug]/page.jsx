import React from 'react'
import DetailCompo from './DetailCompo'

const page =async ({params}) => {
    const {slug} = await params
  return (<>
  
  <DetailCompo slug={slug} />
  </>
  )
}

export default page