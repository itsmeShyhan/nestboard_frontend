import { createBooking } from "@/api/bookings"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { Room, RoomType } from "@/types/property"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useState } from "react"
// import BookRoom from "./BookRoom"

type RoomCardProps = {
  roomType: RoomType
  room: Room
}

const RoomCard = ({room, roomType}: RoomCardProps ) => {
  // console.log(room.booking)

  // const [available, setAvailable] = useState("")
  const [showBookingView, setShowBookingVIew] = useState(false)

  // Details required for booking
  const [duration, setDuration] = useState(3)
  const [startMonth, setStartMonth] = useState("")
  const [seatNumber, setSeatNumber] = useState(1)


  
  
  const queryClient = useQueryClient()


  function bookingView() {
    setShowBookingVIew(!showBookingView)
  }

  const { mutate: book} = useMutation({
    
      mutationFn: () => {
      
      console.log("done room check up")
      
      return createBooking({
        roomId: room.roomId,
        seatNumber: seatNumber,
        startMonth: startMonth,
        durationMonths: duration
      })
    },
    onSuccess: () => {
      console.log("Booked. Check My Bookings")

      queryClient.invalidateQueries({queryKey: ["my-bookings"]})
    },
    onError: () => {
      console.log("Booking failed.")

    }
  })



  return (

    <>
    <Card className=" relative top-40 w-5/6 m-auto pl-6 shadow-lg">

    <div className="">

             {/* name of room */}
        <h1 className="text-lg font-bold mb-4">{room.roomName}</h1>

        <div className="flex flex-col gap-10">

             {/* available room seats */}
            <div className="flex flex-row gap-12 h-lg">
                {room.booking.map(() => {

                    return(
                         <p className="rounded-full p-3 border-2 border-black "> <Plus /></p>
                    )
                })}
               
            </div>

            {/* how many available */}
            <p>{room.booking.length} available</p>

            {/* Booking card */}

            
            <div>
                <form className="flex flex-col gap-4 text-center border-5 border-black w-1/2 m-auto">

                    {/* Seat Number */}
                    <div className="flex flex-row gap-5 justify-center">
                     
                      <label htmlFor="seatNumber">Seat Number</label>
                      <select id="seatNumber" name="seatNumber" onChange={(e) => setSeatNumber(Number(e.target.value))}>
                          {room.booking.map((seat) => <option value={seat.seatIndex}>{seat.seatIndex}</option>)}
                      </select>

                    </div>
                    
                    {/* lease start month */}
                    <div>
                      <input type="month" name="" id="" value={startMonth} onChange={(e) => setStartMonth(e.target.value)} min={"2026-09"} />
                    </div>

                    {/* Duration */}

                    <div>
                        <label htmlFor="duration">Duration</label>
                        <select id="duration" name="duration" onChange={(e) => setDuration(Number(e.target.value))}>
                            <option value={3}>3 Months</option>
                            <option value={6}>6 Months</option>
                        </select>
                    </div>


                    <div>
                      <h1>Total: {duration * Number(roomType.pricePerMonth)}</h1>
                    </div>


                    <Button type="button" onClick={() => book()}>Book Room</Button>
                  
                </form>
            </div>
            
        </div>

        <Button className="relative left-130" hidden={showBookingView} onClick={() => bookingView()}>Book this seat</Button>


    
        

    
  


    </div>
        
       

        
       



        
    </Card>

    {/* {showBookingView ? <BookRoom {...room} /> : null} */}
    </>
  )
}

export default RoomCard