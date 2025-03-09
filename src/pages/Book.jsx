import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useBook } from "../BookContext";
import { initDB, saveBookmark, getSuggestions, getDistinctTopics} from '../DB';

import RevelationJSON from "../books/Revelation.jsx";
import JudeJSON from "../books/Jude.jsx";
import IIIJohnJSON from "../books/3John.jsx";
import IIJohnJSON from "../books/2John.jsx";
import IJohnJSON from "../books/1John.jsx";
import IIPeterJSON from "../books/2Peter.jsx";
import IPeterJSON from "../books/1Peter.jsx";
import JamesJSON from "../books/James.jsx";
import HebrewsJSON from "../books/Hebrews.jsx";
import PhilemonJSON from "../books/Philemon.jsx";
import TitusJSON from "../books/Titus.jsx";
import IITimothyJSON from "../books/2Timothy.jsx";
import ITimothyJSON from "../books/1Timothy.jsx";
import IIThessaloniansJSON from "../books/2Thessalonians.jsx";
import IThessaloniansJSON from "../books/1Thessalonians.jsx";
import ColossiansJSON from "../books/Colossians.jsx";
import PhilippiansJSON from "../books/Philippians.jsx";
import EphesiansJSON from "../books/Ephesians.jsx";
import GalatiansJSON from "../books/Galatians.jsx";
import IICorinthiansJSON from "../books/2Corinthians.jsx";
import ICorinthiansJSON from "../books/1Corinthians.jsx";
import RomansJSON from "../books/Romans.jsx";
import ActsJSON from "../books/Acts.jsx";
import JohnJSON from "../books/John.jsx";
import LukeJSON from "../books/Luke.jsx";
import MarkJSON from "../books/Mark.jsx";
import MatthewJSON from "../books/Matthew.jsx";
import MalachiJSON from "../books/Malachi.jsx";
import ZechariahJSON from "../books/Zechariah.jsx";
import HaggaiJSON from "../books/Haggai.jsx";
import ZephaniahJSON from "../books/Zephaniah.jsx";
import HabakkukJSON from "../books/Habakkuk.jsx";
import NahumJSON from "../books/Nahum.jsx";
import MicahJSON from "../books/Micah.jsx";
import JonahJSON from "../books/Jonah.jsx";
import ObadiahJSON from "../books/Obadiah.jsx";
import AmosJSON from "../books/Amos.jsx";
import JoelJSON from "../books/Joel.jsx";
import HoseaJSON from "../books/Hosea.jsx";
import DanielJSON from "../books/Daniel.jsx";
import IChoniclesJSON from "../books/1Chronicles.jsx";
import IKingsJSON from "../books/1Kings.jsx";
import ISamuelJSON from "../books/1Samuel.jsx";
import IIChroniclesJSON from "../books/2Chronicles.jsx";
import IIKingsJSON from "../books/2Kings.jsx";
import IISamuelJSON from "../books/2Samuel.jsx";
import DeuteronomyJSON from "../books/Deuteronomy.jsx";
import EcclesiastesJSON from "../books/Ecclesiastes.jsx";
import EstherJSON from "../books/Esther.jsx";
import ExodusJSON from "../books/Exodus.jsx";
import EzekielJSON from "../books/Ezekiel.jsx";
import EzraJSON from "../books/Ezra.jsx";
import IsaiahJSON from "../books/Isaiah.jsx";
import JeremiahJSON from "../books/Jeremiah.jsx";
import JobJSON from "../books/Job.jsx";
import JoshuaJSON from "../books/Joshua.jsx";
import JudgesJSON from "../books/Judges.jsx";
import LamentationsJSON from "../books/Lamentations.jsx";
import LeviticusJSON from "../books/Leviticus.jsx";
import NehemiahJSON from "../books/Nehemiah.jsx";
import NumbersJSON from "../books/Numbers.jsx";
import ProverbsJSON from "../books/Proverbs.jsx";
import PsalmsJSON from "../books/Psalms.jsx";
import RuthJSON from "../books/Ruth.jsx";
import SongofSolomonJSON from "../books/SongofSolomon.jsx";
import GenesisJSON from "../books/Genesis.jsx";

