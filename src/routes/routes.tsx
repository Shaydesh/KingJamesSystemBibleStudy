
import BookSidebarLabel from "../components/AppLayout/BookSidebarLabel";
import BiblicalTimeline from "../pages/BiblicalTimeLline";
import Book from "../pages/Book";
import Bookmarks from "../pages/Bookmarks";
import Map from '../pages/Map';
import MiraclesOfJesus from "../pages/MiraclesOfJesus";
import MiraclesOfTheHolySpirit from "../pages/MiraclesOfTheHolySpirit";
import OldTestamentMiracles from "../pages/OldTestamentMiracles";
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
    sidebar: () => <div>Zadok Calendar</div>,
    main: () => <ZadokCalendar />,
    category: "calendar", // ⬅️ Key change here
  },
  {
    path: "/BiblicalTimeline",
    sidebar: () => <div>Biblical Timeline</div>,
    main: () => <BiblicalTimeline />,
    category: "calendar", // ⬅️ Key change here
  },
  {
    path: "/OldTestamentMiracles",
    sidebar: () => <div>Old Testament Miracles</div>,
    main: () => <OldTestamentMiracles />,
    category: "miracles", // ⬅️ Key change here
  },
  {
    path: "/MiraclesOfJesus",
    sidebar: () => <div>Miracles Of Jesus</div>,
    main: () => <MiraclesOfJesus />,
    category: "miracles", // ⬅️ Key change here
  },
  {
    path: "/MiraclesOfTheHolySpirit",
    sidebar: () => <div>Miracles Of The Holy Spirit</div>,
    main: () => <MiraclesOfTheHolySpirit />,
    category: "miracles", // ⬅️ Key change here
  },

  {
    path: "/Map",
    sidebar: () => <div>Middle East Map</div>,
    main: () => <Map />,
    category: "map", // ⬅️ Key change here
  },
];

