export type BookingDTO = {
    id: string
    bookingStatus: "PENDING" | "CONFIRMED" | "CANCELLED" | "EXPIRED"
    paymentStatus: "PENDING" | "PAID" | "FAILED"
    seatNumber: number
    leaseStart: string
    leaseEnd: string
    durationMonths: number
    totalAmount: string
    
    
    room: {id: string; roomLabel: string
        roomType: {id: string; name: string; price:string
            property: {id: string; title: string; city: string}
        }
    }
}


export type MyBookingProps = {
  bookings: BookingDTO[]
}
