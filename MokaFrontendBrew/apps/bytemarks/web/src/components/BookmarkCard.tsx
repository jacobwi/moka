import React, { useState } from 'react'
import { MdDelete, MdOpenInNew, MdAdd } from 'react-icons/md'
import { useBookmarks } from 'shared/hooks'
import { BookmarkDto, BookmarkTagDto, Position } from 'shared/models'
import { InputField, Button, Tag } from 'shared/ui'

interface BookmarkCardProps {
  bookmark: BookmarkDto
  deleteBookmark: (bookmarkId: number) => void
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({
  bookmark,
  deleteBookmark,
}) => {
  const [newTag, setNewTag] = useState('')
  const { addTagToBookmark, removeTagFromBookmark } = useBookmarks()

  const handleAddTag = async () => {
    if (newTag) {
      try {
        await addTagToBookmark(bookmark.id, newTag)
        setNewTag('')
      } catch (error) {
        console.error('Failed to add tag', error)
      }
    }
  }

  const handleRemoveTag = async (tagId: number) => {
    try {
      await removeTagFromBookmark(bookmark.id, tagId)
    } catch (error) {
      console.error('Failed to remove tag', error)
    }
  }

  return (
    <div className="bg-theme-card-bg rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500 transform hover:-translate-y-1">
      <div className="p-4 space-y-4">
        <h3 className="text-xl font-bold text-theme-text truncate">
          {bookmark.title}
        </h3>
        <p className="text-sm text-theme-text">{bookmark.description}</p>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-theme-accent hover:text-theme-accent-hover transition-colors duration-300"
        >
          <span>Visit</span>
          <MdOpenInNew className="ml-1" />
        </a>
        <div className="flex flex-wrap gap-2">
          {bookmark.tags?.map((tag: BookmarkTagDto, index: number) => (
            <Tag
              key={index}
              name={tag.name}
              onIconClick={() => handleRemoveTag(tag.id)}
              icon={{
                component: MdDelete,
                position: Position.RIGHT,
                hoverColorClass: 'text-red-500',
              }}
            />
          ))}
        </div>
        <div className="flex items-center">
          <InputField
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add new tag"
            additionalClasses="flex-grow mr-2"
          />
          <Button icon={<MdAdd />} onClick={handleAddTag} disabled={!newTag} />
        </div>
      </div>
      {bookmark.image?.base64Data && (
        <img
          src={`data:image/jpeg;base64,${bookmark.image.base64Data}`}
          alt={bookmark.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="flex justify-end p-4">
        <button
          onClick={() => deleteBookmark(bookmark.id)}
          className="text-theme-accent hover:text-red-500 rounded-full p-2 transition-colors duration-300"
        >
          <MdDelete size="24" />
        </button>
      </div>
    </div>
  )
}

export default BookmarkCard
