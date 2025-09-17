import { BibleBook } from "../../types/BibleBook";

export async function loadBook(fileName: string): Promise<BibleBook> {
  const response = await fetch(`/books/${fileName}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${fileName}`);
  }
  return await response.json() as BibleBook;
}