"use client"
import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { usePathname } from 'next/navigation'
import { Slide, ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import store from './components/store/store'


const LayoutCompo = ({children}) => {
    const pathName = usePathname()
  return (
   <>
   <Provider store={store} >
   <ToastContainer  
   position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Slide}/>
   {pathName.includes("admin")? <>{children} </> :<>
   <Header  />
        {children}
        <Footer />
       
        
        
        </>}
         </Provider>
        
   </>
  )
}

export default LayoutCompo