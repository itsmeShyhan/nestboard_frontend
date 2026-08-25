import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { RoomType } from "@/types/property"
import { useNavigate, useParams } from "react-router"

export function RoomTypeCard({
  id,
  name,
  price,
  seatsCapacity,
  seatsFree,
  hasAC,
  pricePerMonth,
}: RoomType) {

  console.log(pricePerMonth)
  // const queryClient = useQueryClient()
  // const [message, setMessage] = useState<string | null>(null)
  const navigate = useNavigate()


  const { id: propertyId } = useParams<{ id: string }>()
  
  const viewRoomHandler = () => {
    navigate(`/property-details/${propertyId}/room-types/${id}`)
  }



  const fillPercentage = Math.round(
    ((seatsCapacity - seatsFree) / seatsCapacity) * 100
  )

  return (
    <Card className="gap-0 rounded-2xl p-4 ring-1 ring-foreground/10 transition-all">
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-900">{name}</span>
        <Badge
          variant="outline"
          className="rounded-lg px-2.5 py-0.5 text-xs text-gray-500"
        >
          {hasAC ? "AC" : "Non-AC"}
        </Badge>
      </div>

      <p className="mt-0.5 text-sm text-gray-400">LKR {price} / seat / month</p>

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="font-medium text-primary">{seatsFree} seats free</span>
        <span className="text-gray-400">{fillPercentage}% filled</span>
      </div>

      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${fillPercentage}%` }}
        />
      </div>

      <Button className="mt-4 w-full rounded-xl font-semibold cursor-pointer" 
      size="lg"
      onClick={
        // () => book()
        () => viewRoomHandler()
      }
      >
        View this room
        <ArrowRight className="size-4" />
      </Button>
    </Card>
  )
}
