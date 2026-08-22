import { createBooking } from "@/api/bookings"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { Room, RoomType } from "@/types/property"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useState } from "react"

const RoomCard = (room: Room) => {
  console.log(room.booking)

  const [available, setAvailable] = useState("")
  const queryClient = useQueryClient()
  console.log(available)
  console.log(setAvailable)

  const { mutate: book, isPending} = useMutation({
    
      mutationFn: () => {
    //   const room = room?.find((r) => r.isAvailable)
    //   if (!room){
    //     throw new Error("No available room")
    //   }

      console.log("done room check up")
      
      return createBooking({
        roomId: room.id,
        seatNumber: 2,
        startMonth: "2026-08",
        durationMonths: 3
      })
    },
    onSuccess: () => {
      console.log("Booked. Check My Bookings")

      queryClient.invalidateQueries({queryKey: ["my-bookings"]})
    },
    onError: () => {
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
            
        </div>

        <Button className="relative left-130">Book this seat</Button>


    <div className="flex flex-wrap gap-2">
        <Sheet key={"bottom"}>
            
          <SheetTrigger>
            <Button>Book this seat</Button> 
          </SheetTrigger>

          <SheetContent
            side={"bottom"}
            className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
          >
            <SheetHeader>
              <SheetTitle>Booking Seats</SheetTitle>
              {/* <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription> */}
            </SheetHeader>
            <div>
                <form>

                    {/* Seat Number */}
                    <label htmlFor="seatNumber">Seat Number</label>
                    <select id="seatNumber" name="seatNumber">
                        {room.booking.map((seat) => <option value={seat.seatIndex}>{seat.seatIndex}</option>)}
                    </select>

                    {/* lease start month */}
                    <input type="date" name="" id="" />

                    {/* Duration */}
                    <label htmlFor="duration">Duration</label>
                    <select id="duration" name="duration">
                        <option value={3}>3 Months</option>
                        <option value={6}>6 Months</option>
                    </select>
                    
                </form>
            </div>
            <SheetFooter>
              <Button type="submit">Book this room</Button>
              <SheetClose>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

    </div>
  


    </div>
        
       

        
       



        
    </Card>
    </>
  )
}

export default RoomCard