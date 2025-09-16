
import BookSidebarLabel from "../components/AppLayout/BookSidebarLabel";
import Book from "../pages/Book";
import Bookmarks from "../pages/Bookmarks";
import TableOfContents from "../pages/TableOfContents";
import ZadokCalendar from '../pages/ZadokCalendar';
import '../styles/globals.css';

export const routes = [
  {
    path: "/",
    sidebar: () => <div>Table of Contents</div>,
    main: () => <TableOfContents />,
    category: "bible",
  },
  {
    path: "/BookMarks",
    sidebar: () => <div>Bookmarks</div>,
    main: () => <Bookmarks />,
    category: "bible",
  },
  {
    path: "/Book/:bookName",
    sidebar: BookSidebarLabel,
    main: () => <Book />,
    category: "bible",
  },
  {
    path: "/ZadokCalendar",
    sidebar: () => <div>Calendar</div>,
    main: () => <ZadokCalendar />,
    category: "calendar", // ⬅️ Key change here
  },
];

