import React, { useRef, useCallback, useEffect } from "react";
import { StrongsData, StrongsDictionary, Verse } from "../../types/BibleBook";
import { handleBookmarkSave } from "../../utils/Book/handleBookmarkSave";
import styles from "./SaveBookmarkModal.module.css";

interface SaveBookmarkModalProps {
  bookmarkModalOpen: boolean,
  selectedVerse: Verse | null,
  closeBookmarkModal: () => void,
  book: string,
  currentChapter: number,
  StrongsDict: StrongsDictionary,
  setTopic: React.Dispatch<React.SetStateAction<string>>,
  setFilteredTopics: React.Dispatch<React.SetStateAction<string[]>>,
  topics: string[],
  setStrongsData: React.Dispatch<React.SetStateAction<StrongsData[]>>,
  setStrongsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentStrongsIndex: React.Dispatch<React.SetStateAction<number>>,
  topic: string,
  filteredTopics: string[],
  setTopics: React.Dispatch<React.SetStateAction<string[]>>,
  setConfirmBookmarkSavedModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const SaveBookmarkModal: React.FC<SaveBookmarkModalProps> = ({
  setTopic,
  setFilteredTopics,
  topics,
  setStrongsData,
  setStrongsModalOpen,
  setCurrentStrongsIndex,
  bookmarkModalOpen,
  selectedVerse,
  book,
  currentChapter,
  StrongsDict,
  closeBookmarkModal,
  topic,
  filteredTopics,
  setTopics,
  setConfirmBookmarkSavedModalOpen,

}) => {

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains(styles.modal)) {
      closeBookmarkModal();
    }
  };

  const openStrongsModal = (strongsData: StrongsData[]) => {
    setStrongsData(strongsData);
    setStrongsModalOpen(true);
    setCurrentStrongsIndex(0);
  };

  // Debounce timer ref for topic filtering
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Debounced filter function
  const filterTopics = useCallback((inputValue: string) => {
    if (inputValue.trim() === "") {
      setFilteredTopics([]);
    } else {
      const filtered: string[] = topics.filter((t) =>
        t.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilteredTopics(filtered);
    }
  }, [topics, setFilteredTopics]);

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTopic(inputValue); // Update immediately for responsive typing

    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce the filtering (300ms delay)
    debounceTimerRef.current = setTimeout(() => {
      filterTopics(inputValue);
    }, 300);
  };

  const handleTopicSelect = (selectedTopic: string) => {
    setTopic(selectedTopic); // Set the selected topic
    setFilteredTopics([]); // Clear the suggestions list
  };

  const openConfirmModal = () => {
    setConfirmBookmarkSavedModalOpen(true);
  };

  return (
    <>
      {bookmarkModalOpen && selectedVerse && (
        <div className={styles.modal} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeBookmarkModal}>
              &times;
            </span>
            <h2>Bookmark Verse</h2>
            <p>Do you want to save this verse as a bookmark?</p>
            <p>
              {book}, Chapter {currentChapter + 1}, Verse{" "}
              {selectedVerse.verse}
            </p>

            {/* Display verse with clickable phrases if it has Strong's data */}
            {selectedVerse.v && Array.isArray(selectedVerse.v) ? (
              <p className={styles.clickablePhrase}>
                {selectedVerse.v.map((phraseData, phraseIndex) => {
                  const phrase = phraseData[0];
                  const strongsRefs = phraseData[1];

                  return (
                    <React.Fragment key={phraseIndex}>
                      <span
                        onClick={() => {
                          console.log(
                            `Strongs reference for "${phrase}":`,
                            strongsRefs,
                          );

                          const strongsEntries = strongsRefs
                            .map((ref) =>
                              StrongsDict.dictionary.find((entry) => entry.k === ref)
                            )
                            .filter((entry): entry is StrongsData => !!entry); // filter + type guard// Filter out any undefined entries

                          if (strongsEntries.length > 0) {
                            closeBookmarkModal();
                            openStrongsModal(strongsEntries); // Pass all entries to the modal
                          } else {
                            console.log(
                              "No Strong's entry found for the references:",
                              strongsRefs,
                            );
                          }
                        }}
                      >
                        {phrase}
                      </span>
                      {/* Add space after each phrase except the last one */}
                      {phraseIndex < selectedVerse.v.length - 1 ? " " : ""}
                    </React.Fragment>
                  );
                })}
              </p>
            ) : (
              <p>{selectedVerse.text}</p>
            )}
            <div className={styles.topicSearch}>
              <input
                id="topic-input"
                type="text"
                value={topic}
                onChange={handleTopicChange}
                placeholder="Type a topic..."
              />
              {filteredTopics.length > 0 && (
                <ul className={styles.suggestionsList}>
                  {filteredTopics.map((suggestedTopic, index) => (
                    <li
                      key={index}
                      onClick={() => handleTopicSelect(suggestedTopic)}
                    >
                      {suggestedTopic}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button onClick={() => handleBookmarkSave(selectedVerse, book, currentChapter, topic, topics, setTopics, setTopic, closeBookmarkModal, openConfirmModal)}>Yes, Save</button>
            <button onClick={closeBookmarkModal}>No, Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export default SaveBookmarkModal