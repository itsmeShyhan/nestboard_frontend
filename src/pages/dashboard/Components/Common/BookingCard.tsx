
import { Button } from '@/components/ui/button'
import type { BookingDTO } from '@/types/booking'
// import type { Property } from '@/types/property'
import { Calendar, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const payment = {
  "PENDING": "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  "CONFIRMED":"bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  "CANCELLED":"bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  "EXPIRED":"bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300"

}

function paymentStyle (status: string): string {
  switch (status) {
    case "CONFIRMED":
      return payment.CONFIRMED
      break;
    
    case "PENDING":
      return payment.PENDING
      break;

    case "EXPIRED":
      return payment.EXPIRED
      break;
    
    case "CANCELLED":
      return payment.CANCELLED
      break;

    default:
      return payment.PENDING
  
  }
}

const BookingCard = (property: BookingDTO) => {
  return (
    <>
    <div className='flex flex-row  p-8 shadow-xl justify-between'>
      
      {/* Property Image and name, room name, location and date of lease */}
      <div className='flex flex-row text-left gap-5'>

         {/* Property Image */}
        <div>
          <img className='size-30 rounded-2xl object-cover' src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=500&fit=crop" alt="" />
        </div>

        {/* property name, room name, location and date of lease */}
        <div className='flex flex-col gap-7'>

          {/* Property Name */}
          <h1 className='font-bold'>{property.room.roomType.property.title}</h1>

          {/* Room Number */}
          <caption className='font-light text-left'>{property.room.roomLabel}</caption>
          
          {/* location and Date */}
          <div className='flex flex-row font-light gap-3'>

            <div className='flex flex-row'>
              <MapPin strokeWidth={1}></MapPin>
              <p className='relative top-0.5'>{property.room.roomType.property.city}</p>
            </div>

            <div className='flex flex-row font-light'>
              <Calendar strokeWidth={1}></Calendar>
              <p className='relative top-0.5'>2024-01-15 to 2024-04-15</p>
            </div>
          </div>

          <Button className='w-40'>View Property</Button>
        </div>

        

      </div>

       <Badge className={paymentStyle(property.bookingStatus)}>
                {property.bookingStatus}
      </Badge>



      
    </div>
    </>
  )
}

export default BookingCard