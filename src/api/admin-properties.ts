import type { Property, Room, RoomType } from "@/types/property"
import { apiFetch } from "./client"

type CreatePropertyInput = {
    title: string
    description: string
    address: string
    city: string
    type: "HOUSE" | "VILLA" | "APARTMENT" | "HOTEL"
    rating: number
    latitude: number
    longitude: number
    imageUrl: string
}


export async function fetchProperties(){
    return apiFetch<Property[]>("/properties/mine", {auth: true})
}

export async function createProperty(input: CreatePropertyInput){
    return apiFetch<Property>("/properties", {
        method: "POST",
        auth: true,
        body: JSON.stringify(input)
    })
}

export async function deleteProperty(id: string){
    return apiFetch<void>(`/properties/${id}`, {
        method: "POST",
        auth: true
    })
}

type CreateRoomTypeInput = {
    name: string
    pricePerMonth: number
    seatCapacity: number
    hasAc: boolean
}

export async function createRoomType(propertyId: string, input: CreateRoomTypeInput){
    return apiFetch<RoomType>(`/properties/${propertyId}/room-types`, {
        method: "POST",
        auth: true,
        body: JSON.stringify(input)
    })   
}

export async function deleteRoomType(propertyId: string, roomTypeId: string){
    return apiFetch<void>(`/properties/${propertyId}/room-types/${roomTypeId}`, {
        method: "DELETE",
        auth: true
    })
}

type CreateRoomInput = {
    roomLabel: string
}

export async function createRoom(propertyId: string, roomTypeId: string, input: CreateRoomInput){
    return apiFetch<Room>(`/properties/${propertyId}/room-types/${roomTypeId}/rooms`, {
        method: "POST",
        auth: true,
        body: JSON.stringify(input)
    })
}


export async function deleteRoom(propertyId: string, roomTypeId: string, roomId: string){
    return apiFetch<void>(`/properties/${propertyId}/room-types/${roomTypeId}/room/${roomId}`, {
        method: "DELETE",
        auth: true
    })
}

