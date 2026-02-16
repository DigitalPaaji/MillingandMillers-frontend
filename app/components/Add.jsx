"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { img_url } from './urls'
import Link from 'next/link'

const Add = ({ count = 0 }) => {
  const { info, isLoading } = useSelector((state) => state.adds)

  // 1. Loading State: Return a Skeleton instead of text
  if (isLoading) {
    return <AdSkeleton />
  }

  // 2. Error/Empty State: Return null so we don't show an empty white box
  if (!info || !info.success || !info.adds || info.adds.length === 0) {
    return null; 
  }

  const ads = info.adds;

  // 3. INDEX LOGIC: 
  // Use modulo (%) operator. This prevents the app from crashing 
  // if you request 'count={5}' but there are only 3 ads.
  // It will simply cycle back to the start.
  const safeIndex = count % ads.length;
  const currentAd = ads[safeIndex];

  // If for some reason the specific ad object is undefined, return null
  if (!currentAd) return null;

  return (
    <div className='container px-4 mx-auto my-2'>
      <div className='flex flex-col items-center w-full'> 
        
        
        <div className='relative group w-full max-w-[728px] mx-auto'>
          
       
       <div className='absolute top-0 right-0 flex'>
  <div className='bg-red-600/90 text-white p-1 text-[8px] md:text-[10px] relative overflow-hidden '>Ad
  <p className='h-6 bg-[#D9DBDA] w-full absolute rotate-45 -bottom-[21px] -left-[1.6px] md:left-0 '></p>

 </div>

</div>

          <Link 
            href={currentAd.link || '#'} 
            target='_blank' 
            rel="noopener noreferrer" // Security best practice for target blank
            className="block border border-gray-200 bg-gray-50 h5 transition-opacity"
          >
           
            <img 
              src={`${img_url}${currentAd.addimg}`}
              alt='Sponsored Content'
              className='w-full h-auto object-cover max-h-[90px] md:max-h-[200px]' 
            />
          </Link>
        </div>

      </div>
    </div>
  )
}

// Helper Component: Skeleton Loader
const AdSkeleton = () => {
  return (
    <div className='container px-4 mx-auto my-8'>
      <div className='flex flex-col items-center w-full'>
        <div className='h-3 w-20 bg-gray-200 rounded mb-1 animate-pulse'></div>
        <div className='w-full max-w-[728px] h-[90px] md:h-[120px] bg-gray-200 animate-pulse rounded border border-gray-300'></div>
      </div>
    </div>
  )
}

export default Add