import { useNavigate } from "react-router-dom";
import BookColumn from "../components/TableOfContents/BookColumn";
import { useBook } from "../context/BookContext";
import {
  books,
  books2,
  books3,
  books4,
  books5,
  books6
} from "../data/bibleBooks";

const TableOfContents = () => {
  const { setBookTheme, setSelectedChapter, setVerseContext } = useBook();
  const navigate = useNavigate();

  const handleBookClick = (bookName: string) => {
    setBookTheme(bookName);
    setSelectedChapter(0);
    setVerseContext(1);
    navigate(`/Book/${bookName}`);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Table of Contents</h1>
      <h3 style={{ textAlign: "center", marginTop: "20px", fontFamily: "LibreBaskerville-Regular" }}>
        The Names and Order of all Books of the Bible with the Number of their Chapters
      </h3>

      <h2 className="tableOfContentsHeader" style={{ textAlign: "center", marginTop: "20px" }}>
        Books of the Old Testament
      </h2>

      <div className="columns">
        <BookColumn books={books} onBookClick={handleBookClick} />
        <BookColumn books={books2} onBookClick={handleBookClick} />
        <BookColumn books={books3} onBookClick={handleBookClick} />
      </div>

      <h2 className="tableOfContentsHeader" style={{ textAlign: "center", marginTop: "20px" }}>
        Books of the New Testament
      </h2>

      <div className="two-column">
        <BookColumn books={books4} onBookClick={handleBookClick} />
        <BookColumn books={books5} onBookClick={handleBookClick} />
      </div>

      <div className="rev-column">
        <BookColumn books={books6} onBookClick={handleBookClick} />
      </div>
    </div>
  );
};

export default TableOfContents;

