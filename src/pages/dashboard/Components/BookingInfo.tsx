import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { dummyProperties } from '@/data/properties'
// import { useProperties } from '@/hooks/useProperties'
import { House } from 'lucide-react'
import BookingCard from './Common/BookingCard'
// import FavoritesCard from './FavoritesInfo'

const BookingInfo = () => {
    // const { data: properties = [], isLoading, isError } = useProperties()

    // console.log(properties)
    // console.log(isLoading)
    // console.log(isError)


    
  return (
    <>
    <Card className='p-10'>
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

        {/* Properties */}
            {dummyProperties.map((property) =>{
                return(
                    <BookingCard {...property} />
                )
            })}
    </Card>
    </>
  )
}

export default BookingInfo