import { createContext, useState, useCallback } from 'react';
import {
  BookmarkCategoryDto,
  BookmarkDto,
  BookmarkTagDto,
} from '@shared/models';

import { bookmarkService } from '@shared/services';
import { ApiException } from '@shared/models';
import { HttpStatusCode } from 'axios';
interface BookmarkContextState {
  bookmarks: BookmarkDto[];
  tags: BookmarkTagDto[];
  categories: BookmarkCategoryDto[];
  error: string | null;
  loading: boolean;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  refreshBookmarks: () => Promise<void>;
  refreshTags: () => Promise<void>;
  refreshCategories: () => Promise<void>;
  addBookmark: (newBookmark: BookmarkDto) => Promise<void>;
  deleteBookmark: (bookmarkId: number) => Promise<void>;
  addTagToBookmark: (bookmarkId: number, tagName: string) => Promise<void>;
  removeTagFromBookmark: (bookmarkId: number, tagId: number) => Promise<void>;
  addCategoryToBookmark: (
    bookmarkId: number,
    categoryName: string
  ) => Promise<void>;
  removeCategoryFromBookmark: (
    bookmarkId: number,
    categoryId: number
  ) => Promise<void>;
}
const defaultState: BookmarkContextState = {
  bookmarks: [],
  tags: [],
  categories: [],
  error: null,
  loading: false,
  setError: () => {},
  setLoading: () => {},
  refreshBookmarks: async () => {},
  refreshTags: async () => {},
  refreshCategories: async () => {},
  addBookmark: async () => {},
  deleteBookmark: async () => {},
  addTagToBookmark: async () => {},
  removeTagFromBookmark: async () => {},
  addCategoryToBookmark: async () => {},
  removeCategoryFromBookmark: async () => {},
};

export const BookmarkContext =
  createContext<BookmarkContextState>(defaultState);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<BookmarkDto[]>([]);
  const [tags, setTags] = useState<BookmarkTagDto[]>([]);
  const [categories, setCategories] = useState<BookmarkCategoryDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleError = useCallback(
    (message: string, error: Error, httpStatusCode?: HttpStatusCode) => {
      if (httpStatusCode) {
        console.error(`[${httpStatusCode}]`, message, error);
      } else {
        console.error(message, error);
      }
      setError(`${message}: ${error.message}`); // Set a user-friendly error message
    },
    []
  );

  const refreshBookmarks = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedBookmarks = await bookmarkService.getAllBookmarks();
      if (!fetchedBookmarks.success) {
        throw new ApiException(
          fetchedBookmarks.errorMessage as string,
          fetchedBookmarks.httpStatusCode
        );
      }

      setBookmarks(fetchedBookmarks.data as BookmarkDto[]);
      setError(null);
    } catch (error) {
      if (error instanceof ApiException) {
        handleError('Failed to refresh bookmarks', error, error.statusCode);
      } else {
        handleError('Failed to refresh bookmarks', error as Error);
      }
    } finally {
      setLoading(false);
    }
  }, [handleError]);
  const refreshTags = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedTags = await bookmarkService.getAllTags();
      if (!fetchedTags.success) {
        throw new ApiException(
          fetchedTags.errorMessage as string,
          fetchedTags.httpStatusCode
        );
      }
      if (!fetchedTags.HasData) {
        throw new ApiException('No tags found', fetchedTags.httpStatusCode);
      }
      setTags(fetchedTags.data as BookmarkTagDto[]);
      setError(null);
    } catch (error) {
      if (error instanceof ApiException) {
        handleError('Failed to refresh tags', error, error.statusCode);
      } else {
        handleError('Failed to refresh tags', error as Error);
      }
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const refreshCategories = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedCategories = await bookmarkService.getAllCategories();
      if (!fetchedCategories.success) {
        throw new ApiException(
          fetchedCategories.errorMessage as string,
          fetchedCategories.httpStatusCode
        );
      }
      if (!fetchedCategories.HasData) {
        throw new ApiException(
          'No categories found',
          fetchedCategories.httpStatusCode
        );
      }
      setCategories(fetchedCategories.data as BookmarkCategoryDto[]);
      setError(null);
    } catch (error) {
      if (error instanceof ApiException) {
        handleError('Failed to refresh categories', error, error.statusCode);
      } else {
        handleError('Failed to refresh categories', error as Error);
      }
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const addBookmark = useCallback(
    async (newBookmark: BookmarkDto) => {
      setLoading(true);
      try {
        await bookmarkService.addBookmark(newBookmark);
        await refreshBookmarks();
        setError(null);
      } catch (error) {
        handleError('Failed to add bookmark', error as Error);
      } finally {
        setLoading(false);
      }
    },
    [refreshBookmarks, handleError]
  );

  const deleteBookmark = useCallback(
    async (bookmarkId: number) => {
      setLoading(true);
      try {
        await bookmarkService.deleteBookmark(bookmarkId);
        await refreshBookmarks(); // Refresh the list to reflect the deletion
        setError(null);
      } catch (error) {
        handleError('Failed to delete bookmark', error as Error);
      } finally {
        setLoading(false);
      }
    },
    [refreshBookmarks, handleError]
  );
  const addTagToBookmark = useCallback(
    async (bookmarkId: number, tagName: string) => {
      setLoading(true);
      try {
        const newTag: BookmarkTagDto = { name: tagName };
        await bookmarkService.addTagToBookmark(bookmarkId, newTag);
        await refreshBookmarks(); // Refresh the list to reflect the new tag
        setError(null);
      } catch (error) {
        handleError('Failed to add tag to bookmark', error as Error);
      } finally {
        setLoading(false);
      }
    },
    [refreshBookmarks, handleError]
  );

  const removeTagFromBookmark = useCallback(
    async (bookmarkId: number, tagId: number) => {
      setLoading(true);
      try {
        await bookmarkService.removeTagFromBookmark(bookmarkId, tagId);
        await refreshBookmarks(); // Refresh to reflect the removal of the tag
        setError(null);
      } catch (error) {
        handleError('Failed to remove tag from bookmark', error as Error);
      } finally {
        setLoading(false);
      }
    },
    [refreshBookmarks, handleError]
  );
  const removeCategoryFromBookmark = useCallback(
    async (bookmarkId: number, categoryId: number) => {
      setLoading(true);
      try {
        await bookmarkService.removeCategoryFromBookmark(
          bookmarkId,
          categoryId
        );

        await refreshBookmarks(); // Refresh to reflect the removal of the category
        setError(null);
      } catch (error) {
        handleError('Failed to remove category from bookmark', error as Error);
      } finally {
        setLoading(false);
      }
    },
    [refreshBookmarks, handleError]
  );

  const addCategoryToBookmark = useCallback(
    async (bookmarkId: number, categoryName: string) => {
      setLoading(true);
      try {
        const newCategory: BookmarkCategoryDto = { name: categoryName };
        await bookmarkService.addCategoryToBookmark(bookmarkId, newCategory);
        await refreshBookmarks(); // Refresh to reflect the new category
        setError(null);
      } catch (error) {
        handleError('Failed to add category to bookmark', error as Error);
      } finally {
        setLoading(false);
      }
    },
    [refreshBookmarks, handleError]
  );

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        tags,
        categories,
        error,
        loading,
        setError,
        setLoading,
        refreshBookmarks,
        refreshTags,
        refreshCategories,
        addBookmark,
        deleteBookmark,
        addTagToBookmark,
        removeTagFromBookmark,
        addCategoryToBookmark,
        removeCategoryFromBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
