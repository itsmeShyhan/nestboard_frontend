import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createRoom, deleteRoom } from "@/api/admin-properties"
import type { RoomType } from "@/types/property"

type RoomTypeRowProps = {
  propertyId: string
  roomType: RoomType
  onDelete: () => void
}

export function RoomTypeRow({
  propertyId,
  roomType,
  onDelete,
}: RoomTypeRowProps) {
  const queryClient = useQueryClient()
  const [roomLabel, setRoomLabel] = useState("")

  const { mutate: addRoom, isPending } = useMutation({
    mutationFn: () =>
      createRoom(propertyId, roomType.id, {
        roomLabel,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["property", propertyId] })
      setRoomLabel("")
    },
  })

  const { mutate: removeRoom } = useMutation({
    mutationFn: (roomId: string) => deleteRoom(propertyId, roomType.id, roomId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["property", propertyId] }),
  })

  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          {roomType.name} - LKR {roomType.price}/mo
        </p>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          Remove room type
        </Button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {roomType.rooms?.map((room) => (
          <span
            key={room.id}
            className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs ring-1 ring-gray-200"
          >
            {room.label}
            <button
              onClick={() => removeRoom(room.id)}
              className="text-gray-400 hover:text-red-600"
            >
              x
            </button>
          </span>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addRoom()
        }}
        className="mt-2 flex gap-2"
      >
        <Input
          placeholder="Room label (e.g. R1)"
          value={roomLabel}
          onChange={(e) => setRoomLabel(e.target.value)}
          required
          className="w-40"
        />
        <Button type="submit" size="sm" disabled={isPending}>
          Add room
        </Button>
      </form>
    </div>
  )
}