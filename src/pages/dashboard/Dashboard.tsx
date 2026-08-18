// import { useUser } from "@clerk/react"
// import { fetchMyBookings } from "@/api/bookings"
// import { useAuth } from "@/components/auth/AuthProvider"
// import { useQuery } from "@tanstack/react-query"
import UserDescription from "./Components/UserDescription"
import UserDetails from "./Components/UserDetails"
// import { useAuth } from "@/components/auth/AuthProvider"
// import UserDescription from "./Components/UserDescription"
// import UserDetails from "./Components/UserDetails"
// import { FileExclamationPoint } from "lucide-react"

export function Dashboard() {
  // const {isSignedIn} = useAuth()

  return (
    // <div className="min-h-screen bg-gray-50 px-6 pt-28">
    //   <div className="mx-auto max-w-3xl">
    //     <h1 className="text-3xl font-semibold text-gray-900">
    //       Welcome, {user?.displayName || "User"}!
    //     </h1>
    //     <MyBookings />
    //   </div>
    // </div>

    
    <>

    
    <div className="pt-20 text-center">
      <UserDescription />
      <UserDetails />
    </div>

    {/* <BackendAuthGate>
      <MyBookings />
    </BackendAuthGate> */}
    
    
    </>
  )
}

// function MyBookings(){
//     const { data: bookings, isLoading, isError} = useQuery({queryKey: ["my-bookings"], queryFn: fetchMyBookings})

//     if (isLoading){
//         return <p className="mt-6 text-gray-500">Loading your bookings...</p>
//     }

//     if (isError){
//         return <p className="mt-6 text-red-600">Could not load bookings</p>
//     }

//     if (!bookings?.length){
//         return <p className="mt-6 text-gray-500">No bookings yet.</p>
//     }

//     console.log(bookings[0])

//     return (
//         <div className="mt-6 flex flex-col gap-3">
          
//             {bookings.map((b) => (
//               <div key={b.id} className="rounded-xl border p-4" >
//                 <p className="font-semibold">
//                         {b.property.title} - {b.roomType.name}
//                     </p>

//                     <p className="text-sm text-gray-500">
//                         Seat {b.seatNumber} - {b.leaseStart} to {b.leaseEnd}
//                     </p>
//                     <p className="text-sm">
//                         {b.status} / {b.paymentStatus}
//                     </p>
//               </div>
//             ))}
//         </div>
//     )
// }