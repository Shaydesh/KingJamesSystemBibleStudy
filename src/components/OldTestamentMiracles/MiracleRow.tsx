// TableRow.tsx
import React from "react";
import { Miracle } from "../../types/Miracle";
import styles from "./MiracleRow.module.css";

interface TableRowProps {
  rowData: Miracle;
  handleNavigateBook: (bookName: string, Chapter: number, Verse: number) => void;
  handleNavigateMap: (coords: [number, number], location: string) => void
}

const TableRow: React.FC<TableRowProps> = ({ rowData, handleNavigateBook, handleNavigateMap }) => {

  return (
    <tr>
      <td>{rowData.Miracle}</td>
      <td>{rowData.ObjectOrOccasion}</td>
      <td>
        <span className={styles.link} onClick={() => handleNavigateMap(rowData.Coordinates, rowData.Place)}>
          {rowData.Place}
        </span>
      </td>
      <td>
        {rowData.References.map((ref, index) => (
          <span key={index} className={styles.link} onClick={() => handleNavigateBook(ref.Book, ref.Chapter, ref.Verse)}>
            {ref.DisplayVerse}
            {index < rowData.References.length - 1 && ", "}
          </span>
        ))}
      </td>


    </tr>
  );
};

export default TableRow;
