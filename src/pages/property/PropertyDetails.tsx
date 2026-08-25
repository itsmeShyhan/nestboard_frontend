import { useParams } from "react-router"
import { PropertySection } from "./components/PropertySection"
import { PropertyInfo } from "./components/PropertyInfo"
import { RoomTypeList } from "./components/RoomTypeList"
import { usePropertyDetail } from "@/hooks/usePropertyDetail"

export function PropertyDetails() {
  const { id } = useParams<{ id: string }>()
  // const property = propertyDetails.find((p) => p.id === id)
  const { data: property, isLoading, isError } = usePropertyDetail(id)

  console.log(property)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400">Loading property...</p>
      </div>
    )
  }

  if (isError || !property) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <p className="text-xl font-semibold text-gray-700">
          Property not found
        </p>
        <p className="text-sm text-gray-400">No property matches id: {id}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PropertySection image={property.imageUrl} rating={property.rating} />

      <div className="px-4 pb-12">
        <div className="relative z-10 -mt-12">
          <PropertyInfo
            title={property.title}
            address={property.city}
            amenities={property.amenities}
            seatsAvailable={property.available_seats}
            minStay={property.minStay}
            startingPrice={property.cost}
          />
        </div>

        <div className="mt-5">
          <RoomTypeList rooms={property.roomTypes} />
        </div>
      </div>
    </div>
  )
}
