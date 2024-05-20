import { useState, useEffect, useCallback } from 'react'
import {
  MdPerson,
  MdEmail,
  MdLock,
  MdEdit,
  MdPermIdentity,
} from 'react-icons/md'

import { PiIdentificationBadge } from 'react-icons/pi'

import DefaultAvatar from '../../assets/user-avatar.png'
import { useAuth } from 'shared/hooks'
import { useUser } from 'shared/contexts/UserContext'
import { Button, Tab, TabPanel, Avatar, InputField } from 'shared/ui'
const TABS = {
  ACCOUNT: 'account',
  SECURITY: 'security',
  ACTIVITY: 'activity',
  DEVICE: 'device',
}

const UserSettingsPage = () => {
  const { user } = useAuth()
  const { profile } = useUser()
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    firstname: profile?.firstName || '',
    lastname: profile?.lastName || '',
  })
  const [editMode, setEditMode] = useState(false)
  const [selectedTab, setSelectedTab] = useState(TABS.ACCOUNT)
  const [showAll, setShowAll] = useState(false)
  // const [avatarFile, setAvatarFile] = useState(null)
  useEffect(() => {
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      firstname: profile?.firstName || '',
      lastname: profile?.lastName || '',
      currentPassword: '',
      newPassword: '',
    })
  }, [user, profile])

  const handleInputChange = useCallback(
    (event: { target: { id: any; value: any } }) => {
      const { id, value } = event.target
      setFormData({ ...formData, [id]: value })
    },
    [formData],
  )

  const toggleEditMode = useCallback(() => {
    setEditMode((prevEditMode) => !prevEditMode)
  }, [])

  const handleShowAllClick = useCallback(() => {
    setShowAll((prevShowAll) => !prevShowAll)
  }, [])

  return (
    <div className="bg-theme-card-bg rounded-md shadow p-8 my-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-theme-text text-3xl font-bold">User Settings</h1>
        <div className="flex space-x-4">
          <Button
            onClick={toggleEditMode}
            icon={editMode ? <MdEdit /> : <MdEdit />}
            label={editMode ? 'Save' : 'Edit'}
          />
          <Button
            onClick={handleShowAllClick}
            label={showAll ? 'Hide' : 'Show All'}
          />
        </div>
      </div>

      <div className="border-b border-theme-border mb-6 flex">
        <Tab
          isSelected={selectedTab === TABS.ACCOUNT || showAll}
          onClick={() => setSelectedTab(TABS.ACCOUNT)}
        >
          Account
        </Tab>
        <Tab
          isSelected={selectedTab === TABS.SECURITY || showAll}
          onClick={() => setSelectedTab(TABS.SECURITY)}
        >
          Security
        </Tab>
        <Tab
          isSelected={selectedTab === TABS.ACTIVITY || showAll}
          onClick={() => setSelectedTab(TABS.ACTIVITY)}
        >
          Activity
        </Tab>
        <Tab
          isSelected={selectedTab === TABS.DEVICE || showAll}
          onClick={() => setSelectedTab(TABS.DEVICE)}
        >
          Device
        </Tab>
      </div>

      <TabPanel isSelected={selectedTab === TABS.ACCOUNT || showAll}>
        <div className="flex items-center mb-4">
          <Avatar
            src={profile?.avatar || DefaultAvatar}
            base64={profile?.avatar ? true : false}
            alt="User Avatar"
            className="w-24 h-24 mr-4"
            editable={editMode}
          />
        </div>
        <InputField
          icon={<MdPerson />}
          type="text"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          editable={editMode}
        />
        <InputField
          icon={<MdEmail />}
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          editable={editMode}
        />
        <InputField
          icon={<PiIdentificationBadge />}
          type="text"
          id="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleInputChange}
          editable={editMode}
        />
        <InputField
          icon={<MdPermIdentity />}
          type="text"
          id="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleInputChange}
          editable={editMode}
        />
      </TabPanel>

      <TabPanel isSelected={selectedTab === TABS.SECURITY || showAll}>
        {editMode && (
          <>
            <InputField
              icon={<MdLock />}
              type="password"
              id="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleInputChange}
            />
            <InputField
              icon={<MdLock />}
              type="password"
              id="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
          </>
        )}
        {!editMode && (
          <p className="text-theme-text">
            Enable edit mode to change your password.
          </p>
        )}
      </TabPanel>

      <TabPanel isSelected={selectedTab === TABS.ACTIVITY || showAll}>
        <p className="text-theme-text">
          Configure your activity-related settings here.
        </p>
        {/* Activity settings form components */}
      </TabPanel>

      <TabPanel isSelected={selectedTab === TABS.DEVICE || showAll}>
        <p className="text-theme-text">Manage your device settings here.</p>
        {/* Device settings form components */}
      </TabPanel>
    </div>
  )
}

export default UserSettingsPage
