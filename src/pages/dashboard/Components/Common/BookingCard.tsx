
import type { Property } from '@/types/property'
import { Calendar, MapPin } from 'lucide-react'



const BookingCard = (property: Property) => {
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

        {/* Room Number */}
        <caption className='font-light text-left'>Room A</caption>
        
        {/* location and Date */}
        <div className='flex flex-row font-light gap-3'>

          <div className='flex flex-row'>
            <MapPin strokeWidth={1}></MapPin>
            <p className='relative top-0.5'>Colombo</p>
          </div>

          <div className='flex flex-row font-light'>
            <Calendar strokeWidth={1}></Calendar>
            <p className='relative top-0.5'>2024-01-15 to 2024-04-15</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default BookingCard