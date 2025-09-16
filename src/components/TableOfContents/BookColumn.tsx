// src/components/TableOfContents/BookColumn.tsx
import { Link } from "react-router-dom";
import styles from "../TableOfContents/BookColumn.module.css";

type Book = {
  name: string;
  chapters: number;
};

type Props = {
  books: Book[];
  onBookClick: (bookName: string) => void;
};

const BookColumn = ({ books, onBookClick }: Props) => {
  return (
    <div className={styles.column}>
      {books.map((book) => (
        <div className={styles.tblOfContentsBook} key={book.name}>
          <Link
            to="#"
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              onBookClick(book.name);
            }}
          >
            <p className={styles.bookName}>{book.name}</p>
          </Link>
          <p>{book.chapters}</p>
        </div>
      ))}
    </div>
  );
};

export default BookColumn;
