import type { BookingDTO } from "@/types/booking"
import { apiFetch } from "./client"


export async function fetchMyBookings(){
    return(
        await apiFetch<BookingDTO[]>("/bookings/my", {auth: true}

        )
    )
}

type CreateBookingInput = {
    roomId: string,
    seatNumber: number,
    startMonth: string,
    durationMonths: number
}

export async function createBooking(input: CreateBookingInput){
    return apiFetch<BookingDTO>("/bookings", {
        method: "POST",
        auth: true,
        body: JSON.stringify(input)  
    })
}