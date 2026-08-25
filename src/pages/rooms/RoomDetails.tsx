// import { createBooking } from "@/api/bookings"
import { fetchRoomType } from "@/api/properties"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"
import RoomCard from "./components/RoomCard"

const RoomDetails = () => {
    // Get the room id from url
    const { id } = useParams<{ id: string }>()
    const { roomTypeId } = useParams<{ roomTypeId: string }>()



    const {data: roomType} = useQuery({
      queryKey: ["room-list"],
      queryFn: () => fetchRoomType(id, roomTypeId)
    })

  

    console.log(roomType)



    const queryClient = useQueryClient()
    queryClient.invalidateQueries({queryKey: ["room-list"]})

    

    

  return (
    <>
    <div className="flex flex-col gap-20">
    {roomType?.rooms.map((room) => {
      return (
          <RoomCard room={room} roomType={roomType} />
      )
    })}
    </div>
    </>
  )
}

export default RoomDetails