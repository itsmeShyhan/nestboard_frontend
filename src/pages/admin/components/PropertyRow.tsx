// import { createProperty, createRoomType, deleteProperty, fetchProperties } from "@/api/admin-properties"
// import { fetchPropertyDetail } from "@/api/properties"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import type { Property } from "@/types/property"
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import { useState } from "react"

// type PropertyRowProps = {
//     property: Property,
//     onDelete: () => void
// }

// const PropertyRow = ({property, onDelete}: PropertyRowProps) => {

//     const queryClient = useQueryClient()
//     const {data: properties, isLoading} = useQuery({
//         queryKey: ["property", property.id],
//         queryFn: () => fetchPropertyDetail(property.id)
//     })

//     const [name, setName] = useState("")
//     const [price, setPrice] = useState(0)
//     const [capacity, setCapacity] = useState(1)
//     const [hasAC, setHasAC] = useState(false)

//     // const [form, setForm] = useState({
//     //     title: "",
//     //     description: "",
//     //     address: "",
//     //     city: "",
//     //     type: "APARTMENT" as (typeof PROPERTY_TYPES)[number],
//     //     rating: 4.5,
//     //     latitude: 6.9271,
//     //     longitude: 79.8612,
//     //     imageUrl: ""
//     // })

//     const {mutate: addRoomType, isPending} = useMutation({
//         mutationFn: () => createRoomType(property.id, {
//             name,
//             pricePerMonth: price,
//             seatCapacity: capacity,
//             hasAc: hasAC

//         }),
//         onSuccess: () => {
//             queryClient.invalidateQueries({queryKey: ["property", property.id]})      
//             setRoom  
//         }
//     })


//     const {mutate: removeProperty} = useMutation({
//         mutationFn: (id: string) => deleteProperty(id),
//         onSuccess: () => queryClient.invalidateQueries({queryKey: ["my-properties"]}) 
//     })

//     if (isLoading) return <p className="mt-10 text-gray-500">Loading your properties</p>
//   return (
//     <div className="mt-10">
//         <h2 className="text-xl font-bold text-gray-900">My Properties</h2>
        
//         <form 
//         onSubmit={(e) => {e.preventDefault(); addProperty()}}
//         className="mt-4 grid gap-2 rounded-2xl border p-4 sm:grid-cols-2"
//         >
//             <Input placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}></Input>
//             <Input placeholder="City" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})}></Input>
//             <Input placeholder="Address" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})}></Input>
//             <Input placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}></Input>
//             <Input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({...form, imageUrl: e.target.value})}></Input>
//             <select
//             className="h-9 rounded-md border px-2.5 text-sm"
//             value={form.type}
//             onChange={(e) => setForm({...form, type: e.target.value as typeof form.type})}
//             >
//                 {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
//             </select>

//             <Button type="submit" disabled={creating} className="sm:col-span-2">
//                 {creating ? "Adding" : "Add Property"}
//             </Button>
//         </form>

//         <div className="mt-6 flex flex-col gap-4">
//             {properties?.map((property) => (
//                 <PropertyRow key={property.id} property={property} onDelete={() => removeProperty(property.id)}></PropertyRow>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default PropertyRow


import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchPropertyDetail } from "@/api/properties"
import { createRoomType, deleteRoomType } from "@/api/admin-properties"
import { RoomTypeRow } from "./RoomTypeRow"
import type { Property } from "@/types/property"

type PropertyRowProps = {
  property: Property
  onDelete: () => void
}

export function PropertyRow({ property, onDelete }: PropertyRowProps) {
  const queryClient = useQueryClient()
  const { data: detail } = useQuery({
    queryKey: ["property", property.id],
    queryFn: () => fetchPropertyDetail(property.id),
  })

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [capacity, setCapacity] = useState(1)
  const [hasAC, setHasAC] = useState(false)

  const { mutate: addRoomType, isPending } = useMutation({
    mutationFn: () =>
      createRoomType(property.id, {
        name,
        pricePerMonth: price,
        seatCapacity: capacity,
        hasAc: hasAC,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["property", property.id] })
      setName("")
    },
  })

  const { mutate: removeRoomType } = useMutation({
    mutationFn: (roomTypeId: string) => deleteRoomType(property.id, roomTypeId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["property", property.id] }),
  })

  return (
    <div className="rounded-2xl border p-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-900">{property.title}</p>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {detail?.roomTypes.map((rt) => (
          <RoomTypeRow
            key={rt.id}
            propertyId={property.id}
            roomType={rt}
            onDelete={() => removeRoomType(rt.id)}
          />
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          addRoomType()
        }}
        className="mt-3 flex flex-wrap items-center gap-2"
      >
        <Input
          placeholder="Room type name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-40"
        />
        <Input
          type="number"
          placeholder="Price/month"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          className="w-32"
        />
        <Input
          type="number"
          placeholder="Seats/room"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          required
          className="w-28"
        />
        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={hasAC}
            onChange={(e) => setHasAC(e.target.checked)}
          />{" "}
          AC
        </label>
        <Button type="submit" size="sm" disabled={isPending}>
          Add room type
        </Button>
      </form>
    </div>
  )
}