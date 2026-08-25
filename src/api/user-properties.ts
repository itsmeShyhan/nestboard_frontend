import type { Property } from "@/types/property"
// import { API_URL } from "./config"
import { apiFetch } from "./client";



export async function toggleFavorite(propertyId: string): Promise<Property[]> {

  console.log("handling favorites...")
  return (await apiFetch(`/properties/${propertyId}/toggle-favorite`, {
    method: "PATCH",
    auth: true
  }))
}
export async function fetchFavorites(): Promise<Property[]> {
    console.log("getting favorites")
  return await apiFetch<Property[]>(`/properties/my-favourites`, {
    auth: true
  })
}
