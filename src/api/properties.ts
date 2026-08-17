import type { Property, PropertyDetail } from "@/types/property"
import { API_URL } from "./config"



export async function fetchProperties(): Promise<Property[]> {
  const res = await fetch(`${API_URL}/properties`)
  if (!res.ok) throw new Error("Failed to fetch properties")
  const body = await res.json();
  return Array.isArray(body) ? body : body.data
  // return res.json()
}
export async function fetchPropertyDetail(id: string): Promise<PropertyDetail> {
  const res = await fetch(`${API_URL}/properties/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch property: ${id}`)
  return res.json()
}
