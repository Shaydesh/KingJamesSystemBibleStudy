import React from "react";
import { useNavigate } from "react-router-dom";
import { useBook } from "../../context/BookContext";
import { Miracle } from "../../types/Miracle";
import styles from "./MiracleTable.module.css";

interface DataTableProps {
  data: Miracle[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const {
    setBookTheme,
    setSelectedChapter,
    setVerseContext,
    setLocationName,
    setLocationCoords,
  } = useBook();

  const navigate = useNavigate();

  const handleNavigateBook = React.useCallback((bookName: string, Chapter: number, Verse: number) => {
    setBookTheme(bookName);
    setSelectedChapter(Chapter - 1);
    setVerseContext(Verse);
    navigate(`/Book/${bookName}`);
  }, [setBookTheme, setSelectedChapter, setVerseContext, navigate]);

  const handleNavigateMap = React.useCallback((coords: [number, number], location: string) => {
    setLocationName(location);
    setLocationCoords(coords);
    navigate(`/Map/`);
  }, [setLocationName, setLocationCoords, navigate]);

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cardsGrid}>
        {data.map((miracle) => (
          <article key={miracle.Id} className={styles.miracleCard}>
            <h3 className={styles.miracleTitle}>{miracle.Miracle}</h3>

            <div className={styles.cardDetails}>
              {miracle.ObjectOrOccasion && (
                <>
                  <span className={styles.label}>By Whom Wrought:</span>
                  <span className={styles.value}>{miracle.ObjectOrOccasion}</span>
                </>
              )}

              <span className={styles.label}>Place:</span>
              <span className={styles.value}>
                <span
                  className={styles.link}
                  onClick={() => handleNavigateMap(miracle.Coordinates, miracle.Place)}
                >
                  {miracle.Place}
                </span>
              </span>

              <span className={styles.label}>Record:</span>
              <span className={styles.value}>
                {miracle.References.map((ref, index) => (
                  <span key={index} className={styles.references}>
                    <span
                      className={styles.link}
                      onClick={() => handleNavigateBook(ref.Book, ref.Chapter, ref.Verse)}
                    >
                      {ref.DisplayVerse}
                    </span>
                    {index < miracle.References.length - 1 && (
                      <span className={styles.referenceSeparator}>, </span>
                    )}
                  </span>
                ))}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
