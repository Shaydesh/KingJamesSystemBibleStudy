import React from "react";
import { useNavigate } from "react-router-dom";
import { useBook } from "../../context/BookContext";
import { Miracle } from "../../types/Miracle";
import MiracleRow from "./MiracleRow";
import styles from "./MiracleTable.module.css";

interface DataTableProps {
  data: Miracle[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const {
    book,
    chapter,
    verse,
    locationName,
    locationCoords,
    setBookTheme,
    setSelectedChapter,
    setVerseContext,
    setLocationName,
    setLocationCoords,
  } = useBook();

  const navigate = useNavigate();

  const handleNavigateBook = React.useCallback((bookName: string, Chapter: number, Verse: number) => {
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
  }, []);

  const handleNavigateMap = React.useCallback((coords: [number, number], location: string) => {
    try {
      console.log("Navigate map to " + location + " and coords " + coords);
      setLocationName(location); // Store book
      setLocationCoords(coords);
      navigate(`/Map/`);
    } catch (error) {
      console.error("Error navigating:", error); // Handle the error
    } finally {
      // This will always run, regardless of whether an error occurred
      console.log("Navigation attempt finished.");
    }
  }, []);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.miracleTable}>
        <thead>
          <tr>
            <th>MIRACLE</th>
            <th>OBJECT</th>
            <th>PLACE</th>
            <th>RECORD</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <MiracleRow
              key={data.Id}
              rowData={data}
              handleNavigateBook={handleNavigateBook}
              handleNavigateMap={handleNavigateMap}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;