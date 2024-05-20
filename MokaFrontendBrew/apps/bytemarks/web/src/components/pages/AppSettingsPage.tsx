import React, { useState } from 'react'
import { MdLanguage, MdPalette, MdNotifications } from 'react-icons/md'

import { VscLayout } from 'react-icons/vsc'
import { useUserSettings } from 'shared/contexts/UserSettingsContext'
import { Select, Checkbox } from 'shared/ui'

const iconContainerStyles = {
  width: '24px', // Adjust the width as per your icon size
  marginRight: '8px', // Adjust the margin to ensure alignment
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const Section = ({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) => (
  <section className="mb-4">
    <h2 className="flex items-center text-xl font-semibold mb-3 text-theme-text">
      <span className="icon-container" style={iconContainerStyles}>
        {icon}
      </span>
      <span className="ml-2">{title}</span>
    </h2>
    {children}
  </section>
)

const LayoutSwitcher = () => {
  const { setLayout, settings } = useUserSettings()
  const layouts = ['main', 'sidebar']

  return (
    <Section title="Layout" icon={<VscLayout />}>
      <Select options={layouts} value={settings.layout} onChange={setLayout} />
    </Section>
  )
}

const ThemeSwitcher = () => {
  const { setColorScheme, settings } = useUserSettings()
  const themes = [
    'light',
    'dark',
    'nature',
    'soft-serenity',
    'midnight-dream',
    'sunset-glow',
    'ocean-breeze',
    'urban-chic',
    'minimalist-rose',
    'cool-mint',
    'cosmic-night',
    'dark-nebula',
    'twilight-shade',
    'cyberpunk',
    'space-odyssey',
    'neon-night',
  ]

  return (
    <Section title="Theme" icon={<MdPalette />}>
      <Select
        value={settings.colorScheme}
        onChange={setColorScheme}
        options={themes}
      />
    </Section>
  )
}

const AppSettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('English')
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  const handleDarkModeChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) }
  }) => {
    setDarkMode(event.target.checked)
  }

  const handleLanguageChange = (
    selectedLanguage: React.SetStateAction<string>,
  ) => {
    setLanguage(selectedLanguage)
  }

  const handleNotificationsChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) }
  }) => {
    setNotificationsEnabled(event.target.checked)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-theme-card-bg rounded-lg shadow-lg my-8">
      <h1 className="text-3xl font-bold mb-8 text-theme-text">App Settings</h1>

      <div className="space-y-8">
        <Section title="Theme" icon={<MdPalette />}>
          <Checkbox
            label="Enable dark mode"
            checked={darkMode}
            onChange={handleDarkModeChange}
          />
        </Section>

        <Section title="Language" icon={<MdLanguage />}>
          <Select
            value={language}
            onChange={handleLanguageChange}
            options={['English', 'Spanish', 'French']}
          />
        </Section>

        <Section title="Notifications" icon={<MdNotifications />}>
          <Checkbox
            label="Enable system notifications"
            checked={notificationsEnabled}
            onChange={handleNotificationsChange}
          />
        </Section>
        <ThemeSwitcher />
        <LayoutSwitcher />
      </div>
    </div>
  )
}

export default AppSettingsPage
