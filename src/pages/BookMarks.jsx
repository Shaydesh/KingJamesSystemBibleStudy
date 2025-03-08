import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initDB, getAllBookmarks, deleteBookmark } from "../DB"; // Adjust the import path
import { useBook } from "../BookContext";

const BookMarks = () => {
  const { chapter, setSelectedChapter } = useBook();
  const { book, setBookTheme } = useBook();
  const { verse, setVerseContext } = useBook();

  const [bookmarks, setBookmarks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [selectedChapter, setChapter] = useState("");
  const [selectedVerse, setSelectedVerse] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedBookmarkId, setSelectedBookmarkId] = useState(null);
  const [hasDeleted, setHasDeleted] = useState(false);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        await initDB(); // Wait for the database to initialize
        const allBookmarks = await getAllBookmarks();
        setBookmarks(allBookmarks);
      } catch (error) {
        console.error("Error loading bookmarks:", error);
      } finally {
        setLoading(false); // Set loading to false after bookmarks are loaded
      }
    };

    loadBookmarks(); // Call the async function
  }, []);

  // Group bookmarks by topic
  const groupBookmarksByTopic = () => {
    return bookmarks.reduce((acc, bookmark) => {
      const topic = bookmark.topic || "Uncategorized"; // Default topic if none is set
      if (!acc[topic]) {
        acc[topic] = [];
      }
      acc[topic].push(bookmark);
      return acc;
    }, {});
  };

  const handleBookmarkClick = (bookName, bookmarkChapter, bookmarkVerse) => {
    setBookTheme(bookName); // Set the global context
    setSelectedChapter(bookmarkChapter);
    setVerseContext(bookmarkVerse);
    //navigate(`/Book/${bookName}/Chapter/${chapter}/Verse/${verse}`);
    // navigate(`/Book/${bookName}`); // Navigate to the book page
  };

  const openModal = (Book, Chapter, Verse, id) => {
    setSelectedBook(Book);
    setVerseContext(Verse);
    setChapter(Chapter);
    setSelectedVerse(Verse); // Store verse
    setSelectedBookmarkId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setHasDeleted(false); // Reset the hasDeleted flag when closing the modal
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal();
      closeDeleteModal();
    }
  };

  const handleDeleteModalClick = () => {
    setConfirmDeleteModalOpen(false);
    // Reset the hasDeleted flag when closing the modal
  };

  const openDeleteModal = () => {
    setConfirmDeleteModalOpen(true);
    // Reset the hasDeleted flag when closing the modal
  };

  const closeDeleteModal = () => {
    setConfirmDeleteModalOpen(false);
    // Reset the hasDeleted flag when closing the modal
  };

  const handleDeleteBookmark = async () => {
    try {
      if (selectedBookmarkId && !hasDeleted) {
        // Prevent deletion and alert if already deleted
        await deleteBookmark(selectedBookmarkId) // Delete the bookmark by ID
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

  const handleNavigate = (bookName, Chapter, Verse) => {
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
  };

  const groupedBookmarks = groupBookmarksByTopic();

  // Loading and rendering logic
  return (
    <div className="bookmarks-container">
      <h1 className="bookmarks-title">Bookmarks</h1>
      {loading ? (
        <p>Loading bookmarks...</p> // Show loading text while bookmarks are being fetched
      ) : (
        <>
          {Object.keys(groupedBookmarks).length > 0 ? (
            Object.entries(groupedBookmarks).map(([topic, bookmarks]) => (
              <div key={topic}>
                <h2 className="topic-header">{topic}</h2>
                <ul className="bookmarks-list">
                  {bookmarks
                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (newest first)
                    .map((bookmark) => (
                      <li key={bookmark.id} className="bookmark-item">
                        <Link
                          className="link"
                          onClick={() =>
                            openModal(
                              bookmark.book,
                              bookmark.chapter,
                              bookmark.verse,
                              bookmark.id,
                            )
                          }
                        >
                          {bookmark.book} - Chapter {bookmark.chapter}, Verse{" "}
                          {bookmark.verse}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="no-bookmarks">No bookmarks found.</p>
          )}

          {modalOpen && (
            <div className="modal" onClick={handleOverlayClick}>
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <h2>Bookmark Menu</h2>
                <p>What would you like to do with this Bookmark?</p>
                <p>
                  {selectedBook}, Chapter {selectedChapter}, Verse {verse}
                </p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(selectedBook, selectedChapter, verse);
                  }}
                >
                  Navigate to
                </button>
                <button onClick={handleDeleteBookmark}>Delete</button>
              </div>
            </div>
          )}

          {confirmDeleteModalOpen && (
            <div className="modal" onClick={handleOverlayClick}>
              <div className="modal-content">
                <span className="close" onClick={closeDeleteModal}>
                  &times;
                </span>
                <h2>Boomark Deleted</h2>
                <button onClick={handleDeleteModalClick}>Ok</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookMarks;
