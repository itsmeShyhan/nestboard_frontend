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