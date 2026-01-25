import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GroupedBookmarkList } from "../components/Bookmarks/BookmarkList";
import { BookmarkSelectModal } from "../components/Bookmarks/BookmarkSelectModal";
import { DeleteConfirmationModal } from "../components/Bookmarks/DeleteConfirmationModal";
import { useBook } from "../context/BookContext";
import { useBookmarkModal } from "../hooks/useBookmarkModal";
import { useBookmarks } from "../hooks/useBookmarks";
import { groupBookmarksByTopic } from "../utils/Bookmarks/groupBookmarksByTopic";
import { handleBookmarkDelete } from "../utils/Bookmarks/handleBookmarkDelete";

const Bookmarks = () => {
  const { chapter, setSelectedChapter } = useBook();
  const { book, setBookTheme } = useBook();
  const { verse, setVerseContext } = useBook();

  const { bookmarks, setBookmarks, loading, setLoading } = useBookmarks();
  const {
    modalOpen,
    confirmDeleteModalOpen,
    selectedBook,
    selectedChapter,
    selectedVerse,
    selectedBookmarkId,
    hasDeleted,
    setHasDeleted,
    openModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
  } = useBookmarkModal();

  const navigate = useNavigate();

  const handleNavigate = useCallback((bookName: string, Chapter: number, Verse: number) => {
    try {
      console.log("Navigate clicked verse " + Verse);
      setBookTheme(bookName); // Store book
      setSelectedChapter(Chapter - 1);
      setVerseContext(Verse);
      navigate(`/Book/${bookName}`);
    } catch (error) {
      console.error("Error navigating:", error); // Handle the error
    } finally {
      // This will always run, regardless of whether an error occurred
      console.log("Navigation attempt finished.");
    }
  }, [setBookTheme, setSelectedChapter, setVerseContext, navigate]);

  const groupedBookmarks = groupBookmarksByTopic(bookmarks);

  // Loading and rendering logic
  return (
    <div className="bookmarks-container">
      <h1 className="bookmarks-title">Bookmarks</h1>
      {loading ? (
        <p>Loading bookmarks...</p> // Show loading text while bookmarks are being fetched
      ) : (
        <>
          <GroupedBookmarkList
            groupedBookmarks={groupedBookmarks}
            onBookmarkClick={openModal}
          />

          {modalOpen && (
            <BookmarkSelectModal
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
              selectedVerse={selectedVerse}
              verseFromContext={verse}
              onClose={closeModal}
              onNavigate={() => handleNavigate(selectedBook, selectedChapter, verse)}
              onDelete={() =>
                handleBookmarkDelete(
                  selectedBookmarkId,
                  hasDeleted,
                  bookmarks,
                  setBookmarks,
                  setHasDeleted,
                  openDeleteModal,
                  closeModal
                )
              }
            />
          )}

          {confirmDeleteModalOpen && (
            <DeleteConfirmationModal
              onClose={closeDeleteModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Bookmarks;
