// Utility function to check if a URL is bookmarked
function isUrlBookmarked(url: string | undefined) {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.search({ url }, results => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(results.length > 0);
      }
    });
  });
}

// Update the context menu item based on bookmark status
async function updateContextMenu(url: string | undefined) {
  // Initially disable the context menu item while checking
  await chrome.contextMenus.update('bookmark-link', {
    enabled: false,
    title: 'Checking bookmark status...',
  });

  try {
    const bookmarked = await isUrlBookmarked(url);
    const title = bookmarked
      ? 'URL is already bookmarked'
      : 'Bookmark this URL';

    // Enable the context menu item with the updated title
    await chrome.contextMenus.update('bookmark-link', {
      title,
      enabled: !bookmarked,
    });
  } catch (error) {
    console.error('Error updating context menu:', error);
    // If an error occurs, update the context menu item to a default state
    await chrome.contextMenus.update('bookmark-link', {
      title: 'Bookmark this URL (error)',
      enabled: true,
    });
  }
}

// Capture the tab's screenshot
async function captureTab(tabId: number) {
  try {
    const tab = await chrome.tabs.get(tabId);
    const screenshotUrl = await chrome.tabs.captureVisibleTab(tab.windowId, {
      format: 'jpeg',
      quality: 90,
    });
    return screenshotUrl;
  } catch (error) {
    console.error('Error capturing tab:', error);
    throw error;
  }
}

// Handle incoming messages
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'captureTab' && typeof request.tabId === 'number') {
    captureTab(request.tabId)
      .then(screenshotUrl => {
        sendResponse({ screenshotUrl });
      })
      .catch(error => {
        sendResponse({ error: error.message });
      });
  } else if (request.action === 'checkBookmark') {
    updateContextMenu(request.url)
      .then(() => {
        sendResponse({});
      })
      .catch(error => {
        sendResponse({ error: error.message });
      });
  } else if (request.action === 'isBookmarked') {
    isUrlBookmarked(request.url)
      .then(bookmarked => {
        sendResponse({ bookmarked });
      })
      .catch(error => {
        sendResponse({ error: error.message });
      });
  } else if (request.action === 'updateContextMenu') {
    chrome.contextMenus.update('bookmark-link', {
      title: request.title,
      enabled: request.enabled,
    });
  }

  return true; // Indicate asynchronous response
});
async function onContextMenuClick(
  info: chrome.contextMenus.OnClickData,
  tab: chrome.tabs.Tab | undefined
) {
  if (info.menuItemId === 'bookmark-link' && tab) {
    console.log('Context menu item clicked. URL:', info.linkUrl, tab.url);
    // Optional: Implement bookmarking functionality here
  }
}
// Initialize the context menu
chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: 'bookmark-link',
    title: 'Bookmark this URL', // Default title
    contexts: ['link'],
  });

  chrome.contextMenus.onClicked.addListener(
    (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab | undefined) =>
      onContextMenuClick(info, tab)
  );

  // Optional: Listen for tab updates to refresh the context menu based on the current tab URL
  chrome.tabs.onUpdated.addListener(async (_tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab && tab.active) {
      await updateContextMenu(tab.url);
    }
  });
});
