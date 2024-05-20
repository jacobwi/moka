import { useSettings } from '@src/contexts/SettingsContext';
import { version, author, description } from '../../package.json';

import {
  IoCloudUploadOutline,
  IoCloudDownloadOutline,
  IoLogOutOutline,
} from 'react-icons/io5';
import { useAuth } from '@shared/hooks';
import { Position } from '@shared/models';
import {
  Button,
  CollapsiblePanel,
  InputField,
  Select,
  ToggleSwitch,
} from '@shared/ui';

const SettingsPage = () => {
  const {
    theme,
    setTheme,
    defaultPopupView,
    setDefaultPopupView,
    autoSave,
    setAutoSave,
    autoAddTag,
    setAutoAddTag,
    apiUrl,
    setApiUrl,
  } = useSettings();
  const { logout } = useAuth();
  const themeOptions = ['Light', 'Dark'];
  const defaultPopupViewOptions = ['Home', 'Bookmarks', 'Add Bookmark'];

  const handleLogout = () => {
    logout();
  };

  const handleImport = () => {
    // Implement the import bookmarks functionality here
    console.log('Importing bookmarks...');
    // e.g., open a file picker, parse the bookmarks file, add bookmarks to storage, etc.
  };

  const handleExport = () => {
    // Implement the export bookmarks functionality here
    console.log('Exporting bookmarks...');
    // e.g., fetch all bookmarks from storage, convert them to a file format, prompt user to download the file, etc.
  };

  return (
    <div className="p-4 w-full h-full bg-theme-card-bg grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 className="text-3xl font-bold text-theme-text col-span-full mb-6">
        Settings
      </h2>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <Select
          label="Theme"
          id="theme"
          options={themeOptions}
          value={theme}
          onChange={value => setTheme(value)}
        />
        <Select
          label="Default Popup View"
          id="defaultPopupView"
          options={defaultPopupViewOptions}
          value={defaultPopupView}
          onChange={value => setDefaultPopupView(value)}
        />
        <ToggleSwitch
          label="Auto Save"
          id="autoSave"
          isChecked={autoSave}
          onChange={setAutoSave}
        />
        <InputField
          label="Auto Add Tag"
          id="autoAddTag"
          type="text"
          placeholder="Enter default tag"
          value={autoAddTag}
          onChange={e => setAutoAddTag(e.target.value)}
        />
        <InputField
          label="API URL"
          id="apiUrl"
          type="url"
          placeholder="Enter API endpoint"
          value={apiUrl}
          onChange={e => setApiUrl(e.target.value)}
        />
      </div>

      <div className="col-span-full flex flex-col space-y-4">
        <Button
          onClick={handleImport}
          label="Import Bookmarks"
          icon={<IoCloudDownloadOutline />}
          iconPosition={Position.LEFT}
          colorTheme="theme-accent"
          textColorTheme="text-white"
        />
        <Button
          onClick={handleExport}
          label="Export Bookmarks"
          icon={<IoCloudUploadOutline />}
          iconPosition={Position.LEFT}
          colorTheme="theme-accent"
          textColorTheme="text-white"
        />
        <Button
          onClick={handleLogout}
          label="Log Out"
          icon={<IoLogOutOutline />}
          iconPosition={Position.LEFT}
          colorTheme="red-500"
          textColorTheme="text-white"
        />
      </div>

      <CollapsiblePanel title="About">
        <p className="mb-2">Version: {version}</p>
        <p className="mb-2">Developed by: {author.name}</p>
        <p className="mb-2">{description}</p>
        <p>
          Contact:
          <a
            href={`mailto:${author.email}`}
            className="text-theme-accent hover:underline ml-1"
          >
            {author.email}
          </a>
        </p>
      </CollapsiblePanel>
    </div>
  );
};

export default SettingsPage;
