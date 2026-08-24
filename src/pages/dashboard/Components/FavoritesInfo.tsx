import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
// import type { Property } from '@/types/property'
// import { useProperties } from '@/hooks/useProperties'
import { ArrowRight, Heart } from 'lucide-react'
import FavoritesCard from './Common/FavoritesCard'
import { fetchFavorites } from '@/api/user-properties'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
// import BookingCard from './Common/BookingCard'

const FavoritesInfo = () => {
    const {data: favorites} = useQuery({
        queryKey: ["favorites-list"],
        queryFn: fetchFavorites

    })

    const navigate = useNavigate()

    
  return (
    <>
    <Card className='p-10 mb-10 ml-5'>
        {/* Header */}
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-2'>
                <Heart></Heart>
                <h1 className='relative font-bold text-xl'>Favorite Properties ({favorites?.length})</h1>
            </div> 
            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                Active
            </Badge>
        </div>

        {favorites?.length === 0 ? <div>No properties in favorites</div> : 
        <>
        {/* Properties */}
            {favorites?.map((property, i) =>{

                if (i<= 2){
                    return(
                        <FavoritesCard {...property} />
                    )

                }
            })}

            <button className='flex flex-row font-bold text-primary justify-center cursor-pointer'
            onClick={() => navigate("/favorites")}
            >View All Favorites <ArrowRight></ArrowRight> </button>
        </>}

    </Card>
    </>
  )
}

export default FavoritesInfo