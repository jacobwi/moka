// bookmarkService.js

import axiosInstance from '../axiosInstance';
import { BookmarkCategoryDto } from '../models/dto/BookmarkCategoryDto';
import { BookmarkDto } from '../models/dto/BookmarkDto';
import { BookmarkTagDto } from '../models/dto/BookmarkTagDto';
import { handleApiRequest } from '../utils/apiUtils';

const bookmarkService = {
  getBookmarksPaginated: async (page: number, pageSize: number) => {
    return handleApiRequest(() =>
      axiosInstance.get('/api/Bookmarks/paginated', {
        params: { page, pageSize },
      })
    );
  },

  getTagsPaginated: async (page: number, pageSize: number) => {
    return handleApiRequest(() =>
      axiosInstance.get('/api/Tags/paginated', {
        params: { page, pageSize },
      })
    );
  },

  getCategoriesPaginated: async (page: number, pageSize: number) => {
    return handleApiRequest(() =>
      axiosInstance.get('/api/Category/paginated', {
        params: { page, pageSize },
      })
    );
  },

  getAllBookmarks: async () => {
    return handleApiRequest(() => axiosInstance.get('/api/Bookmarks'));
  },

  addBookmark: async (newBookmark: BookmarkDto) => {
    return handleApiRequest(() =>
      axiosInstance.post('/api/Bookmarks', newBookmark)
    );
  },

  deleteBookmark: async (bookmarkId: number) => {
    return handleApiRequest(() =>
      axiosInstance.delete(`/api/Bookmarks/${bookmarkId}`)
    );
  },

  updateBookmark: async (bookmarkId: number, updatedBookmark: BookmarkDto) => {
    return handleApiRequest(() =>
      axiosInstance.put(`/api/Bookmarks/${bookmarkId}`, updatedBookmark)
    );
  },

  addTagToBookmark: async (bookmarkId: number, newTag: BookmarkTagDto) => {
    return handleApiRequest(() =>
      axiosInstance.post(`/api/Bookmarks/${bookmarkId}/tag`, newTag)
    );
  },

  removeTagFromBookmark: async (bookmarkId: number, tagId: number) => {
    return handleApiRequest(() =>
      axiosInstance.delete(`/api/Bookmarks/${bookmarkId}/tag/${tagId}`)
    );
  },

  addCategoryToBookmark: async (
    bookmarkId: number,
    newCategory: BookmarkCategoryDto
  ) => {
    return handleApiRequest(() =>
      axiosInstance.post(`/api/Bookmarks/${bookmarkId}/category`, newCategory)
    );
  },

  removeCategoryFromBookmark: async (
    bookmarkId: number,
    categoryId: number
  ) => {
    return handleApiRequest(() =>
      axiosInstance.delete(
        `/api/Bookmarks/${bookmarkId}/category/${categoryId}`
      )
    );
  },

  getAllTags: async () => {
    return handleApiRequest(() => axiosInstance.get('/api/Tags'));
  },

  getAllCategories: async () => {
    return handleApiRequest(() => axiosInstance.get('/api/Categories'));
  },

  addTag: async (newTag: BookmarkTagDto) => {
    return handleApiRequest(() => axiosInstance.post('/api/Tags', newTag));
  },

  deleteTag: async (tagId: number) => {
    return handleApiRequest(() => axiosInstance.delete(`/api/Tags/${tagId}`));
  },

  addCategory: async (newCategory: BookmarkCategoryDto) => {
    return handleApiRequest(() =>
      axiosInstance.post('/api/Categories', newCategory)
    );
  },

  deleteCategory: async (categoryId: number) => {
    return handleApiRequest(() =>
      axiosInstance.delete(`/api/Categories/${categoryId}`)
    );
  },
  updateTag: async (tagId: number, updatedTag: BookmarkTagDto) => {
    return handleApiRequest(() =>
      axiosInstance.put(`/api/Tags/${tagId}`, updatedTag)
    );
  },
};

export default bookmarkService;
