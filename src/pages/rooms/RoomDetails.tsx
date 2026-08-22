// import { createBooking } from "@/api/bookings"
import { fetchRoomType } from "@/api/properties"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"

const RoomDetails = () => {
    // Get the room id from url
    const { id } = useParams<{ id: string }>()
    const { roomTypeId } = useParams<{ roomTypeId: string }>()


    const {data: rooms} = useQuery({
      queryKey: ["room-list"],
      queryFn: () => fetchRoomType(id, roomTypeId)
    })

    console.log(rooms)



    const queryClient = useQueryClient()
    queryClient.invalidateQueries({queryKey: ["room-list"]})

  //   const { mutate: book, isPending} = useMutation({
    
  //     mutationFn: () => {
  //     const room = rooms?.find((r) => r.isAvailable)
  //     if (!room){
  //       throw new Error("No available room")
  //     }

  //     console.log("done room check up")
      
  //     return createBooking({
  //       roomId: room.id,
  //       seatNumber: 2,
  //       startMonth: "2026-08",
  //       durationMonths: 3
  //     })
  //   },
  //   onSuccess: () => {
  //     console.log("Booked. Check My Bookings")

  //     queryClient.invalidateQueries({queryKey: ["my-bookings"]})
  //   },
  //   onError: () => {
  //   }
  // })
    console.log(id)

    

    

  return (
    <div>RoomDetails</div>
  )
}

export default RoomDetails