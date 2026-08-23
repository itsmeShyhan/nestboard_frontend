import { createBooking } from "@/api/bookings"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { Room } from "@/types/property"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useState } from "react"
// import BookRoom from "./BookRoom"

const RoomCard = (room: Room) => {
  console.log(room.booking)

  const [available, setAvailable] = useState("")
  const [showBookingView, setShowBookingVIew] = useState(false)

  // Details required for booking
  const [duration, setDuration] = useState(3)
  const [startMonth, setStartMonth] = useState("")
  const [seatNumber, setSeatNumber] = useState(1)

  // let duration = 0
  // letstartMonth = ""
  // const [seatNumber, setSeatNumber] = useState(0)

  
  
  const queryClient = useQueryClient()
  console.log(available)
  console.log(setAvailable)

  function bookingView() {
    setShowBookingVIew(!showBookingView)
  }

  // function dummyHandler() {
  //   console.log("inside dummyhanlder")

  //   console.log(seatNumber)
  //   console.log(startMonth)
  //   console.log(duration)
  //   console.log(room.roomId)

  // }

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

            {/* name of booked people
            <div className="flex flex-col gap-4">
                <p>Amesh Perera - Software Engineer, 26</p>
                <p>Nimal Silva - Product Designer, 24</p>
                <p>Kasun Fernando - Data Analyst, 28</p>
            </div> */}

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