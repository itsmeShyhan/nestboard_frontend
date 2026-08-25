export type Property = {
  id: string
  title: string
  location: string
  type: "House" | "Villa" | "Apartment" | "Hotel"
  price: string
  rating: number
  image: string
  lat: number
  lng: number
}
export type RoomType = {
  id: string
  name: string
  price: string
  seatsCapacity: number
  seatsFree: number
  hasAC: boolean
  rooms: Room[]
  pricePerMonth: string
}

export type PropertyDetail = {
  id: string
  title: string
  amenities: string[]
  available_seats: number
  city: string
  cost: string
  description: string
  imageUrl: string
  rating: number
  minStay: string
  startingPrice: string
  roomTypes: RoomType[]

}


// export type Room = {
//   id: string
//   label: string
//   isAvailable: boolean
// }

export type Booking = {
  seatIndex: number
  tenant: string
  tenantBio: string

}

export type Room = {
  roomId: string
  roomName: string
  isAvailable: boolean
  booking: Booking[]
}