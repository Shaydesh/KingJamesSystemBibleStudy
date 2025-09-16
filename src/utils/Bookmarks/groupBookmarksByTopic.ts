import { Bookmark } from "../../types/BibleBook";

export const groupBookmarksByTopic = (
  bookmarks: Bookmark[]
): Record<string, Bookmark[]> => {
  return bookmarks.reduce((acc, bookmark) => {
    const topic = bookmark.topic || "Uncategorized";
    if (!acc[topic]) {
      acc[topic] = [];
    }
    acc[topic].push(bookmark);
    return acc;
  }, {} as Record<string, Bookmark[]>);
};