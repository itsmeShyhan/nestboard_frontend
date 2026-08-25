import { Button } from "@/components/ui/button"
// import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { Room } from "@/types/property"

const BookRoom = (room: Room) => {
  return (
    <div className="absolute bg-blue-100 left-150 top-60 p-20">
       
            <div>
                <form className="flex flex-col gap-4 text-center">

                    {/* Seat Number */}
                    <div className="flex flex-row gap-5 justify-center">
                     
                      <label htmlFor="seatNumber">Seat Number</label>
                      <select id="seatNumber" name="seatNumber">
                          {room.booking.map((seat) => <option value={seat.seatIndex}>{seat.seatIndex}</option>)}
                      </select>

                    </div>
                    
                    {/* lease start month */}
                    <div>
                      <input type="date" name="" id="" />
                    </div>

                    {/* Duration */}

                    <div>
                        <label htmlFor="duration">Duration</label>
                        <select id="duration" name="duration">
                            <option value={3}>3 Months</option>
                            <option value={6}>6 Months</option>
                        </select>
                    </div>


                    <Button>Book Room</Button>
                  
                </form>
            </div>
   
    </div>
  )
}

export default BookRoom