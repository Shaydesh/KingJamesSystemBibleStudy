import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBook } from "../BookContext";

const TableOfContents = () => {
  const { setBookTheme } = useBook(); // Access the context
  const { chapter, setSelectedChapter } = useBook();
  const { verse, setVerseContext } = useBook();
  const navigate = useNavigate();

  const books = [
    { name: "Genesis", chapters: 50 },
    { name: "Exodus", chapters: 40 },
    { name: "Leviticus", chapters: 27 },
    { name: "Numbers", chapters: 36 },
    { name: "Deuteronomy", chapters: 34 },
    { name: "Joshua", chapters: 24 },
    { name: "Judges", chapters: 21 },
    { name: "Ruth", chapters: 4 },
    { name: "I Samuel", chapters: 31 },
    { name: "II Samuel", chapters: 24 },
    { name: "I Kings", chapters: 22 },
    { name: "II Kings", chapters: 25 },
    { name: "I Chronicles", chapters: 29 },
  ];

  const books2 = [
    { name: "II Chronicles", chapters: 36 },
    { name: "Ezra", chapters: 10 },
    { name: "Nehemiah", chapters: 13 },
    { name: "Esther", chapters: 10 },
    { name: "Job", chapters: 42 },
    { name: "Psalms", chapters: 150 },
    { name: "Proverbs", chapters: 31 },
    { name: "Ecclesiastes", chapters: 12 },
    { name: "Song of Solomon", chapters: 8 },
    { name: "Isaiah", chapters: 66 },
    { name: "Jeremiah", chapters: 52 },
    { name: "Lamentations", chapters: 5 },
    { name: "Ezekiel", chapters: 48 },
  ];

  const books3 = [
    { name: "Daniel", chapters: 12 },
    { name: "Hosea", chapters: 14 },
    { name: "Joel", chapters: 3 },
    { name: "Amos", chapters: 9 },
    { name: "Obadiah", chapters: 1 },
    { name: "Jonah", chapters: 4 },
    { name: "Micah", chapters: 7 },
    { name: "Nahum", chapters: 3 },
    { name: "Habakkuk", chapters: 3 },
    { name: "Zephaniah", chapters: 3 },
    { name: "Haggai", chapters: 2 },
    { name: "Zechariah", chapters: 14 },
    { name: "Malachi", chapters: 4 },
  ];

  const books4 = [
    { name: "Matthew", chapters: 28 },
    { name: "Mark", chapters: 16 },
    { name: "Luke", chapters: 24 },
    { name: "John", chapters: 21 },
    { name: "Acts", chapters: 28 },
    { name: "Romans", chapters: 16 },
    { name: "I Corinthians", chapters: 16 },
    { name: "II Corinthians", chapters: 13 },
    { name: "Galatians", chapters: 6 },
    { name: "Ephesians", chapters: 6 },
    { name: "Philippians", chapters: 4 },
    { name: "Colossians", chapters: 4 },
    { name: "I Thessalonians", chapters: 5 },
  ];

  const books5 = [
    { name: "II Thessalonians", chapters: 3 },
    { name: "I Timothy", chapters: 6 },
    { name: "II Timothy", chapters: 4 },
    { name: "Titus", chapters: 3 },
    { name: "Philemon", chapters: 1 },
    { name: "Hebrews", chapters: 13 },
    { name: "James", chapters: 5 },
    { name: "I Peter", chapters: 5 },
    { name: "II Peter", chapters: 3 },
    { name: "I John", chapters: 5 },
    { name: "II John", chapters: 1 },
    { name: "III John", chapters: 1 },
    { name: "Jude", chapters: 1 },
  ];

  const books6 = [{ name: "Revelation", chapters: 22 }];

  const handleBookClick = (bookName) => {
    setBookTheme(bookName); // Set the global context
    setSelectedChapter(0);
    setVerseContext(1);
    
    // Navigate to the book page and force the Book sidebar item to be highlighted
    navigate(`/Book/${bookName}`);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Table of Contents
      </h1>
      <h3
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontFamily: "LibreBaskerville-Regular",
        }}
      >
        The Names and Order of all Books of the Bible with the Number of their
        Chapters
      </h3>
      <h2
        className="tableOfContentsHeader"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Books of the Old Testament
      </h2>

      <div className="columns">
        <div className="column">
          {books.map((book) => (
            <div className="tblOfContentsBook" key={book.name}>
              <Link
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  handleBookClick(book.name);
                }}
              >
                {" "}
                {/* Apply the link class */}
                <p className="book-name">{book.name}</p>
              </Link>
              <p className="book-number">{book.chapters}</p>
            </div>
          ))}
        </div>
        <div className="column">
          {books2.map((book) => (
            <div className="tblOfContentsBook" key={book.name}>
              <Link
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  handleBookClick(book.name);
                }}
              >
                {" "}
                {/* Apply the link class */}
                <p className="book-name">{book.name}</p>
              </Link>
              <p className="book-number">{book.chapters}</p>
            </div>
          ))}
        </div>
        <div className="column">
          {books3.map((book) => (
            <div className="tblOfContentsBook" key={book.name}>
              <Link
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  handleBookClick(book.name);
                }}
              >
                {" "}
                {/* Apply the link class */}
                <p className="book-name">{book.name}</p>
              </Link>
              <p className="book-number">{book.chapters}</p>
            </div>
          ))}
        </div>
      </div>
      <h2
        className="tableOfContentsHeader"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Books of the New Testament
      </h2>

      {/* Two Column Div */}
      <div className="two-column">
        <div className="column">
          {books4.map((book) => (
            <div className="tblOfContentsBook" key={book.name}>
              <Link
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  handleBookClick(book.name);
                }}
              >
                {" "}
                {/* Apply the link class */}
                <p className="book-name">{book.name}</p>
              </Link>
              <p className="book-number">{book.chapters}</p>
            </div>
          ))}
        </div>
        <div className="column">
          {/* Add books for the New Testament (as needed) */}
          {books5.map((book) => (
            <div className="tblOfContentsBook" key={book.name}>
              <Link
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  handleBookClick(book.name);
                }}
              >
                {" "}
                {/* Apply the link class */}
                <p className="book-name">{book.name}</p>
              </Link>
              <p className="book-number">{book.chapters}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rev-column">
        <div className="column">
          {books6.map((book) => (
            <div className="tblOfContentsBook" key={book.name}>
              <Link
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  handleBookClick(book.name);
                }}
              >
                <p className="book-name">{book.name}</p>
              </Link>
              <p className="book-number">{book.chapters}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
