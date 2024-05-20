import { createRoot } from 'react-dom/client';
import './content.css';
const div = document.createElement('div');
div.id = '__root';
document.body.appendChild(div);

const rootContainer = document.querySelector('#__root');
if (!rootContainer) throw new Error("Can't find Options root element");
const root = createRoot(rootContainer);
root.render(
  <div className="absolute bottom-0 left-0 text-lg text-black bg-amber-400 z-50">
    content script loaded
  </div>
);

try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}
document.addEventListener('contextmenu', function (event) {
  const clickedElement = event.target;
  console.log(event.type);

  // Check if the clicked element or any of its parents is an <a> element
  let element = clickedElement;
  while (element != null && element.tagName !== 'A') {
    element = element.parentElement;
  }

  // If element is not null, it means we found an <a> tag in the hierarchy
  if (element) {
    chrome.runtime.sendMessage({ action: 'checkBookmark', url: element.href });
  }
  return true;
});