const Book = () => {

  const location = useLocation();

  const { book, setBookTheme } = useBook();
  const { chapter, setSelectedChapter } = useBook();
  const {verse, setVerseContext} = useBook();

  const [bibleData, setBibleData] = useState("");
  const [currentChapter, setCurrentChapter] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputChapter, setInputChapter] = useState("");
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [firstLoadState, setFirstLoadState] = useState(false);
  const [suggestions, setSuggestions] = useState([]);  // Store suggestions here
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [topics, setTopics] = useState([]); // Store distinct topics
  const [query, setQuery] = useState(''); // Current input query
  const [dbInitialized, setDbInitialized] = useState(false);
  const [confirmBookmarkSavedModalOpen, setConfirmBookmarkSavedModalOpen] = useState(false);

  const hasScrolledRef = useRef(false);
  const previousVerseRef = useRef();

  useEffect(() => {
  const initializeDatabase = async () => {
    try {
      await initDB(); // Assume initDB is async
      setDbInitialized(true);// Set to true once DB is initialized

      getDistinctTopics()
      .then((distinctTopics) => {
        setTopics(distinctTopics); // Set the topics in state
       // setLoading(false); // Set loading to false once data is fetched
        console.log("Topics Are: " + distinctTopics);
      })
      .catch((error) => {
        console.error("Error fetching distinct topics:", error);
       // setLoading(false); // Handle error and stop loading
      });
    } catch (error) {
      console.error("Error initializing DB:", error);
    }
  };

  initializeDatabase();
}, []);

  useEffect(() => {
    console.log("Global Context Book Title:", book); // Log the book from the global context
    console.log("Book from state:", location.state?.bookName); // Log the book from the link state
    console.log("Global Verse is " + verse);

    if (book === "Genesis") {
      setBibleData(GenesisJSON);    
    } else if (book === "Exodus") {
      setBibleData(ExodusJSON);
    } else if (book === "Leviticus") {
      setBibleData(LeviticusJSON);
    }else if (book === "Numbers") {
      setBibleData(NumbersJSON);
    }else if (book === "Deuteronomy") {
      setBibleData(DeuteronomyJSON);
    }else if (book === "Joshua") {
      setBibleData(JoshuaJSON);
    }else if (book === "Judges") {
      setBibleData(JudgesJSON);
    }else if (book === "Ruth") {
      setBibleData(RuthJSON);
    }else if (book === "I Samuel") {
      setBibleData(ISamuelJSON);
    }else if (book === "II Samuel") {
      setBibleData(IISamuelJSON);
    }else if (book === "I Kings") {
      setBibleData(IKingsJSON);
    }else if (book === "II Kings") {
      setBibleData(IIKingsJSON);
    }else if (book === "I Chronicles") {
      setBibleData(IChoniclesJSON);
    }else if (book === "II Chronicles") {
      setBibleData(IIChroniclesJSON);
    }else if (book === "Ezra") {
      setBibleData(EzraJSON);
    }else if (book === "Nehemiah") {
      setBibleData(NehemiahJSON);
    }else if (book === "Esther") {
      setBibleData(EstherJSON);
    }else if (book === "Job") {
      setBibleData(JobJSON);
    }else if (book === "Psalms") {
      setBibleData(PsalmsJSON);
    }else if (book === "Proverbs") {
      setBibleData(ProverbsJSON);
    }else if (book === "Ecclesiastes") {
      setBibleData(EcclesiastesJSON);
    }else if (book === "Song of Solomon") {
      setBibleData(SongofSolomonJSON);
    }else if (book === "Isaiah") {
      setBibleData(IsaiahJSON);
    }else if (book === "Jeremiah") {
      setBibleData(JeremiahJSON);
    }else if (book === "Lamentations") {
      setBibleData(LamentationsJSON);
    }else if (book === "Ezekiel") {
      setBibleData(EzekielJSON);
    }else if (book === "Daniel") {
      setBibleData(DanielJSON);
    }else if (book === "Hosea") {
      setBibleData(HoseaJSON);
    }else if (book === "Joel") {
      setBibleData(JoelJSON);
    }else if (book === "Amos") {
      setBibleData(AmosJSON);
    }else if (book === "Obadiah") {
      setBibleData(ObadiahJSON);
    }else if (book === "Jonah") {
      setBibleData(JonahJSON);
    }else if (book === "Micah") {
      setBibleData(MicahJSON);
    }else if (book === "Nahum") {
      setBibleData(NahumJSON);
    }else if (book === "Habakkuk") {
      setBibleData(HabakkukJSON);
    }else if (book === "Zephaniah") {
      setBibleData(ZephaniahJSON);
    }else if (book === "Haggai") {
      setBibleData(HaggaiJSON);
    }else if (book === "Zechariah") {
      setBibleData(ZechariahJSON);
    }else if (book === "Malachi") {
      setBibleData(MalachiJSON);
    }else if (book === "Matthew") {
      setBibleData(MatthewJSON);
    }else if (book === "Mark") {
      setBibleData(MarkJSON);
    }else if (book === "Luke") {
      setBibleData(LukeJSON);
    }else if (book === "John") {
      setBibleData(JohnJSON);
    }else if (book === "Acts") {
      setBibleData(ActsJSON);
    }else if (book === "Romans") {
      setBibleData(RomansJSON);
    }else if (book === "I Corinthians") {
      setBibleData(ICorinthiansJSON);
    }else if (book === "II Corinthians") {
      setBibleData(IICorinthiansJSON);
    }else if (book === "Galatians") {
      setBibleData(GalatiansJSON);
    }else if (book === "Ephesians") {
      setBibleData(EphesiansJSON);
    }else if (book === "Philippians") {
      setBibleData(PhilippiansJSON);
    }else if (book === "Colossians") {
      setBibleData(ColossiansJSON);
    }else if (book === "I Thessalonians") {
      setBibleData(IThessaloniansJSON);
    }else if (book === "II Thessalonians") {
      setBibleData(IIThessaloniansJSON);
    }else if (book === "I Timothy") {
      setBibleData(ITimothyJSON);
    }else if (book === "II Timothy") {
      setBibleData(IITimothyJSON);
    }else if (book === "Titus") {
      setBibleData(TitusJSON);
    }else if (book === "Philemon") {
      setBibleData(PhilemonJSON);
    }else if (book === "Hebrews") {
      setBibleData(HebrewsJSON);
    }else if (book === "James") {
      setBibleData(JamesJSON);
    }else if (book === "I Peter") {
      setBibleData(IPeterJSON);
    }else if (book === "II Peter") {
      setBibleData(IIPeterJSON);
    }else if (book === "I John") {
      setBibleData(IJohnJSON);
    }else if (book === "II John") {
      setBibleData(IIJohnJSON);
    }else if (book === "III John") {
      setBibleData(IIIJohnJSON);
    }else if (book === "Jude") {
      setBibleData(JudeJSON);
    }else if (book === "Revelation") {
      setBibleData(RevelationJSON);
    }else {
      // Handle other books here as needed
      setBibleData(""); // Reset or set for other books
    }


    setCurrentChapter(chapter);

  }, [book, location.state, chapter]);

  useEffect(() => {

  // Wait for the component to fully load and render the verse before scrolling
  if (firstLoadState || verse !== previousVerseRef.current) {
    previousVerseRef.current = verse;
    setFirstLoadState(false);

    // Delay scroll to ensure the verse is rendered
    setTimeout(() => {
      scrollToVerse(verse);
      console.log('SCROLL TO: ' + verse); // Scroll to the verse when first load or verse changes
    }, 100);  // 100 ms delay to ensure render completion
  }
}, [verse, firstLoadState, book, currentChapter]);


  const verses = bibleData && bibleData.chapters ? bibleData.chapters[currentChapter].verses : []; // Assuming you want to display verses from the first chapter

  const scrollToVerse = (verse) => {
    const verseId = `${book}_${chapter + 1}_${verse}`;
    const verseElement = document.getElementById(verseId);

    if (verseElement) {
      verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
    console.log(`Verse element not found for ID: ${verseId}`);
    }
};

  const handleNextChapter = () => {
    if (bibleData.chapters && currentChapter < bibleData.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setSelectedChapter(currentChapter + 1);
     // window.scrollTo(2, 0);
      //window.scrollTo({ top: 0, behavior: "auto" });
      const verseId = `${book}_${currentChapter + 1}_${1}`;
    const verseElement = document.getElementById(verseId);

    if (verseElement) {
      verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
    console.log(`Verse element not found for ID: ${verseId}`);
    }

    }
  };

  const handlePreviousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setSelectedChapter(currentChapter - 1);
      //window.scrollTo(2, 0);
      //window.scrollTo({ top: 0, behavior: "auto" });
      const verseId = `${book}_${currentChapter + 1}_${1}`;
    const verseElement = document.getElementById(verseId);

    if (verseElement) {
      verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
    console.log(`Verse element not found for ID: ${verseId}`);
    }
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setInputChapter(""); // Clear input when closing modal
  };

  const openBookmarkModal = (verse) => {
  setSelectedVerse(verse);
  setBookmarkModalOpen(true);
};

  const closeBookmarkModal = () => {
    setBookmarkModalOpen(false);
    setSelectedVerse(null);
    setTopic("");   
    setFilteredTopics([]);  
  };

  const closeConfirmModal = () => {
    setConfirmBookmarkSavedModalOpen(false);

  };

  const openConfirmModal = () => {
    setConfirmBookmarkSavedModalOpen(true);
};

  const handleConfirmModal = () => {
    closeConfirmModal();
  };

  const handleChapterChange = () => {
    const chapterNum = parseInt(inputChapter, 10);
    if (chapterNum >= 1 && chapterNum <= bibleData.chapters.length) {
      setCurrentChapter(chapterNum - 1); // Adjust for zero-indexed
      setSelectedChapter(chapterNum - 1);
      closeModal();

      const verseId = `${book}_${currentChapter + 1}_${1}`;
    const verseElement = document.getElementById(verseId);

    if (verseElement) {
      verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
    console.log(`Verse element not found for ID: ${verseId}`);
    }

    } else {
      alert("Invalid chapter number.");
    }
  };

  //fire handleChapterChange when enter is pressed
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChapterChange();
    }
  };

  // Function to handle clicks outside the modal
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal();
      closeBookmarkModal();
      closeConfirmModal();
    }
  };

  const handleBookmarkSave = () => {
  if (selectedVerse) {
    const verseId = `${book}_${currentChapter + 1}_${selectedVerse.verse}`;
    saveBookmark(book, currentChapter + 1, selectedVerse.verse, topic, verseId)
      .then(() => {
        setTopic(""); // Clear topic after saving
        closeBookmarkModal(); // Close modal after saving
        openConfirmModal();
      })
      .catch((error) => {
        console.error('Error saving bookmark:', error);
      });
  }
};

  const handleTopicChange = (e) => {
    const inputValue = e.target.value;

    setTopic(inputValue); // Update the topic input as the user types

    if (inputValue.trim() === "") {
      setFilteredTopics([]); // If input is empty, clear the suggestions
    } else {
    // Filter topics based on the input value (case-insensitive)
    const filtered = topics.filter((topic) =>
      topic.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredTopics(filtered); // Update the filtered topics list
   }
 };

  const handleTopicSelect = (selectedTopic) => {
  setTopic(selectedTopic);         // Set the selected topic
  setFilteredTopics([]);           // Clear the suggestions list
};


  return (
    <div>
      <h1 className="bibleBookHeader">{book}</h1>
      {bibleData && bibleData.chapters && bibleData.chapters.length > 0 ? (

        <div>
          <div className="bibleChapterDiv">
            <button className="previousChapterButton" onClick={handlePreviousChapter} disabled={currentChapter === 0}>Prev</button>
            <h2 className="bibleChapterHeader" onClick={openModal}>Chapter {bibleData.chapters[currentChapter].chapter}</h2>
            <button className="nextChapterButton" onClick={handleNextChapter} disabled={currentChapter >= bibleData.chapters.length - 1}>Next</button>
          </div>

          {bibleData.chapters[currentChapter].verses.map((verse, verseIndex) => {
              const isVerseOne = verse.verse === "1";
              const words = verse.text.split(" ");
              const formattedText = isVerseOne ? `${words.slice(0, 2).join(" ").toUpperCase()} ${words.slice(2).join(" ")}` : verse.text;

              return (
                <div className="bibleVerseDiv" key={verseIndex} 
                  id={`${book}_${currentChapter + 1}_${verse.verse}`} 
                  onClick={() => openBookmarkModal(verse)}>

                  <div className="bibleVerseContentDiv">
                    <p>
                      <span className="bibleVerseNumber">{verse.verse}</span>{" "}
                      {formattedText}
                    </p>
                  </div>
                </div>
              );
            }
          )}

          {confirmBookmarkSavedModalOpen && (
            <div className="modal" onClick={handleOverlayClick}>
              <div className="modal-content">
                <span className="close" onClick={closeConfirmModal}>
                  &times;
                </span>
                <h2>Boomark Saved</h2>
                <button onClick={handleConfirmModal}>Ok</button>
              </div>
            </div>)}

          {/* Modal */}
          {modalOpen && (
            <div className="modal" onClick={handleOverlayClick}>
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <h2>Enter Chapter Number</h2>
                <div className="topic-search">
                <input
                  type="number"
                  value={inputChapter}
                  onChange={(e) => setInputChapter(e.target.value)}
                  placeholder="Chapter number"
                  onKeyDown={handleKeyDown} // Add this line
                />
                </div>
                <button onClick={handleChapterChange}>Load Chapter</button>
              </div>
            </div>
          )}

           {/* Modal for bookmarking */}
          {bookmarkModalOpen && selectedVerse && (
            <div className="modal" onClick={handleOverlayClick}>
              <div className="modal-content">
                <span className="close" onClick={closeBookmarkModal}>&times;</span>
                <h2>Bookmark Verse</h2>
                <p>Do you want to save this verse as a bookmark?</p>
                <p>{book}, Chapter {currentChapter + 1}, Verse {selectedVerse.verse}</p>
                <p>{selectedVerse.text}</p>
                <div className="topic-search">
                  <input
                    id="topic-input"
                    type="text"
                    value={topic}
                    onChange={handleTopicChange}
                    placeholder="Type a topic..."
                    />
                  {filteredTopics.length > 0 && (
                    <ul className="suggestions-list">
                      {filteredTopics.map((suggestedTopic, index) => (
                        <li
                          key={index}
                          onClick={() => handleTopicSelect(suggestedTopic)}
                          className="suggestion-item"
                          >
                          {suggestedTopic}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button onClick={handleBookmarkSave}>Yes, Save</button>
                <button onClick={closeBookmarkModal}>No, Cancel</button>

              </div>


            </div>
          )}
        </div>
      ) : (
        <p>No verses available.</p>
      )}
    </div>
  );
};

export default Book;
