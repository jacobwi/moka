import { useEffect, useState } from 'react'

import { MdAdd, MdEdit, MdDelete } from 'react-icons/md'
import { BookmarkTagDto } from 'shared/models'
import { bookmarkService } from 'shared/services'
import { Button, DataTable, Dialog, Modal } from 'shared/ui'
import TagForm from '../forms/TagForm'

const TagsPage = () => {
  const [tags, setTags] = useState<BookmarkTagDto[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const [totalTags, setTotalTags] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<BookmarkTagDto | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null)

  useEffect(() => {
    fetchTags()
  }, [currentPage])

  const fetchTags = async () => {
    const response = await bookmarkService.getTagsPaginated(
      currentPage,
      pageSize,
    )
    setTags(response.data)
    setTotalTags(response.totalCount)
  }

  const handleAddTag = () => {
    setEditingTag(null)
    setIsModalOpen(true)
  }

  const handleEditTag = (tag) => {
    setEditingTag(tag)
    setIsModalOpen(true)
  }

  const handleSaveTag = async (tag) => {
    if (tag.id) {
      // Update tag logic
      bookmarkService.updateTag(tag.id, tag)

      // update that signle tag in state
      setTags((prevTags) => {
        const index = prevTags.findIndex((t) => t.id === tag.id)
        if (index !== -1) {
          prevTags[index] = tag
        }
        return [...prevTags]
      })
    } else {
      // Add new tag logic
    }
    setIsModalOpen(false)
  }

  const closeModal = () => setIsModalOpen(false)

  const handleDeleteTag = (tagId) => {
    setSelectedTagId(tagId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteTag = async () => {
    if (selectedTagId) {
      await bookmarkService.deleteTag(selectedTagId)
      fetchTags()
      setIsDeleteDialogOpen(false)
      setSelectedTagId(null)
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Count', accessor: 'count' },
    {
      header: 'Actions',
      accessor: (tag) => (
        <div className="flex space-x-2 justify-center ">
          <Button
            onClick={() => handleEditTag(tag)}
            icon={<MdEdit />}
            className="p-2 rounded"
            colorTheme="bg-transparent"
            textColorTheme="text-theme-accent"
            hoverClass="hover:bg-theme-accent-hover hover:text-white"
          />

          <Button
            onClick={() => handleDeleteTag(tag.id)}
            icon={<MdDelete />}
            className="p-2 rounded"
            colorTheme="bg-transparent"
            textColorTheme="text-theme-accent"
            hoverClass="hover:bg-red-500 hover:text-white"
          />
        </div>
      ),
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-theme-text mb-6">Manage Tags</h1>
      <div className="mb-4">
        <Button
          onClick={handleAddTag}
          icon={<MdAdd className="mr-2" />}
          label="Add New Tag"
          className="bg-theme-accent hover:bg-theme-accent-hover text-white font-medium py-2 px-4 rounded flex items-center"
        />
      </div>
      <DataTable
        data={tags}
        columns={columns}
        currentPage={currentPage}
        totalCount={totalTags}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
      <Modal
        showModal={isModalOpen}
        closeModal={closeModal}
        title={editingTag ? 'Edit Tag' : 'Add New Tag'}
      >
        <TagForm
          initialTag={editingTag}
          onSave={handleSaveTag}
          onCancel={closeModal}
        />
      </Modal>
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Confirm Deletion"
        actions={
          <>
            <Button
              onClick={() => setIsDeleteDialogOpen(false)}
              label="Cancel"
              className="mr-2"
            />
            <Button
              onClick={confirmDeleteTag}
              label="Delete"
              className="bg-red-600 hover:bg-red-700 text-white"
            />
          </>
        }
      >
        <p className="text-theme-text">
          Are you sure you want to delete this tag?
        </p>
      </Dialog>
    </div>
  )
}

export default TagsPage
