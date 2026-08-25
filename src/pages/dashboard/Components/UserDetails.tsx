import UserPortfolio from './UserPortfolio'
import UserPreferences from './UserPreferences'

const UserDetails = () => {
  return (
    <>
    <div className='flex flex-row gap-5'>
      <UserPortfolio />
      <UserPreferences />
    </div>
    </>
  )
}

export default UserDetails