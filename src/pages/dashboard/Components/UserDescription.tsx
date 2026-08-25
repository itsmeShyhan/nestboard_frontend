
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { Calendar, Mail, MapPin, Phone, SquarePen } from 'lucide-react'

const UserDescription = () => {
  const {user} = useAuth()
  return (
    <>
    <Card className='m-5 shadow-lg'>
      
      <div className='flex flex-row justify-around'>

        <div className='flex gap-10'>

            {/* Photo */}
          <div >
            <img className='rounded-full size-30' src="https://i.pinimg.com/236x/26/6b/2b/266b2b623b3057f596297c3a35c1b292.jpg" alt="" />
          </div>

          {/* Profile Details */}
          <div className='flex flex-col gap-4' >
            <h1 className='text-3xl font-bold text-left'>{user?.displayName}</h1>

            <caption className='text-left font-light'>Digital nomad and software engineer looking for comfortable co-living spaces</caption>
            
            <div className='flex flex-row gap-8 font-light'>  
              <div className='flex flex row gap-2'> 
                <Mail strokeWidth={1}></Mail>
                <span className='relative top-0.5'>{user?.email}</span>
              </div>
              
              <div className='flex flex row gap-2'> 
                <Phone strokeWidth={1}></Phone>  
                <span className='relative top-0.5'> +94 77 123 4567</span>
              </div>

              <div className='flex flex row gap-2'> 
                <MapPin strokeWidth={1}></MapPin>
                <span className='relative top-0.5'>Colombo, Sri Lanka</span>
              </div>

              <div className='flex flex row gap-2'>
                <Calendar strokeWidth={1}></Calendar>
                <span className='relative top-0.5'>Member since January 2024</span>
              </div>

          </div>
        </div>

        </div>

        

        {/* Edit Button */}
        <div>
          <Button>
            <SquarePen /> 
            <p>Edit Profile</p>
          </Button>
        </div>

      </div>

      
    </Card>
    </>
  )
}

export default UserDescription