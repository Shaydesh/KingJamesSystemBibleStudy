import React, { useCallback, useState } from "react";
import ChapterNavigationModal from "../components/Book/ChapterNavigationModal";
import ChapterNavigator from "../components/Book/ChapterNavigator";
import ConfirmBookmarkSavedModal from "../components/Book/ConfirmBookmarkSavedModal";
import SaveBookmarkModal from "../components/Book/SaveBookmarkModal";
import StrongsDefinitionModal from "../components/Book/StrongsDefinitionModal";
import VerseDisplay from "../components/Book/VerseDisplay";
import { useBook } from "../context/BookContext";
import StrongsDict from "../data/strongsDictionary";
import { useBibleData } from "../hooks/useBibleData";
import { useBookmarkTopics } from "../hooks/useBookmarkTopics";
import { useScrollToVerse } from "../hooks/useScrollToVerse";
import { StrongsData, Verse } from "../types/BibleBook";
import { handleChapterChange } from "../utils/Book/handleChapterChange";

const Book = () => {

  const { book, chapter, setSelectedChapter, verse, setVerseContext } = useBook();

  const { bibleData, currentChapter, setCurrentChapter } = useBibleData(book, chapter);
  const isBibleReady = !!bibleData?.chapters?.length;
  useScrollToVerse(book, chapter, verse, isBibleReady);
  const { topics, setTopics } = useBookmarkTopics();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [inputChapter, setInputChapter] = useState<string>("");
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [filteredTopics, setFilteredTopics] = useState<string[]>([]);
  const [confirmBookmarkSavedModalOpen, setConfirmBookmarkSavedModalOpen] = useState<boolean>(false);
  const [strongsModalOpen, setStrongsModalOpen] = useState(false); // Add state for Strongs modal
  const [strongsData, setStrongsData] = useState<StrongsData[]>([]); // Add state for Strongs data
  const [currentStrongsIndex, setCurrentStrongsIndex] = useState<number>(0);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setInputChapter(""); // Clear input when closing modal
  }, []);

  const openBookmarkModal = useCallback((verse: Verse) => {
    console.log("opening bookmark modal");
    setSelectedVerse(verse);
    setBookmarkModalOpen(true);
  }, []);

  const closeBookmarkModal = useCallback(() => {
    setBookmarkModalOpen(false);
    setTopic("");
    setFilteredTopics([]);
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmBookmarkSavedModalOpen(false);
  }, []);

  //fire handleChapterChange when enter is pressed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChapterChange(currentChapter, setCurrentChapter, setSelectedChapter, book, bibleData, inputChapter, closeModal, setVerseContext);
    }
  };

  return (
    <div>
      <h1 className="bibleBookHeader">{book}</h1>

      {bibleData && bibleData.chapters && bibleData.chapters.length > 0 ? (
        <div>

          <ChapterNavigator
            currentChapter={currentChapter}
            setCurrentChapter={setCurrentChapter}
            setSelectedChapter={setSelectedChapter}
            book={book}
            bibleData={bibleData}
            setModalOpen={setModalOpen}
            setVerseContext={setVerseContext}
          />

          <VerseDisplay
            bibleData={bibleData}
            book={book}
            currentChapter={currentChapter}
            openBookmarkModal={openBookmarkModal}
          />

          <ConfirmBookmarkSavedModal
            confirmBookmarkSavedModalOpen={confirmBookmarkSavedModalOpen}
            closeConfirmModal={closeConfirmModal}
          />

          <ChapterNavigationModal
            modalOpen={modalOpen}
            setInputChapter={setInputChapter}
            handleChapterChange={handleChapterChange}
            handleKeyDown={handleKeyDown}
            closeModal={closeModal}
            inputChapter={inputChapter}
            currentChapter={currentChapter}
            setCurrentChapter={setCurrentChapter}
            setSelectedChapter={setSelectedChapter}
            book={book}
            bibleData={bibleData}
            setVerseContext={setVerseContext}
          />

          <SaveBookmarkModal
            setTopic={setTopic}
            setFilteredTopics={setFilteredTopics}
            topics={topics}
            setStrongsData={setStrongsData}
            setStrongsModalOpen={setStrongsModalOpen}
            setCurrentStrongsIndex={setCurrentStrongsIndex}
            bookmarkModalOpen={bookmarkModalOpen}
            selectedVerse={selectedVerse}
            book={book}
            currentChapter={currentChapter}
            StrongsDict={StrongsDict}
            closeBookmarkModal={closeBookmarkModal}
            topic={topic}
            filteredTopics={filteredTopics}
            setTopics={setTopics}
            setConfirmBookmarkSavedModalOpen={setConfirmBookmarkSavedModalOpen}
          />

          <StrongsDefinitionModal
            strongsModalOpen={strongsModalOpen}
            strongsData={strongsData}
            setStrongsModalOpen={setStrongsModalOpen}
            setStrongsData={setStrongsData}
            setCurrentStrongsIndex={setCurrentStrongsIndex}
            currentStrongsIndex={currentStrongsIndex}
            selectedVerse={selectedVerse}
            openBookmarkModal={openBookmarkModal}
          />

        </div>
      ) : (
        <p>Loading Book...</p>
      )}
    </div>
  );
};

export default Book;
