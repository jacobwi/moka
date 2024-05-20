import { useEffect, useState } from 'react'

import { MdAdd, MdEdit, MdDelete } from 'react-icons/md'

import CategoryForm from '../forms/AddCategoryForm' // Assuming you have a CategoryForm
import { BookmarkCategoryDto } from 'shared/models'
import { bookmarkService } from 'shared/services'
import { Button, DataTable, Dialog, Modal } from 'shared/ui'

const CategoriesPage = () => {
  const [categories, setCategories] = useState<BookmarkCategoryDto[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const [totalCategories, setTotalCategories] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] =
    useState<BookmarkCategoryDto | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  )

  useEffect(() => {
    fetchCategories()
  }, [currentPage])

  const fetchCategories = async () => {
    const response = await bookmarkService.getCategoriesPaginated(
      currentPage,
      pageSize,
    )
    setCategories(response.data)
    setTotalCategories(response.totalCount)
  }

  const handleAddCategory = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const handleEditCategory = (category: BookmarkCategoryDto) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleSaveCategory = async (category: BookmarkCategoryDto) => {
    if (category.id) {
      // Update category logic
    } else {
      // Add new category logic
    }
    setIsModalOpen(false)
    fetchCategories()
  }

  const closeModal = () => setIsModalOpen(false)

  const handleDeleteCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteCategory = async () => {
    if (selectedCategoryId !== null) {
      await bookmarkService.deleteCategory(selectedCategoryId)
      fetchCategories() // Refresh the category list
      setIsDeleteDialogOpen(false) // Close the dialog
      setSelectedCategoryId(null) // Reset the selected category ID
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Count', accessor: 'count' },
    {
      header: 'Actions',
      accessor: (category: BookmarkCategoryDto) => (
        <div className="flex space-x-2 justify-center">
          <Button
            onClick={() => handleEditCategory(category)}
            icon={<MdEdit />}
            className="p-2 rounded hover:bg-theme-accent-hover text-theme-accent"
          />
          <Button
            onClick={() => handleDeleteCategory(category.id)}
            icon={<MdDelete />}
            className="p-2 rounded hover:bg-red-500 hover:text-white text-theme-accent"
          />
        </div>
      ),
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-theme-text mb-6">
        Manage Categories
      </h1>
      <div className="mb-4">
        <Button
          onClick={handleAddCategory}
          icon={<MdAdd className="mr-2" />}
          label="Add Category"
          className="flex items-center bg-theme-accent hover:bg-theme-accent-hover text-white font-medium py-2 px-4 rounded"
        />
      </div>
      <DataTable
        data={categories}
        columns={columns}
        currentPage={currentPage}
        totalCount={totalCategories}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
      {isModalOpen && (
        <Modal
          showModal={isModalOpen}
          closeModal={closeModal}
          title={editingCategory ? 'Edit Category' : 'Add New Category'}
        >
          <CategoryForm
            initialCategory={editingCategory}
            onSave={handleSaveCategory}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {isDeleteDialogOpen && (
        <Dialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          title="Confirm Deletion"
          actions={
            <>
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-theme-text bg-theme-card-bg hover:bg-theme-accent-hover"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCategory}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </>
          }
        >
          <p className="text-theme-text">
            Are you sure you want to delete this category?
          </p>
        </Dialog>
      )}
    </div>
  )
}

export default CategoriesPage
