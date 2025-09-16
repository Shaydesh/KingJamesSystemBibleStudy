import { Link } from "react-router-dom";
import type { Bookmark } from "../../types/BibleBook";
import styles from "../Bookmarks/BookmarkList.module.css";

export const GroupedBookmarkList = ({
  groupedBookmarks,
  onBookmarkClick,
}: {
  groupedBookmarks: Record<string, Bookmark[]>;
  onBookmarkClick: (book: string, chapter: number, verse: number, id: number) => void;
}) => (
  <>
    {Object.keys(groupedBookmarks).length > 0 ? (
      Object.entries(groupedBookmarks).map(([topic, bookmarks]) => (
        <div key={topic}>
          <h2>{topic}</h2>
          <ul className={styles.bookmarksList}>
            {bookmarks
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((bookmark) => (
                <li key={bookmark.id} className={styles.bookmarkItem}>
                  <Link
                    to="#"
                    className={styles.link}
                    onClick={() =>
                      onBookmarkClick(bookmark.book, bookmark.chapter, +bookmark.verse, +bookmark.id)
                    }
                  >
                    {bookmark.book} - Chapter {bookmark.chapter}, Verse {bookmark.verse}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))
    ) : (
      <p className="no-bookmarks">No bookmarks found.</p>
    )}
  </>
);
