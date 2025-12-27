import React from 'react'
import CategCompo from './CategCompo'

const page = async({params}) => {
const {slug} = await params;

  return (
 <CategCompo slug={slug} />
  )
}

export default page