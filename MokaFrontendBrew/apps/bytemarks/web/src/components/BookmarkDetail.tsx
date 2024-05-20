import React from 'react'
import { BookmarkDto } from '../models/dto'
import { MdOpenInNew, MdDelete, MdTag } from 'react-icons/md'

interface BookmarkDetailProps {
  bookmark: BookmarkDto
  deleteBookmark: (bookmarkId: number) => void
}

const BookmarkDetail: React.FC<BookmarkDetailProps> = ({
  bookmark,
  deleteBookmark,
}) => {
  return (
    <div className="bg-theme-card-bg rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex flex-col md:flex-row">
        {bookmark.image?.base64Data && (
          <div className="w-full md:w-1/3">
            <img
              src={`data:image/jpeg;base64,${bookmark.image.base64Data}`}
              alt={bookmark.title}
              className="rounded-lg mb-4 md:mb-0 object-cover md:h-full"
            />
          </div>
        )}
        <div className="w-full md:w-2/3 md:pl-6">
          <h3 className="text-2xl font-bold text-theme-text mb-2">
            {bookmark.title}
          </h3>
          <p className="text-sm text-theme-text mb-4">{bookmark.description}</p>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-theme-accent hover:text-theme-accent-hover mb-4"
          >
            Visit <MdOpenInNew className="ml-1" />
          </a>
          <div className="flex flex-wrap gap-2 mb-4">
            {bookmark.tags?.map((tag) => (
              <span
                key={tag.id}
                className="flex items-center bg-theme-accent rounded-full px-3 py-1 text-sm text-white"
              >
                <MdTag className="mr-1" /> {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => deleteBookmark(bookmark.id)}
          className="text-theme-accent hover:bg-theme-accent hover:bg-opacity-20 hover:text-white transition-colors p-2 rounded-full"
        >
          <MdDelete size="24" />
        </button>
      </div>
    </div>
  )
}

export default BookmarkDetail
