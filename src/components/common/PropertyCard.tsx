import { Star } from "lucide-react"
import { Badge } from "../ui/badge"
import { Card } from "../ui/card"
import type { Property } from "@/types/property"
import { Link } from "react-router"
import { Button } from "../ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchFavorites, toggleFavorite } from "@/api/user-properties"
import { useMemo, useState } from "react"


export function PropertyCard(props: Property) {

 

  const [isFavorite, setIsFavorite] = useState(false)

  const queryClient = useQueryClient()

    const {data: properties} = useQuery({
        queryKey: ["favorites-list"],
        queryFn: fetchFavorites
    })

    const lal = useMemo(() => {
      return properties?.some((property) => property.id === props.id) ?? false
    }, [properties, props.id])


    console.log(lal)

    // if (properties){
    //   setIsFavorite(properties.some((property) => property.id === props.id))
    // }
  
  

    // each property, if one of them has an id that matches this property id then set message to favorited else set it to the "add to favorite."
   
    // const {id} = properties
    // console.log(properties)
    // console.log(properties?.id === props.id)
    // console.log(id)
    console.log(props.id)
    
  const { mutate: favoriteHandler} = useMutation({
    mutationFn: () => {
      return toggleFavorite(props.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["favorites-list"]})
      setIsFavorite(!isFavorite)
      console.log(properties)
      console.log("Booked. Check My Bookings")
      // setMessage("Booked. Check My Bookings")
      // queryClient.invalidateQueries({queryKey: ["my-bookings"]})
    },
    onError: () => {
      console.log("Booked. Check My Bookings")

      // setMessage("Could not create booking")
    }
  })



  // function favoriteHandler(propertyId: string){
    
  // }
  return (
    
    <>
    <Link to={`/property-details/${props.id}`} className="block">
      <Card
        className="relative cursor-pointer rounded-2xl p-0 ring-0"
        style={{ aspectRatio: "1/1" }}
      >
        {/* Background image */}
        <img
          src={props.image}
          alt={"title"}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
        {/* Rating badge */}
        <Badge className="absolute top-2.5 right-2.5 h-auto gap-1 border-0 bg-white/90 py-0.5 text-gray-800 backdrop-blur-sm">
          <Star className="size-3 fill-yellow-400 text-yellow-400" />
          {props.rating}
        </Badge>

        

        {/* Bottom info */}
        <div className="absolute right-0 bottom-0 left-0 p-3">
          <Badge
            variant="secondary"
            className="mb-1.5 h-auto border-0 bg-white/25 text-[9px] tracking-wider text-white uppercase backdrop-blur-sm hover:bg-white/25"
          >
            {props.type}
          </Badge>
          <h3 className="text-sm leading-snug font-bold text-white">
            {props.title}
          </h3>
          <p className="mb-1.5 text-[11px] text-white/65">{props.location}</p>
          <p className="text-sm text-white">
            <span className="font-bold">{props.price}</span>
            <span className="text-[11px] text-white/60"> /Month</span>
          </p>
        </div>
      </Card>
    </Link>

    {/* favorites badge */}
        <Button size={"xs"} className="relative bottom-2 right-55 w-30" onClick={() => favoriteHandler()}>
          {lal ? "favorited" : "Add to Favorite"}
        </Button>
    </>
  )
}
