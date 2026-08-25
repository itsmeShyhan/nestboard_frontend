import { Card } from '@/components/ui/card'
import { LogOut, Settings, User } from 'lucide-react'

const SettingsCard = () => {
  return (
    <Card className='w-[25dvw] shadow-xl'>
      <h1 className='font-bold text-lg text-left pl-5'>Account</h1>

      <div className='flex flex-col pl-4'>
        <button className=' flex flex-row p-5 text-sm  gap-3 cursor-pointer'>
          <Settings></Settings>
          <p className='relative font-bold'>Settings</p>
        </button>

        <button className='flex flex-row p-5 text-sm  gap-3 cursor-pointer'>
          <User></User>
          <p className='relative font-bold'>Edit Profile</p>
        </button>

        <button className='flex flex-row p-5 text-sm gap-3 cursor-pointer text-red-500'>
          <LogOut></LogOut>
          <p className='relative font-bold'>Logout</p>
        </button>
      </div>
  
    </Card>
  )
}

export default SettingsCard