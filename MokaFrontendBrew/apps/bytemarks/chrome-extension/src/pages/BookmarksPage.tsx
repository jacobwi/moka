import { useEffect, useState } from 'react';
import { useBookmarks } from '@shared/hooks';

export const BookmarksPage = () => {
  const { bookmarks, refreshBookmarks, tags, categories } = useBookmarks();
  const [viewType, setViewType] = useState('latest');
  const [selectedTag, setSelectedTag] = useState('Work');
  const [selectedCategory, setSelectedCategory] = useState('Development');

  useEffect(() => {
    refreshBookmarks(); // This will fetch bookmarks according to your context implementation
  }, [refreshBookmarks, viewType, selectedTag, selectedCategory]);

  // Extract unique tags and categories from bookmarks data for filter options
  const uniqueTags = Array.from(new Set(tags.map(tag => tag.name)));
  const uniqueCategories = Array.from(
    new Set(categories.map(category => category.name))
  );
  if (bookmarks.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-center">
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 font-semibold">
            No bookmarks found
          </p>
          <p className="text-md text-gray-600 mt-2">
            You haven't added any bookmarks yet.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full p-4 bg-theme-card-bg rounded-lg shadow-theme-card">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold text-theme-text">Bookmarks</h1>
        <div className="flex space-x-2">
          {/* View type selection (Latest, Tag, Category) */}
          <select
            value={viewType}
            onChange={e => setViewType(e.target.value)}
            className="p-2 rounded-lg bg-theme-input-bg text-theme-input-text border-theme-border"
          >
            <option value="latest">Latest</option>
            <option value="tag">Tag</option>
            <option value="category">Category</option>
          </select>

          {/* Tag selection */}
          {viewType === 'tag' && (
            <select
              value={selectedTag}
              onChange={e => setSelectedTag(e.target.value)}
              className="p-2 rounded-lg bg-theme-input-bg text-theme-input-text border-theme-border"
            >
              {uniqueTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          )}

          {/* Category selection */}
          {viewType === 'category' && (
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="p-2 rounded-lg bg-theme-input-bg text-theme-input-text border-theme-border"
            >
              {uniqueCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Bookmarks list */}
      <ul role="list" className="divide-y divide-theme-border">
        {bookmarks.map(bookmark => (
          <li key={bookmark.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-lg"
                  src={
                    `data:image/jpeg;base64,${bookmark.image?.base64Data}` ||
                    'https://via.placeholder.com/40'
                  }
                  alt="Favicon"
                />
              </div>
              <div className="flex-1 min-w-0">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-theme-text truncate"
                >
                  {bookmark.title}
                </a>
                <p className="text-sm text-theme-input-text truncate">
                  {bookmark.url}
                </p>
              </div>
              <span className="inline-flex items-center text-sm font-semibold text-theme-accent">
                {bookmark.category || bookmark.tag}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
