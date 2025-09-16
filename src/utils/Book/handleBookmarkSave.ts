import { saveBookmark } from "../../DB";
import { Verse } from "../../types/BibleBook";

export const handleBookmarkSave = (
  selectedVerse: Verse | null,
  book: string,
  currentChapter: number,
  topic: string,
  topics: string[],
  setTopics: React.Dispatch<React.SetStateAction<string[]>>,
  setTopic: React.Dispatch<React.SetStateAction<string>>,
  closeBookmarkModal: () => void,
  openConfirmModal: () => void
) => {
  if (selectedVerse?.verse) {
    const verseId = `${book}_${currentChapter + 1}_${selectedVerse.verse}`;
    saveBookmark(
      book,
      currentChapter + 1,
      selectedVerse.verse,
      topic,
      verseId,
    )
      .then(() => {
        // Update topics list if the topic is new
        if (topic && !topics.includes(topic)) {
          setTopics((prevTopics) => [...prevTopics, topic]); // Add new topic
        }
        setTopic(""); // Clear topic after saving
        closeBookmarkModal(); // Close modal after saving
        openConfirmModal();
      })
      .catch((error: Error) => {
        console.error("Error saving bookmark:", error);
      });
  }
}