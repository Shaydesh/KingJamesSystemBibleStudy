import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StrongsDefinitionModal from '../Book/StrongsDefinitionModal';
import { useBook } from '../../context/BookContext';
import StrongsDict from '../../data/strongsDictionary';
import { StrongsData, Verse } from '../../types/BibleBook';
import styles from './ScriptureVerse.module.css';

interface ScriptureVerseProps {
  book: string;
  chapter: number;
  verse: Verse;
  displayReference: string;
}

export const ScriptureVerse: React.FC<ScriptureVerseProps> = ({
  book,
  chapter,
  verse,
  displayReference
}) => {
  const { setBookTheme, setSelectedChapter, setVerseContext } = useBook();
  const navigate = useNavigate();

  const [strongsModalOpen, setStrongsModalOpen] = useState(false);
  const [strongsData, setStrongsData] = useState<StrongsData[]>([]);
  const [currentStrongsIndex, setCurrentStrongsIndex] = useState(0);

  const handleReferenceClick = () => {
    setBookTheme(book);
    setSelectedChapter(chapter - 1);
    setVerseContext(Number(verse.verse));
    navigate(`/Book/${book}`);
  };

  const handleWordClick = (strongsRefs: string[]) => {
    const strongsEntries = strongsRefs
      .map((ref) => StrongsDict.dictionary.find((entry) => entry.k === ref))
      .filter((entry): entry is StrongsData => !!entry);

    if (strongsEntries.length > 0) {
      setStrongsData(strongsEntries);
      setCurrentStrongsIndex(0);
      setStrongsModalOpen(true);
    }
  };

  const openBookmarkModal = () => {
    // Not used in this context, but required by StrongsDefinitionModal
  };

  return (
    <div className={styles.verseContainer}>
      <p className={styles.verseText}>
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
                    onClick={() => handleWordClick(strongsRefs)}
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
        )}{' '}
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
      </p>

      <StrongsDefinitionModal
        strongsModalOpen={strongsModalOpen}
        strongsData={strongsData}
        setStrongsModalOpen={setStrongsModalOpen}
        setStrongsData={setStrongsData}
        setCurrentStrongsIndex={setCurrentStrongsIndex}
        currentStrongsIndex={currentStrongsIndex}
        selectedVerse={verse}
        openBookmarkModal={openBookmarkModal}
        StrongsDict={StrongsDict}
      />
    </div>
  );
};
