import type { Property } from '@/types/property'
import { MapPin } from 'lucide-react'


const FavoritesCard = (property: Property) => {

  console.log(property)

  return (
    <>
    
    

    <div className='flex flex-row text-left gap-5 p-8 shadow-xl'>
      
      {/* Property Image */}
      <div>
        <img className='size-30 rounded-2xl object-cover' src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=500&fit=crop" alt="" />
      </div>

      <div className='flex flex-col gap-7'>

        {/* Property Name */}
        <h1 className='font-bold'>Green Villa Colombo</h1>

        {/* Location */}

        <div className='flex flex-row'>
            <MapPin strokeWidth={1}></MapPin>
            <p className='relative top-0.5'>Ethul Kotte</p>
        </div>
        
        {/* Pricing Per Moth */}
        <div className='flex flex-row font-light gap-3'>
          <p className='text-primary font-extrabold'>LKR 20,000-30,000  </p>
          <p>/month</p>
        </div>
      </div>
    </div>
    </>
  )
}


export default FavoritesCard