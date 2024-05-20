import { InputField } from '@shared/ui';
import { useEffect, useState } from 'react';
import { useBookmarks } from '@shared/hooks';

const AddBookmarkPage = () => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [pageImage, setPageImage] = useState(null); // State for storing the screenshot
  const { addBookmark } = useBookmarks();
  useEffect(() => {
    // Get the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const currentTab = tabs[0];
      if (!currentTab) {
        console.error('No active tab found.');
        return;
      }
      setUrl(currentTab.url ?? '');
      setName(currentTab.title ?? '');

      // Request a screenshot from the background script for the current tab
      chrome.runtime.sendMessage(
        { action: 'captureTab', tabId: currentTab.id },
        response => {
          if (response.error) {
            console.error('Error capturing tab:', response.error);
          } else {
            setPageImage(response.screenshotUrl);
          }
        }
      );
    });
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (pageImage) {
      // Convert Base64 string to a Blob
      const imageBlob = await fetch(pageImage).then(res => res.blob());

      // Create FormData object
      const formData = new FormData();
      formData.append('title', name);
      formData.append('url', url);
      formData.append('description', ''); // Assuming you might want to add a description field

      // Append the Blob image under the key 'image',
      // you can also include a filename if necessary
      formData.append('image', imageBlob, 'screenshot.png');
    }

    // Use the FormData object with your addBookmark function
    // This might require modifying your addBookmark function
    // to handle FormData or using a different function/API endpoint that accepts FormData
    addBookmark(formData);
  };

  return (
    <div className="p-4 w-screen h-screen bg-theme-card-bg rounded-lg shadow-theme-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Preview */}
        {pageImage && (
          <div className="flex justify-center">
            <img
              src={pageImage}
              alt="Page Screenshot"
              className="rounded-lg mb-4 max-w-full h-auto"
            />
          </div>
        )}

        <InputField
          label="Name"
          id="name"
          type="text"
          placeholder="Enter bookmark name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <InputField
          label="URL"
          id="url"
          type="url"
          placeholder="URL will be auto-populated"
          value={url}
          onChange={e => setUrl(e.target.value)}
          editable={false}
        />

        <button
          type="submit"
          className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-theme-button-text bg-theme-accent rounded-theme-button hover:bg-theme-accent-hover transition duration-150 ease-in-out"
        >
          Add Bookmark
        </button>
      </form>
    </div>
  );
};
export default AddBookmarkPage;
