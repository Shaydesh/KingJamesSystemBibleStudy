import { useBook } from "../../context/BookContext";

const BookSidebarLabel = () => {
  const { book } = useBook();
  return <div>Book: {book}</div>;
};

export default BookSidebarLabel;
