import { Card } from "@/components/ui/card"
import { RoomTypeCard } from "./RoomTypeCard"
import type { RoomType } from "@/types/property"

type RoomTypeListProps = {
  rooms: RoomType[]
}

export function RoomTypeList({ rooms }: RoomTypeListProps) {
  console.log(rooms)
  return (
    <Card className="gap-0 rounded-3xl p-6 shadow-sm ring-0">
      <h2 className="mb-5 text-xl font-bold text-gray-900">
        Available Room Types
      </h2>
      <div className="flex flex-col gap-4">
        {rooms.map((room) => (
          <RoomTypeCard key={room.id} {...room} />
        ))}
      </div>
    </Card>
  )
}
