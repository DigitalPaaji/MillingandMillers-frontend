import React from 'react';
import { FaWheatAwn, FaCheck, FaArrowRight } from "react-icons/fa6";

const WheatSection = () => {
  const wheatData = [
    {
      id: 1,
      title: "The Anatomy of a Kernel",
      image: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&w=200&q=80",
      description: "Composed of three crucial parts: the bran, the germ, and the endosperm."
    },
    {
      id: 2,
      title: "A Global Staple Food",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80",
      description: "Provides approx. 20% of daily food calories for the world's population."
    },
    {
      id: 3,
      title: "Major Varieties & Uses",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=200&q=80",
      description: "Classified into Hard (breads) and Soft (pastries), planted in Winter or Spring."
    },
    {
      id: 4,
      title: "The Milling Process",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80",
      description: "Separating the bran and germ from the endosperm through advanced rollers."
    },
    {
      id: 5,
      title: "Nutritional Powerhouse",
      image: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&w=200&q=80",
      description: "Rich in dietary fiber, B vitamins, antioxidants, iron, zinc, and magnesium."
    },
    {
      id: 6,
      title: "Sustainable Future",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=200&q=80",
      description: "New drought-resistant varieties are being developed for future food security."
    }
  ];

  return (
    <section className="bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-4">
         <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
                  <div className="flex items-center">
                    <div className="w-1.5 h-8 bg-[#FF3F5A] mr-3 rounded-full hidden sm:block"></div>
                    <h2 className='text-2xl font-bold text-gray-800'>Wheats</h2>
                  </div>
                  
                  <a href="#" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#FF3F5A] transition-colors group">
                    View More 
                    <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
                  </a>
                </div>
       
        <div className="    bg-gray-50 ">
           
          

           <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {wheatData.map((item) => (
                <div key={item.id} className="flex items-start gap-5 group p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
                   
                   {/* Small Thumbnail Image */}
                   <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                   </div>

                   {/* Text Content */}
                   <div>
                      <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#ffb400] transition-colors mb-1">
                         {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                         {item.description}
                      </p>
                   </div>

                </div>
              ))}
           </div>

         
           
        </div>

      </div>
    </section>
  )
}

export default WheatSection