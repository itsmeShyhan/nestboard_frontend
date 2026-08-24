// import HelpCard from './HelpCard'
// import SettingsCard from './SettingsCard'
import SettingsCard from './SettingsCard'
import StatsCard from './StatsCard'

const UserPreferences = () => {
 
  return (
   <>
   {/* <StatsCard />
   <SettingsCard />
   <HelpCard /> */}

   <div className='flex flex-col gap-6'>
    <StatsCard />
    <SettingsCard />
   </div>
   
   </>
  )
}

export default UserPreferences