import { createProperty, deleteProperty, fetchProperties } from "@/api/admin-properties"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import {PropertyRow} from "./PropertyRow"

const PROPERTY_TYPES = ["HOUSE", "VILLA", "APARTMENT", "HOTEL"] as const

const AdminPropertyManager = () => {

    const queryClient = useQueryClient()
    const {data: properties, isLoading} = useQuery({
        queryKey: ["my-properties"],
        queryFn: fetchProperties
    })

    

    const [form, setForm] = useState({
        title: "",
        description: "",
        address: "",
        city: "",
        type: "APARTMENT" as (typeof PROPERTY_TYPES)[number],
        rating: 4.5,
        latitude: 6.9271,
        longitude: 79.8612,
        imageUrl: ""
    })

    const {mutate: addProperty, isPending: creating} = useMutation({
        mutationFn: () => createProperty(form),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["my-properties"]})
            setForm((f) => ({...f, title: "", description: "", address: "", city: "", imageUrl: ""}))
        }
    })


    const {mutate: removeProperty} = useMutation({
        mutationFn: (id: string) => deleteProperty(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["my-properties"]}) 
    })

    if (isLoading) return <p className="mt-10 text-gray-500">Loading your properties</p>
  return (
    <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">My Properties</h2>
        
        <form 
        onSubmit={(e) => {e.preventDefault(); addProperty()}}
        className="mt-4 grid gap-2 rounded-2xl border p-4 sm:grid-cols-2"
        >
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}></Input>
            <Input placeholder="City" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})}></Input>
            <Input placeholder="Address" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})}></Input>
            <Input placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}></Input>
            <Input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({...form, imageUrl: e.target.value})}></Input>
            <select
            className="h-9 rounded-md border px-2.5 text-sm"
            value={form.type}
            onChange={(e) => setForm({...form, type: e.target.value as typeof form.type})}
            >
                {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <Button type="submit" disabled={creating} className="sm:col-span-2">
                {creating ? "Adding" : "Add Property"}
            </Button>
        </form>

        <div className="mt-6 flex flex-col gap-4">
            {properties?.map((property) => (
                <PropertyRow key={property.id} property={property} onDelete={() => removeProperty(property.id)}></PropertyRow>
            ))}
        </div>
    </div>
  )
}

export default AdminPropertyManager