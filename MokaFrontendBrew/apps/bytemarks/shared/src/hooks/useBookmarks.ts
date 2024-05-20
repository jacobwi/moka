import { useContext } from 'react';
import { BookmarkContext } from '@shared/contexts'; // Adjust the import path as necessary

const useBookmarks = () => {
  const context = useContext(BookmarkContext);

  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }

  return context;
};

export default useBookmarks;
