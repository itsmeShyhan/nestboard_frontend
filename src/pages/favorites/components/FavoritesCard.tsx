import { toggleFavorite } from "@/api/user-properties"
import { Button } from "@/components/ui/button"
import type { Property } from "@/types/property"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MapPin } from "lucide-react"

const FavoritesCard = (property: Property) => {

    const queryClient = useQueryClient()

    const { mutate: favoriteHandler} = useMutation({
    mutationFn: () => toggleFavorite(property.id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["favorites-list"]})
      console.log("Booked. Check My Bookings")
    },
    onError: () => {
      console.log("Booked. Check My Bookings")
    }
  })

    console.log(property)

    
  return (
    <div>
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
          <h1 className='font-bold'>{property.title}</h1>

          {/* Room Number */}
          {/* <caption className='font-light text-left'>{pro}</caption> */}
          
          

          {/* location and Date */}
            <div className='flex flex-row'>
              <MapPin strokeWidth={1}></MapPin>
              <p className='relative top-0.5'>{property.location}</p>
            </div>
          

              {/* Pricing Per Moth */}
          <div className='flex flex-row font-light gap-3'>
            <p className='text-primary font-extrabold'>LKR 20,000-30,000  </p>
            <p>/month</p>
          </div>
        </div>        
      </div>

      <Button className='w-20 bg-red-500' onClick={() => favoriteHandler()}>Delete</Button>

      
    </div>
    </>
    </div>
  )
}

export default FavoritesCard