// useBookmarkModal.ts
import { useState } from "react";
import { useBook } from "../context/BookContext";


export const useBookmarkModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [selectedChapter, setChapter] = useState(0);
  const [selectedVerse, setSelectedVerse] = useState(0);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedBookmarkId, setSelectedBookmarkId] = useState(0);
  const [hasDeleted, setHasDeleted] = useState(false);

  const { verse, setVerseContext } = useBook();

  const openModal = (book: string, chapter: number, Verse: number, id: number) => {
    setSelectedBook(book);
    setChapter(chapter);
    setSelectedVerse(verse);
    setSelectedBookmarkId(id);
    setHasDeleted(false);
    setModalOpen(true);
    setVerseContext(Verse);
  };

  const closeModal = () => {
    setModalOpen(false);
    setHasDeleted(false);
  };

  const openDeleteModal = () => setConfirmDeleteModalOpen(true);
  const closeDeleteModal = () => setConfirmDeleteModalOpen(false);

  return {
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
    // setConfirmDeleteModalOpen,

  };
};
