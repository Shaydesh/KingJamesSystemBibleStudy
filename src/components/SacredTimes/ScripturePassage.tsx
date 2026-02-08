import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StrongsDefinitionModal from '../Book/StrongsDefinitionModal';
import { useBook } from '../../context/BookContext';
import StrongsDict from '../../data/strongsDictionary';
import { StrongsData, Verse } from '../../types/BibleBook';
import styles from './ScriptureVerse.module.css';

interface ScripturePassageProps {
  book: string;
  chapter: number;
  verses: Verse[];
  displayReference: string;
  linkToVerse: number;
}

export const ScripturePassage: React.FC<ScripturePassageProps> = ({
  book,
  chapter,
  verses,
  displayReference,
  linkToVerse
}) => {
  const { setBookTheme, setSelectedChapter, setVerseContext } = useBook();
  const navigate = useNavigate();

  const [strongsModalOpen, setStrongsModalOpen] = useState(false);
  const [strongsData, setStrongsData] = useState<StrongsData[]>([]);
  const [currentStrongsIndex, setCurrentStrongsIndex] = useState(0);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);

  const handleReferenceClick = () => {
    setBookTheme(book);
    setSelectedChapter(chapter - 1);
    setVerseContext(linkToVerse);
    navigate(`/Book/${book}`);
  };

  const handleWordClick = (strongsRefs: string[], verse: Verse) => {
    const strongsEntries = strongsRefs
      .map((ref) => StrongsDict.dictionary.find((entry) => entry.k === ref))
      .filter((entry): entry is StrongsData => !!entry);

    if (strongsEntries.length > 0) {
      setSelectedVerse(verse);
      setStrongsData(strongsEntries);
      setCurrentStrongsIndex(0);
      setStrongsModalOpen(true);
    }
  };

  const openBookmarkModal = () => {
    // Not used in this context, but required by StrongsDefinitionModal
  };

  return (
    <div className={styles.passageContainer}>
      {verses.map((verse, verseIndex) => (
        <p key={verseIndex} className={styles.verseText}>
          <span className={styles.verseNumber}>{verse.verse}</span>{' '}
          {verse.v && Array.isArray(verse.v) ? (
            <>
              {verse.v.map((phraseData, phraseIndex) => {
                const phrase = phraseData[0];
                const strongsRefs = phraseData[1];

                return (
                  <React.Fragment key={phraseIndex}>
                    <span
                      className={styles.clickableWord}
                      onClick={() => handleWordClick(strongsRefs, verse)}
                    >
                      {phrase}
                    </span>
                    {phraseIndex < verse.v.length - 1 ? ' ' : ''}
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            verse.text
          )}
          {verseIndex === verses.length - 1 && (
            <>
              {' '}
              <span
                className={styles.reference}
                onClick={handleReferenceClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleReferenceClick();
                  }
                }}
              >
                — {displayReference}
              </span>
            </>
          )}
        </p>
      ))}

      <StrongsDefinitionModal
        strongsModalOpen={strongsModalOpen}
        strongsData={strongsData}
        setStrongsModalOpen={setStrongsModalOpen}
        setStrongsData={setStrongsData}
        setCurrentStrongsIndex={setCurrentStrongsIndex}
        currentStrongsIndex={currentStrongsIndex}
        selectedVerse={selectedVerse}
        openBookmarkModal={openBookmarkModal}
        StrongsDict={StrongsDict}
      />
    </div>
  );
};
