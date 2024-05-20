import React, { useState } from 'react'

interface CategoryFormProps {
  initialCategory?: { id?: number; name: string } // Assuming category has an id and a name
  onSave: (category: { id?: number; name: string }) => void
  onCancel: () => void
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialCategory,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(initialCategory?.name || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...initialCategory, name })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-theme-text"
        >
          Category Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-theme-input-bg text-theme-text border border-theme-border rounded-md shadow-sm focus:outline-none focus:ring-theme-accent focus:border-theme-accent"
          required
        />
      </div>

      <div className="flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-theme-text bg-theme-card-bg hover:bg-theme-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-accent"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-theme-accent hover:bg-theme-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-accent"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default CategoryForm
