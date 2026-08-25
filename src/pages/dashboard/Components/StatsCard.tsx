import { Card } from '@/components/ui/card'

const StatsCard = () => {
  return (
    <Card className='w-[25dvw] shadow-xl'>
      <h1 className='font-bold text-lg text-left pl-5'>Quick Stats</h1>

      <div className='flex flex-col'>
        <div className='flex flex-row justify-between p-5 text-sm'>
          <h3 className='font-light'>Total Bookings</h3>
          <p className='font-bold'>1</p>
        </div>

        <div className='flex flex-row justify-between p-5 text-sm'>
          <h3 className='font-light'>Favorites</h3>
          <p className='font-bold'>2</p>
        </div>

        <div className='flex flex-row justify-between p-5 text-sm'>
          <h3 className='font-light'>Days Stayed</h3>
          <p className='font-bold'>90</p>
        </div>
      </div>
  
    </Card>
  )
}

export default StatsCard