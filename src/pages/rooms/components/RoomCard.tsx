import { createBooking } from "@/api/bookings"
import { useAuth } from "@/components/auth/AuthProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { Room, RoomType } from "@/types/property"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
// import BookRoom from "./BookRoom"

type RoomCardProps = {
  roomType: RoomType
  room: Room
}

const RoomCard = ({room, roomType}: RoomCardProps ) => {

  const { isSignedIn } = useAuth()

  const navigation = useNavigate()

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
    onSuccess: (data) => {
      console.log("Booked. Check My Bookings")

      queryClient.invalidateQueries({queryKey: ["my-bookings"]})
      queryClient.invalidateQueries({queryKey: ["room-list"]})

      
      navigation(`/payment/${data.id}`)

      


    },
    onError: () => {
      console.log("Booking failed.")

    }
  })


  return (

    <>

    {/* Room Card */}
    <Card className=" relative top-40 w-5/6 m-auto pl-6 shadow-lg">

    <div className="">

       <div>
              {/* name of room */}
        <h1 className="text-lg font-bold mb-4">{room.roomName}</h1>

        <div className="flex flex-col gap-10">

             {/* available room seats */}
            <div className="flex flex-row gap-12 h-lg">
                {room.booking.map((seat) => {
                  console.log(seat.tenant === "")
                  if (seat.tenant === ""){
                    return(
                         <p className="rounded-full p-3 border-2 border-black "> <Plus /></p>
                    )
                  }else {
                    return(
                         <p className="rounded-full p-3 border-2 bg-orange-100 p-6"></p>
                    )
                  }
                })}
               
            </div>

            {/* how many available */}
            <p>{room.booking.length} available</p>

           
            
        </div>

        <div className="w-1/1 flex flex-row justify-end pr-10">
        <Button className="" hidden={showBookingView} onClick={() => {
          if (!isSignedIn) {
          navigation("/sign-in")
          }else{
            setShowBookingVIew(!showBookingView)
            bookingView()
          }
          
          }}>Book this seat</Button>

          </div>

       </div>

       
       
        

  


    </div>

    </Card>

    {/* Background black */}
    {showBookingView ? 
    <div className="absolute w-screen h-screen bg-black/50 z-1"></div>
    : null  
  }

    {/* Confirm Booking Card */}

    {showBookingView? <Card className="bg-white w-110 h-80 z-2 m-auto absolute mt-50 ml-50">
       {/* Booking card */}

       <CardHeader>
        <CardTitle className="text-lg font-bold">Confirm Booking</CardTitle>
        <CardDescription>You are about to book a seat in room at location </CardDescription>
       </CardHeader>

       <CardContent>

        <form className="absolute flex flex-col gap-4 text-center border-black w-100 m-auto z-2">
          
          <div className="flex flex-row justify-between text-left">

              {/* label */}
            <div className="flex flex-col gap-4">
              {/* Seat Number */}
              <label htmlFor="seatNumber">Seat Number</label>

              {/* Start Month */}
              <label htmlFor="duration">Start month</label>

              {/* Duration */}
              <label htmlFor="duration">Duration</label>

              {/* Total */}
              <h1>Total</h1>
            </div>

              {/* input */}
            <div className="flex flex-col gap-4">
              {/* Seat Number*/}
              <select id="seatNumber" name="seatNumber" onChange={(e) => setSeatNumber(Number(e.target.value))}>
                            {room.booking.map((seat) => <option value={seat.seatIndex}>{seat.seatIndex}</option>)}
              </select>

              {/* Start Month */}
              <input type="month" name="" id="duration" value={startMonth} onChange={(e) => setStartMonth(e.target.value)} min={"2026-09"} />

              {/* Duration */}
              <select id="duration" name="duration" onChange={(e) => setDuration(Number(e.target.value))}>
                            <option value={3}>3 Months</option>
                            <option value={6}>6 Months</option>
              </select>

              {/* Total  */}
              <h1>{duration * Number(roomType.pricePerMonth)}</h1>

            </div>


          </div>
          
          <div className="flex flex-row gap-15">
            <Button type="button" className="w-40 h-11" onClick={() => book()}>Book Room</Button>
            <Button type="button" variant={"outline"} className="w-40 h-11 border-black" onClick={() => setShowBookingVIew(!showBookingView)}>Cancel</Button>
          </div>
                  
        </form>

       </CardContent>

      </Card>
            
     : null}


    </>
  )
}

export default RoomCard