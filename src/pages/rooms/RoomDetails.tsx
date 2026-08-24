// import { createBooking } from "@/api/bookings"
import { fetchRoomType } from "@/api/properties"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import RoomCard from "./components/RoomCard"
import { useLeaseStore } from "@/stores/leaseStore"

const RoomDetails = () => {
    // Get the room id from url
    const { id } = useParams<{ id: string }>()
    const { roomTypeId } = useParams<{ roomTypeId: string }>()
    const startMonth = useLeaseStore((state) => state.startMonth)
    const durationMonths = useLeaseStore((state) => state.durationMonths)
    const setDurationMonths = useLeaseStore((state) => state.setDurationMonths)
    const setStartMonth = useLeaseStore((state) => state.setStartMonth)


    const {data: roomType} = useQuery({
      queryKey: ["room-list", durationMonths, startMonth],
      queryFn: () => fetchRoomType(id, roomTypeId, startMonth, durationMonths)
      
    })

    

  return (
    <>
    <div className=" flex flex-row gap-10 m-auto rounded-full border-3 border-primary w-max shadow-lg absolute top-20 left-130 p-5 text-center z-2">

      <div className="flex flex-col text-center justify-between">
        {/* Start Month */}
        <label className="font-bold" htmlFor="startMonth">Start month</label>

        {/* Start Month */}
        <input className="border-1 border-black rounded-full p-1" type="month" name="" id="startMonth" value={startMonth} onChange={(e) => 
                {
                  setStartMonth(e.target.value)
                  // setStart(e.target.value)
                  // queryClient.invalidateQueries({queryKey: ["room-list"]})
                  
                }} min={"2026-09"} />


      
      </div>


      <div className="flex flex-col gap-4">        

        <label className="font-bold" htmlFor="duration">Duration</label>

         {/* Duration */}
        <select className="border-1 border-black rounded-full p-1" id="duration" name="duration" onChange={(e) => {
                // setDuration(Number(e.target.value))
                setDurationMonths(e.target.value)

              }}>
                      <option value={3}>3 Months</option>
                      <option value={6}>6 Months</option>
        </select>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="font-bold">Price</h1>
        <p>LKR {Number(durationMonths) * Number(roomType?.pricePerMonth)}</p>
      </div>
    </div>


    <div className="flex flex-col gap-20 z-1">
    {roomType?.rooms.map((room) => {
      return (
          <RoomCard room={room} roomType={roomType} duration={durationMonths} startMonth={startMonth}/>
      )
    })}
    </div>
    </>
  )

}

export default RoomDetails