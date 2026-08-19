import { fetchFavorites } from "@/api/user-properties"
import { useQuery } from "@tanstack/react-query"

const Favorites = () => {
    const {data: favorites} = useQuery({
        queryKey: ["favorites-list"],
        queryFn: fetchFavorites

    })




  return (
    <>    
    <div>
      {favorites?.map((e) => {
        
        return(
            
        <p id={e.id}>{e.title}</p>
        )
        })}  
    </div>
    </>
  )
}

export default Favorites