import { createBooking } from "@/api/bookings"
import { useAuth } from "@/components/auth/AuthProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { useLeaseStore } from "@/stores/leaseStore"

import type { Room, RoomType } from "@/types/property"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"

type RoomCardProps = {
  roomType: RoomType
  room: Room
  duration: string
  startMonth: string 
}

const RoomCard = ({room, roomType, duration, startMonth}: RoomCardProps ) => {

  const { isSignedIn } = useAuth()

  const navigation = useNavigate()

  // const [available, setAvailable] = useState("")
  const [showBookingView, setShowBookingVIew] = useState(false)

  // Details required for booking
  // const [duration, setDuration] = useState(3)
  // const [startMonth, setStartMonth] = useState("")
  // const [seatNumber, setSeatNumber] = useState(1)
  const [seatNumber, setSeatNumber] = useState(1)



  // const setStart = useLeaseStore((state) => state.setStartMonth)
  // const setDurationMonth = useLeaseStore((state) => state.setDurationMonths)


  
  
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
        durationMonths: Number(duration)
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
                {room.booking.map((seat, seatNumber) => {
                  console.log(seat.tenant === "")
                  if (seat.tenant === ""){
                    return(
                         <button className="rounded-full p-3 border-2 border-black cursor-pointer" onClick={() => {
                         setSeatNumber(seatNumber)
                         }}> <Plus /></button>
                    )
                  }else {
                    return(
                         <p className="rounded-full p-3 border-2 bg-orange-100 p-6"></p>
                    )
                  }
                })}
               
            </div>

            {/* how many available */}
            <p>{room.booking.filter((r) => r.tenant === "" ).length} available</p>

           
            
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

    {showBookingView? <Card className="bg-white w-110 h-80 z-2 m-auto absolute mt-50 ml-100 p-2">
       {/* Booking card */}

       <CardHeader>
        <CardTitle className="text-lg font-bold">Confirm Booking</CardTitle>
        <CardDescription>You are about to book a seat in {room.roomName} </CardDescription>
       </CardHeader>

       <CardContent>

        <form className="absolute flex flex-col gap-4 text-center border-black w-100 m-auto z-2">
          
          <div className="flex flex-row justify-between text-left">

              {/* label */}
            <div className="flex flex-col gap-4">
              {/* Seat Number */}
              <h1>Room</h1>

              {/* Seat Number */}
              <h1>Room Type</h1>

              {/* Seat Number */}
              <h1>Price</h1>

              {/* Seat Number */}
              <h1>Duration</h1>

              {/* Seat Number */}
              <h1>Start Month</h1>
            </div>

              {/* input */}
            <div className="flex flex-col gap-4">
              {/* Seat Number*/}
              {/* <select id="seatNumber" name="seatNumber" onChange={(e) => setSeatNumber(Number(e.target.value))}>
                            {room.booking.map((seat) => <option value={seat.seatIndex}>{seat.seatIndex}</option>)}
              </select> */}

               {/* Seat Number */}
              <h1>{room.roomName}</h1>

              {/* Seat Number */}
              <h1>{roomType.name}</h1>

              {/* Seat Number */}
              <h1>{roomType.pricePerMonth}/month</h1>

              {/* Seat Number */}
              <h1>{duration}</h1>

              {/* Seat Number */}
              <h1>{startMonth}</h1>

            </div>


          </div>
          
          <div className="flex flex-row gap-15">
            <Button type="button" className="w-40 h-11" onClick={() => book}>Book Room</Button>
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