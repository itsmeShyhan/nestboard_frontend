import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { House } from 'lucide-react'
import BookingCard from './Common/BookingCard'
import { useQuery } from '@tanstack/react-query'
import { fetchMyBookings } from '@/api/bookings'

const BookingInfo = () => {
    const { data: bookings} = useQuery({queryKey: ["my-bookings"], queryFn: fetchMyBookings})
    // console.log(properties)
    // console.log(isLoading)
    // console.log(isError)

    
  return (
    <>
    <Card className='p-10 h-100 mb-10 ml-5'>
        {/* Header */}
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-2'>
                <House></House>
                <h1 className='relative font-bold text-xl'>Current Booking</h1>
            </div> 
            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                Active
            </Badge>
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