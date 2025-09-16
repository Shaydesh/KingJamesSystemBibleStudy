import { deleteBookmark } from "../../DB";
import { Bookmark } from "../../types/BibleBook";

export const handleBookmarkDelete = (
  selectedBookmarkId: number,
  hasDeleted: boolean,
  bookmarks: Bookmark[],
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>,
  setHasDeleted: React.Dispatch<React.SetStateAction<boolean>>,
  openDeleteModal: () => void,
  closeModal: () => void,

) => {
  try {
    if (selectedBookmarkId && !hasDeleted) {
      // Prevent deletion and alert if already deleted
      deleteBookmark(selectedBookmarkId) // Delete the bookmark by ID
        .then(() => {
          // Update the state to remove the deleted bookmark
          setBookmarks(
            bookmarks.filter(
              (bookmark) => bookmark.id !== selectedBookmarkId,
            ),
          );
          setHasDeleted(true); // Set hasDeleted to true after successful deletion
          openDeleteModal(); // Show success alert once
        });

      closeModal(); // Close the modal after deletion
    }
  } catch (error) {
    console.error("Error deleting bookmark:", error);
  }
};