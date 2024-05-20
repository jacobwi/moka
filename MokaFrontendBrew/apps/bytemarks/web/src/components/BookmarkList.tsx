import React from 'react'
import { BookmarkDto } from '../models/dto'
import { MdOpenInNew, MdDelete } from 'react-icons/md'

interface BookmarkListProps {
  bookmarks: BookmarkDto[]
  deleteBookmark: (bookmarkId: number) => void
}

const BookmarkList: React.FC<BookmarkListProps> = ({
  bookmarks,
  deleteBookmark,
}) => {
  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="flex items-center justify-between p-4 bg-theme-card-bg rounded-lg shadow hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={bookmark.image?.thumbnailUrl}
                alt=""
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-theme-text">
                {bookmark.title}
              </h3>
              <p className="text-sm text-theme-text opacity-75">
                {bookmark.description}
              </p>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-theme-accent hover:text-theme-accent-hover mt-2"
              >
                Visit <MdOpenInNew className="ml-1" />
              </a>
            </div>
          </div>
          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="p-2 text-theme-accent hover:bg-theme-accent-hover hover:bg-opacity-20 rounded-full transition duration-300"
          >
            <MdDelete size="24" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default BookmarkList
