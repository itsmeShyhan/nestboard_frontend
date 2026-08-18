export type BookingDTO = {
    id: string
    status: "PENDING" | "CONFIRMED" | "CANCELLED" | "EXPIRED"
    paymentStatus: "PENDING" | "PAID" | "FAILED"
    seatNumber: number
    leaseStart: string
    leaseEnd: string
    durationMonths: number
    totalAmount: string
    property: {id: string; title: string; city: string}
    roomType: {id: string; name: string; price:string}
    room: {id: string; roomLabel: string}
}