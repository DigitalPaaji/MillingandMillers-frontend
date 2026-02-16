"use client"
import React, { useState } from 'react'
import AdminLayout from '../components/admin/Siderbar'
import { usePathname } from 'next/navigation'

const layout = ({children}) => {
  const pathName = usePathname()
const [isOpen,setIsOpen]= useState()



  if(pathName.includes("login")){
    return (<>
    
    {children}
    </>)
  }


  

  return (
    <div className='flex h-screen'>
      <AdminLayout isOpen={isOpen} />
      <div className='w-full h-screen overflow-scroll'>
      {children}

      </div>
      
      
      
      
      
      </div>
  )
}

export default layout