import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { dummyProperties } from '@/data/properties'
// import type { Property } from '@/types/property'
// import { useProperties } from '@/hooks/useProperties'
import { ArrowRight, Heart } from 'lucide-react'
import FavoritesCard from './Common/FavoritesCard'
// import BookingCard from './Common/BookingCard'

const FavoritesInfo = () => {
    // const { data: properties = [], isLoading, isError } = useProperties()

    // console.log(isLoading)
    // console.log(isError)


    
  return (
    <>
    <Card className='p-10'>
        {/* Header */}
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-2'>
                <Heart></Heart>
                <h1 className='relative font-bold text-xl'>Favorite Properties (2)</h1>
            </div> 
            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                Active
            </Badge>
        </div>

        {/* Properties */}
            {dummyProperties.map((property) =>{

                return(
                    <FavoritesCard {...property} />
                )
            })}

            <button className='flex flex-row font-bold text-primary justify-center cursor-pointer'>View All Favorites <ArrowRight></ArrowRight> </button>
    </Card>
    </>
  )
}

export default FavoritesInfo