import React, { useState } from 'react'
import imageCompression from 'browser-image-compression'
import { MdCloudUpload, MdCheckCircle, MdError } from 'react-icons/md'
import axiosInstance from 'shared/axiosInstance'
import { handleApiRequest } from 'shared/utils/apiUtils'
import { InputField, Loading } from 'shared/ui'

interface AddBookmarkFormProps {
  closeModal: () => void
  afterSubmit?: () => void // Optional callback to run after form submission
}

const AddBookmarkForm = ({ closeModal, afterSubmit }: AddBookmarkFormProps) => {
  const [title, setTitle] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }

    try {
      const formData = new FormData()
      if (image) {
        const compressedImage = await imageCompression(image, options)
        formData.append('image', compressedImage)
      }
      formData.append('title', title)
      formData.append('url', url)
      formData.append('description', description)

      const request = () =>
        axiosInstance.post('/api/Bookmarks', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

      const response = await handleApiRequest(request)

      if (response.success) {
        closeModal()
        if (afterSubmit) afterSubmit()
      } else {
        setError(response.errorMessage || 'Failed to add bookmark')
      }
    } catch (err) {
      setError('Failed to add bookmark')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-4 w-full bg-theme-bg text-theme-text"
    >
      <InputField
        label="Title"
        id="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <InputField
        label="URL"
        id="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <TextAreaField
        label="Description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex justify-between items-center">
        <label
          htmlFor="image"
          className="flex items-center space-x-2 cursor-pointer text-theme-accent hover:text-theme-accent-hover"
        >
          <MdCloudUpload size="24" />
          <span className="text-sm">Upload Image</span>
        </label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          className="hidden"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="h-24 w-24 rounded-md object-cover"
          />
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg transition-colors duration-300 bg-theme-button-bg text-theme-button-text hover:bg-theme-button-bg-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <Loading /> : <MdCheckCircle size="24" />}
        </button>
      </div>
      {error && (
        <div className="text-center text-theme-error">
          <MdError size="24" className="align-middle mr-2" />
          {error}
        </div>
      )}
    </form>
  )
}

const TextAreaField = ({
  label,
  id,
  value,
  onChange,
}: {
  label: string
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-theme-text"
    >
      {label}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={onChange} // The parent component should handle event object
      className="w-full rounded-lg border-2 border-theme-border px-4 py-3 text-sm text-theme-text bg-theme-input-bg focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent transition ease-in-out duration-150"
      rows={4}
    />
  </div>
)

export default AddBookmarkForm
