import { fetchMyBookings } from '@/api/bookings'
import { fetchFavorites } from '@/api/user-properties'
import { Card } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'

const StatsCard = () => {

  const { data: bookings} = useQuery({queryKey: ["my-bookings"], queryFn: fetchMyBookings})

  const {data: favorites} = useQuery({
          queryKey: ["favorites-list"],
          queryFn: fetchFavorites
  
      })

      console.log(bookings)
      console.log(favorites)

  return (
    <Card className='w-[25dvw] shadow-xl'>
      <h1 className='font-bold text-lg text-left pl-5'>Quick Stats</h1>

      <div className='flex flex-col'>
        <div className='flex flex-row justify-between p-5 text-sm'>
          <h3 className='font-light'>Total Bookings</h3>
          <p className='font-bold'>{bookings?.length ?? 0}</p>
        </div>

        <div className='flex flex-row justify-between p-5 text-sm'>
          <h3 className='font-light'>Favorites</h3>
          <p className='font-bold'>{favorites?.length}</p>
        </div>

        <div className='flex flex-row justify-between p-5 text-sm'>
          <h3 className='font-light'>Days Stayed</h3>
          <p className='font-bold'></p>
        </div>
      </div>
  
    </Card>
  )
}

export default StatsCard