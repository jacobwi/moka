import { useEffect, useState } from 'react'
import AddBookmarkForm from '../forms/AddBookmarkForm'
import {
  MdAddCircleOutline,
  MdViewModule,
  MdViewList,
  MdViewQuilt,
  MdBookmark,
  MdErrorOutline,
} from 'react-icons/md'
import BookmarkCard from '../BookmarkCard'
import BookmarkList from '../BookmarkList'
import BookmarkDetail from '../BookmarkDetail'
import { useBookmarks } from 'shared/hooks'
import { Button, Loading, Modal } from 'shared/ui'

const ViewType = {
  GRID: 'GRID',
  LIST: 'LIST',
  DETAIL: 'DETAIL',
}

const BookmarksPage = () => {
  const { bookmarks, error, loading, refreshBookmarks, deleteBookmark } =
    useBookmarks()
  const [showModal, setShowModal] = useState(false)
  const [viewType, setViewType] = useState(ViewType.GRID)

  useEffect(() => {
    refreshBookmarks()
  }, [])

  const toggleModal = () => setShowModal(!showModal)

  const renderBookmarks = () => {
    if (loading) return <Loading />

    if (error) {
      return (
        <div className="text-center text-theme-error">
          <MdErrorOutline size={48} className="mx-auto" />
          <p>{error}</p>
        </div>
      )
    }

    if (bookmarks.length === 0) {
      return (
        <div className="text-center text-theme-text">
          <p>No bookmarks found. Add some to get started!</p>
        </div>
      )
    }

    switch (viewType) {
      case ViewType.GRID:
        return bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            deleteBookmark={deleteBookmark}
          />
        ))
      case ViewType.LIST:
        return (
          <BookmarkList bookmarks={bookmarks} deleteBookmark={deleteBookmark} />
        )
      case ViewType.DETAIL:
        return bookmarks.map((bookmark) => (
          <BookmarkDetail
            key={bookmark.id}
            bookmark={bookmark}
            deleteBookmark={deleteBookmark}
          />
        ))
      default:
        return null
    }
  }

  return (
    <div className="flex-1 overflow-auto p-4 bg-theme-bg animate-fadeIn">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center space-x-4">
          <MdBookmark size={40} className="text-theme-accent" />
          <h1 className="text-5xl font-bold text-theme-text leading-tight">
            Your Bookmarks
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            icon={<MdViewModule size={24} />}
            onClick={() => setViewType(ViewType.GRID)}
            colorTheme="bg-transparent"
            textColorTheme="text-theme-accent"
            className="hover:text-theme-accent-hover transition-transform"
          />
          <Button
            icon={<MdViewList size={24} />}
            onClick={() => setViewType(ViewType.LIST)}
            colorTheme="bg-transparent"
            textColorTheme="text-theme-accent"
            className="hover:text-theme-accent-hover transition-transform"
          />
          <Button
            icon={<MdViewQuilt size={24} />}
            onClick={() => setViewType(ViewType.DETAIL)}
            colorTheme="bg-transparent"
            textColorTheme="text-theme-accent"
            className="hover:text-theme-accent-hover transition-transform"
          />
          <Button
            icon={<MdAddCircleOutline size={32} />}
            label="Add New"
            onClick={toggleModal}
            className="hover:bg-theme-accent-hover transition-transform"
          />
        </div>
      </div>

      <div
        className={`grid ${viewType === ViewType.GRID ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}
      >
        {renderBookmarks()}
      </div>

      {showModal && (
        <Modal showModal={showModal} closeModal={toggleModal}>
          <AddBookmarkForm
            closeModal={toggleModal}
            afterSubmit={refreshBookmarks}
          />
        </Modal>
      )}
    </div>
  )
}

export default BookmarksPage
