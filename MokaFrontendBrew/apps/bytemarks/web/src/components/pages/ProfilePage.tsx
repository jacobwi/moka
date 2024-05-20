import { useState, useEffect, useCallback } from 'react'
import {
  MdPerson,
  MdEmail,
  MdSmartphone,
  MdComputer,
  MdErrorOutline,
} from 'react-icons/md'
import { Loading, Avatar } from 'shared/ui'

import { useAuth } from 'shared/hooks'
import { useUser } from 'shared/contexts/UserContext'
import { userService } from 'shared/services'
import DefaultAvatar from '../../assets/user-avatar.png'
const ProfilePage = () => {
  const { profile, setProfile } = useUser()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchUserData = useCallback(async () => {
    if (user?.id) {
      setIsLoading(true)
      setError('')
      try {
        const response = await userService.getUserProfile(user.id)
        if (response?.success && response?.data) {
          setProfile(response.data)
        } else {
          setError('Failed to load profile data')
        }
      } catch (err) {
        setError(`Failed to fetch user data: ${err.message}`)
      } finally {
        setIsLoading(false)
      }
    }
  }, [user, setProfile])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  if (isLoading) return <Loading />
  if (error)
    return <div className="text-theme-error text-center p-4">{error}</div>

  return (
    <div className="max-w-4xl mx-auto p-8 bg-theme-card-bg rounded-theme-card shadow-theme-card my-8">
      <h1 className="text-theme-xl font-bold mb-8 text-theme-text">Profile</h1>
      {profile ? (
        <>
          <div className="flex flex-col md:flex-row items-center">
            <Avatar
              src={profile.avatar || DefaultAvatar}
              base64={profile.avatar ? true : false}
              alt="User Avatar"
              className="mb-4 md:mb-0 md:mr-8 w-24 h-24 rounded-full"
            />
            <div className="flex-1">
              <ProfileField
                icon={<MdPerson />}
                label="First Name"
                value={profile.firstName}
              />
              <ProfileField
                icon={<MdPerson />}
                label="Last Name"
                value={profile.lastName}
              />
              <ProfileField
                icon={<MdEmail />}
                label="Email"
                value={user.email}
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-theme-lg font-semibold mb-4">Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ActivityCard
                icon={<MdSmartphone />}
                title="Device Activity"
                data={profile.deviceActivity}
              />
              <ActivityCard
                icon={<MdComputer />}
                title="App Activity"
                data={profile.appActivity}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-4">
          <MdErrorOutline className="text-4xl text-theme-accent" />
          <p className="mt-2 text-theme-text">Profile data not available.</p>
        </div>
      )}
    </div>
  )
}

const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-center my-2">
    <div className="text-theme-accent mr-4">{icon}</div>
    <div>
      <h3 className="font-semibold text-theme-base">{label}</h3>
      <p className="text-theme-input-text">{value || 'N/A'}</p>
    </div>
  </div>
)

const ActivityCard = ({ icon, title, data }) => (
  <div className="p-4 bg-theme-card-bg rounded-theme-card shadow-theme-card">
    <h3 className="flex items-center text-theme-base font-semibold mb-2">
      {icon} <span className="ml-2">{title}</span>
    </h3>
    <ul>
      {data?.length > 0 ? (
        data.map((activity, index) => (
          <li key={index} className="text-theme-input-text my-1">
            {activity}
          </li>
        ))
      ) : (
        <p className="text-theme-input-text">No activity data available.</p>
      )}
    </ul>
  </div>
)

export default ProfilePage
