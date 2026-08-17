import type { Property, PropertyDetail } from "@/types/property"
// import { API_URL } from "./config"
import { apiFetch } from "./client";



export async function fetchProperties(): Promise<Property[]> {
  return (await apiFetch<{ data: Property[] }>(`/properties`)).data
}
export async function fetchPropertyDetail(id: string): Promise<PropertyDetail> {
  return await apiFetch<PropertyDetail>(`/properties/${id}`)
}
