import { fetchFavorites } from "@/api/user-properties"
import { useQuery } from "@tanstack/react-query"
import FavoritesCard from "./components/FavoritesCard"
import  {Card} from "@/components/ui/card"
import { HeartCrack } from "lucide-react"
// import { House, Badge } from "lucide-react"

const Favorites = () => {
    const {data: favorites, isLoading} = useQuery({
        queryKey: ["favorites-list"],
        queryFn: fetchFavorites

    })

   


    
  if (!isLoading && Array.isArray(favorites)) return (
    <>    
    <div>

    <h1 className='relative font-bold text-3xl top-25 left-9'>Favorites</h1>

    {favorites?.length > 0 ? (<Card className='p-10 h-100 mb-10 ml-5 mt-30'>
        <div className='overflow-auto h-300'>
            {/* Properties */}
            {favorites?.map((property) =>{
                return(
                    <FavoritesCard {...property} />
                )
            })}

        </div>
        
    </Card>)

    :
    <div className="flex flex-row justify-center mt-60 gap-8">
        <HeartCrack strokeWidth={0.2} className="size-40"></HeartCrack>
        <h3 className="relative top-14 text-lg">You have no favorite Apartments yet. <br /> Visit Explore to browse more properties</h3>
    </div>
}
    
    
 
    </div>
    </>
  )
}

export default Favorites