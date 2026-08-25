
import { Card } from '@/components/ui/card'
import { House } from 'lucide-react'
import BookingCard from './Common/BookingCard'
// import { useProperties } from '@/hooks/useProperties'
// import { useQuery } from '@tanstack/react-query'
// import { fetchMyBookings } from '@/api/bookings'
import { useQuery } from '@tanstack/react-query'
import { fetchMyBookings } from '@/api/bookings'

const BookingInfo = () => {
    const { data: bookings} = useQuery({queryKey: ["my-bookings"], queryFn: fetchMyBookings})

    
  return (
    <>
    <Card className='p-10 h-100 mb-10 ml-5'>
        {/* Header */}
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-2'>
                <House></House>
                <h1 className='relative font-bold text-xl'>Current Booking</h1>
            </div> 
           
        </div>


        <div className='overflow-auto h-300'>
            {/* Properties */}
            {bookings?.map((property, i) =>{
                console.log(i)
                return(
                    <BookingCard {...property} />
                )
            })}

        </div>
        
    </Card>
    </>
  )
}

export default BookingInfo